import express, { Request, Response } from "express";
import path from "path";
import { testConnection } from "../database/connection";
import { TeamModel } from "../models/Team";
import { ValidationError } from "../utils/validation";
import { validateTeamInput } from "../utils/team-validation";
import { handleTeamCreationWithRolePromotion } from "../utils/role-promotion-utils";
import {
	performUserSearch,
	validateSearchQuery,
	validateSearchLimit,
	hasUserSearchPermission
} from "../utils/user-search-utils";
import type { UserSearchParams } from "../utils/user-search-utils";
import type { UserRole } from "../models/User";
import { TeamModelExtensions } from "../utils/team-model-extensions";
import {
	validateTeamMembership,
	canAddUserToTeam,
	determineUserRoleForTeam,
	validateMembershipRequest,
	sanitizeMembershipData,
	formatMembershipResponse
} from "../utils/team-membership-utils";
import {
	validateInvitationData,
	sanitizeInvitationData,
	createInvitationToken,
	canUserInviteToTeam,
	validateInvitationResponse,
	formatInvitationForResponse,
	getInvitationExpiryDate,
	isInvitationExpired,
	canActOnInvitation,
	shouldPromoteUserOnAccept,
	type InvitationData
} from "../utils/team-invitation-utils";
import { UserModel } from "../models/User";
import { TeamInvitationModel } from "../models/TeamInvitation";
import sessionAuthMiddleware from "../middleware/session-auth";
import calendarEntriesRouter from "../routes/calendar-entries";
import usersRouter from "../routes/users";

const app = express();
const PORT = parseInt(process.env.PORT ?? "3000");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving - serve HTML, CSS, JS files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// API Routes
app.use("/api/calendar-entries", calendarEntriesRouter);
app.use("/api/users", usersRouter);

// Basic route
app.get("/", (_req: Request, res: Response) => {
	res.json({
		message: "Capacity Planner API",
		version: "1.0.0",
		timestamp: new Date().toISOString()
	});
});

// Health check route
app.get("/health", async (_req: Request, res: Response) => {
	const dbConnected = await testConnection();
	res.json({
		status: "ok",
		database: dbConnected ? "connected" : "disconnected",
		timestamp: new Date().toISOString()
	});
});

// Team Management API endpoints
// GET /api/teams - Get all teams (requires authentication)
app.get("/api/teams", sessionAuthMiddleware, async (_req: Request, res: Response) => {
	try {
		const teams = await TeamModel.findAll();
		res.json(teams);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error fetching teams:", error);
		res.status(500).json({
			message: "Failed to fetch teams",
			error: error instanceof Error ? error.message : "Unknown error"
		});
	}
});

// GET /api/teams/:id - Get team by ID (requires authentication)
app.get("/api/teams/:id", sessionAuthMiddleware, async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ message: "Team ID is required" });
			return;
		}

		const team = await TeamModel.findById(id);

		if (!team) {
			res.status(404).json({ message: "Team not found" });
			return;
		}

		res.json(team);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error fetching team:", error);
		res.status(500).json({
			message: "Failed to fetch team",
			error: error instanceof Error ? error.message : "Unknown error"
		});
	}
});

// POST /api/teams - Create new team (requires authentication)
app.post("/api/teams", sessionAuthMiddleware, async (req: Request, res: Response): Promise<void> => {
	try {
		// Get authenticated user from session middleware
		const user = req.user;
		if (!user) {
			res.status(401).json({ message: "Authentication required" });
			return;
		}

		// Validate input data
		const teamData = validateTeamInput(req.body);

		// Set the team creator to the authenticated user
		const teamDataWithCreator = {
			...teamData,
			created_by: user.id
		};

		// Handle team creation with automatic role promotion
		const result = await handleTeamCreationWithRolePromotion(teamDataWithCreator);

		// Return comprehensive response including promotion information
		res.status(201).json({
			team: result.team,
			userPromoted: result.userPromoted,
			membership: result.membership,
			message: result.userPromoted
				? "Team created successfully. You have been promoted to team lead!"
				: "Team created successfully."
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error creating team:", error);

		if (error instanceof ValidationError) {
			res.status(400).json({
				message: "Validation error",
				field: error.field,
				details: error.message
			});
			return;
		}

		res.status(500).json({
			message: "Failed to create team",
			error: error instanceof Error ? error.message : "Unknown error"
		});
	}
});

// PUT /api/teams/:id - Update team (requires authentication)
app.put("/api/teams/:id", sessionAuthMiddleware, async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ message: "Team ID is required" });
			return;
		}

		// Check if team exists
		const existingTeam = await TeamModel.findById(id);
		if (!existingTeam) {
			res.status(404).json({ message: "Team not found" });
			return;
		}

		// Validate input data
		const updateData = validateTeamInput(req.body, true);

		const updatedTeam = await TeamModel.update(id, updateData);
		if (!updatedTeam) {
			res.status(404).json({ message: "Team not found after update" });
			return;
		}

		res.json(updatedTeam);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error updating team:", error);

		if (error instanceof ValidationError) {
			res.status(400).json({
				message: "Validation error",
				field: error.field,
				details: error.message
			});
			return;
		}

		res.status(500).json({
			message: "Failed to update team",
			error: error instanceof Error ? error.message : "Unknown error"
		});
	}
});

// DELETE /api/teams/:id - Delete team (requires authentication)
app.delete("/api/teams/:id", sessionAuthMiddleware, async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ message: "Team ID is required" });
			return;
		}

		const deleted = await TeamModel.delete(id);
		if (!deleted) {
			res.status(404).json({ message: "Team not found" });
			return;
		}

		res.json({ message: "Team deleted successfully" });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error deleting team:", error);
		res.status(500).json({
			message: "Failed to delete team",
			error: error instanceof Error ? error.message : "Unknown error"
		});
	}
});

// GET /api/teams/:id/members - Get team members (requires authentication)
app.get("/api/teams/:id/members", sessionAuthMiddleware, async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ message: "Team ID is required" });
			return;
		}

		// Check if team exists
		const team = await TeamModel.findById(id);
		if (!team) {
			res.status(404).json({ message: "Team not found" });
			return;
		}

		const members = await TeamModel.getMembers(id);
		res.json(members);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error fetching team members:", error);
		res.status(500).json({
			message: "Failed to fetch team members",
			error: error instanceof Error ? error.message : "Unknown error"
		});
	}
});

// POST /api/teams/:id/members - Add user to team (requires team_lead role)
app.post("/api/teams/:id/members", sessionAuthMiddleware, async (req: Request, res: Response): Promise<void> => {
	try {
		// Get authenticated user from session middleware
		const user = req.user;
		if (!user) {
			res.status(401).json({ message: "Authentication required" });
			return;
		}

		// Check if user has permission to add team members
		if (!hasUserSearchPermission(user.role as UserRole)) {
			res.status(403).json({
				message: "Insufficient permissions. Only team leads can add users to teams."
			});
			return;
		}

		const teamId = req.params.id;
		if (!teamId) {
			res.status(400).json({ message: "Team ID is required" });
			return;
		}

		// Validate team exists
		const team = await TeamModel.findById(teamId);
		if (!team) {
			res.status(404).json({ message: "Team not found" });
			return;
		}

		// Extract and validate request data
		const rawRequest = {
			userId: (req.body as { userId?: string }).userId ?? "",
			teamId: teamId,
			role: ((req.body as { role?: UserRole }).role ?? "team_member") as UserRole
		};

		// Validate membership request
		const validation = validateMembershipRequest(rawRequest);
		if (!validation.isValid) {
			res.status(400).json({
				message: "Invalid request data",
				errors: validation.errors
			});
			return;
		}

		// Sanitize input data
		const sanitizedRequest = sanitizeMembershipData(rawRequest);

		// Get user to add
		const userToAdd = await UserModel.findById(sanitizedRequest.userId);
		if (!userToAdd) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		// Validate user can be added to team
		const userValidation = validateTeamMembership(userToAdd, teamId);
		if (!userValidation.isValid) {
			res.status(400).json({
				message: "Cannot add user to team",
				errors: userValidation.errors
			});
			return;
		}

		// Check for existing membership
		const existingMemberships = await TeamModelExtensions.getTeamMemberships(teamId);
		const conflictCheck = canAddUserToTeam(sanitizedRequest.userId, teamId, existingMemberships);
		if (!conflictCheck.canAdd) {
			res.status(409).json({
				message: conflictCheck.conflict
			});
			return;
		}

		// Determine appropriate role for user
		const assignedRole = determineUserRoleForTeam(userToAdd.role);
		const roleChanged = userToAdd.role === "basic_user" && assignedRole === "team_member";

		// Add user to team
		const membership = await TeamModelExtensions.addMemberWithRole({
			team_id: teamId,
			user_id: sanitizedRequest.userId,
			role: assignedRole
		});

		// Format response
		const response = formatMembershipResponse(
			membership,
			{
				id: userToAdd.id,
				email: userToAdd.email,
				first_name: userToAdd.first_name,
				last_name: userToAdd.last_name
			},
			roleChanged
		);

		res.status(201).json(response);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error adding team member:", error);
		res.status(500).json({
			message: "Failed to add user to team",
			error: error instanceof Error ? error.message : "Unknown error"
		});
	}
});

// POST /api/teams/:id/invitations - Send team invitation (requires team_lead role)
app.post("/api/teams/:id/invitations", sessionAuthMiddleware, async (req: Request, res: Response): Promise<void> => {
	try {
		// Get authenticated user from session middleware
		const user = req.user;
		if (!user) {
			res.status(401).json({ message: "Authentication required" });
			return;
		}

		// Check if user has permission to send invitations
		if (!canUserInviteToTeam(user.role as UserRole)) {
			res.status(403).json({
				message: "Insufficient permissions. Only team leads can send team invitations."
			});
			return;
		}

		const teamId = req.params.id;
		if (!teamId) {
			res.status(400).json({ message: "Team ID is required" });
			return;
		}

		// Validate team exists
		const team = await TeamModel.findById(teamId);
		if (!team) {
			res.status(404).json({ message: "Team not found" });
			return;
		}

		// Extract and validate request data
		const requestBody = req.body as { email?: string; role?: UserRole };
		const invitationData: InvitationData = {
			teamId: teamId,
			invitedEmail: requestBody.email ?? "",
			invitedBy: user.id,
			role: requestBody.role ?? "team_member"
		};

		// Validate invitation data
		const validation = validateInvitationData(invitationData);
		if (!validation.isValid) {
			res.status(400).json({
				message: "Invalid invitation data",
				errors: validation.errors
			});
			return;
		}

		// Sanitize input data
		const sanitizedData = sanitizeInvitationData(invitationData);

		// Check if user is already a team member
		const existingMemberships = await TeamModelExtensions.getTeamMemberships(teamId);
		const existingUser = await UserModel.findByEmail(sanitizedData.invitedEmail);

		if (existingUser) {
			const membershipConflict = canAddUserToTeam(existingUser.id, teamId, existingMemberships);
			if (!membershipConflict.canAdd) {
				res.status(409).json({
					message: "User is already a member of this team"
				});
				return;
			}
		}

		// Check for existing pending invitation
		const existingInvitation = await TeamInvitationModel.findPendingForTeamAndEmail(
			teamId,
			sanitizedData.invitedEmail
		);
		if (existingInvitation) {
			res.status(409).json({
				message: "User already has a pending invitation for this team"
			});
			return;
		}

		// Create invitation
		const token = createInvitationToken();
		const expiresAt = getInvitationExpiryDate(7); // 7 days expiry

		const invitation = await TeamInvitationModel.create({
			team_id: teamId,
			invited_email: sanitizedData.invitedEmail,
			invited_by: user.id,
			role: sanitizedData.role,
			token: token,
			expires_at: expiresAt
		});

		// Format response
		const inviterName = `${user.first_name} ${user.last_name}`.trim() || "Team Lead";
		const response = formatInvitationForResponse(invitation, team.name, inviterName);

		res.status(201).json({
			invitation: {
				id: response.id,
				teamId: response.teamId,
				invitedEmail: response.invitedEmail,
				role: response.role,
				status: response.status,
				expiresAt: response.expiresAt
			},
			message: `Invitation sent to ${sanitizedData.invitedEmail} to join ${team.name}`
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error sending team invitation:", error);
		res.status(500).json({
			message: "Failed to send invitation",
			error: error instanceof Error ? error.message : "Unknown error"
		});
	}
});

// POST /api/invitations/respond - Accept or decline team invitation
app.post("/api/invitations/respond", sessionAuthMiddleware, async (req: Request, res: Response): Promise<void> => {
	try {
		// Get authenticated user from session middleware
		const user = req.user;
		if (!user) {
			res.status(401).json({ message: "Authentication required" });
			return;
		}

		// Extract and validate request data
		const requestBody = req.body as { token?: string; action?: "accept" | "decline" };
		const responseData = {
			token: requestBody.token ?? "",
			action: requestBody.action ?? ("accept" as "accept" | "decline")
		};

		// Validate response data
		const validation = validateInvitationResponse(responseData);
		if (!validation.isValid) {
			res.status(400).json({
				message: "Invalid response data",
				errors: validation.errors
			});
			return;
		}

		// Find invitation with details
		const invitationWithDetails = await TeamInvitationModel.findByTokenWithDetails(responseData.token);
		if (!invitationWithDetails) {
			res.status(404).json({ message: "Invitation not found" });
			return;
		}

		const invitation = invitationWithDetails.invitation;

		// Check if invitation can be acted upon
		if (!canActOnInvitation(invitation)) {
			if (isInvitationExpired(invitation.expires_at)) {
				res.status(410).json({ message: "Invitation has expired" });
				return;
			}
			res.status(400).json({ message: "Invitation cannot be processed" });
			return;
		}

		// Check if the invitation is for the authenticated user
		if (invitation.invited_email.toLowerCase() !== user.email.toLowerCase()) {
			res.status(403).json({ message: "This invitation is not for your account" });
			return;
		}

		if (responseData.action === "decline") {
			// Update invitation status to declined
			await TeamInvitationModel.update(invitation.id, { status: "declined" });

			res.json({
				message: `You have declined the invitation to join ${invitationWithDetails.team.name}`
			});
			return;
		}

		// Handle acceptance
		if (responseData.action === "accept") {
			// Check if user should be promoted
			const roleForTeam = determineUserRoleForTeam(user.role as UserRole);
			const shouldPromote = shouldPromoteUserOnAccept(user.role as UserRole, invitation.role);

			// Add user to team
			const membership = await TeamModelExtensions.addMemberWithRole({
				team_id: invitation.team_id,
				user_id: user.id,
				role: roleForTeam
			});

			// Update invitation status
			await TeamInvitationModel.update(invitation.id, { status: "accepted" });

			// Update user role if needed
			if (shouldPromote) {
				await UserModel.update(user.id, { role: roleForTeam });
			}

			// Format response
			const response = {
				membership: {
					id: membership.id,
					userId: membership.user_id,
					teamId: membership.team_id,
					role: membership.role,
					joinedAt: membership.joined_at.toISOString()
				},
				user: {
					id: user.id,
					email: user.email,
					displayName: `${user.first_name} ${user.last_name}`.trim()
				},
				message: shouldPromote
					? `You have joined ${invitationWithDetails.team.name} and been promoted to ${roleForTeam}`
					: `You have joined ${invitationWithDetails.team.name}`
			};

			res.json(response);
			return;
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error responding to invitation:", error);
		res.status(500).json({
			message: "Failed to process invitation response",
			error: error instanceof Error ? error.message : "Unknown error"
		});
	}
});

// GET /api/users/search - Search users for team management (requires team_lead role)
app.get("/api/users/search", sessionAuthMiddleware, async (req: Request, res: Response): Promise<void> => {
	try {
		// Get authenticated user from session middleware
		const user = req.user;
		if (!user) {
			res.status(401).json({ message: "Authentication required" });
			return;
		}

		// Check if user has permission to search for other users
		if (!hasUserSearchPermission(user.role as UserRole)) {
			res.status(403).json({
				message: "Insufficient permissions. Only team leads can search for users to add to teams."
			});
			return;
		}

		// Extract and validate query parameters
		const query = (req.query.q as string) ?? "";
		const roleFilterParam = req.query.role as string | undefined;
		const limitParam = parseInt((req.query.limit as string) ?? "20");

		// Validate role filter if provided
		let roleFilter: UserRole | undefined;
		if (roleFilterParam) {
			const validRoles: UserRole[] = ["basic_user", "team_member", "team_lead"];
			if (validRoles.includes(roleFilterParam as UserRole)) {
				roleFilter = roleFilterParam as UserRole;
			} else {
				res.status(400).json({
					message: "Invalid role filter. Must be one of: basic_user, team_member, team_lead"
				});
				return;
			}
		}

		// Validate search parameters
		if (!validateSearchQuery(query)) {
			res.status(400).json({
				message: "Invalid search query. Query must be a string with no HTML tags and under 100 characters."
			});
			return;
		}

		const limit = validateSearchLimit(limitParam);

		// Prepare search parameters
		const searchParams: UserSearchParams = {
			query: query.trim(),
			role: roleFilter,
			currentUserId: user.id,
			limit: limit
		};

		// Perform user search
		const searchResults = await performUserSearch(searchParams);

		// Return search results with metadata
		res.json({
			users: searchResults,
			query: query.trim(),
			roleFilter: roleFilter ?? null,
			limit: limit,
			count: searchResults.length,
			hasMore: searchResults.length === limit // Indicates there might be more results
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error searching users:", error);
		res.status(500).json({
			message: "Failed to search users",
			error: error instanceof Error ? error.message : "Unknown error"
		});
	}
});

// Legacy team configuration endpoints (for backwards compatibility)
app.post("/api/team/basic", (_req: Request, res: Response) => {
	res.status(410).json({
		message: "This endpoint is deprecated. Use POST /api/teams instead."
	});
});

app.post("/api/team/velocity", (_req: Request, res: Response) => {
	res.status(410).json({
		message: "This endpoint is deprecated. Use PUT /api/teams/:id instead."
	});
});

app.post("/api/team/members", (_req: Request, res: Response) => {
	res.status(410).json({
		message: "This endpoint is deprecated. Team member management coming soon."
	});
});

// Sprint endpoints (placeholder for future implementation)
app.post("/api/sprints", (_req: Request, res: Response) => {
	res.status(501).json({ message: "Sprint creation not yet implemented" });
});

app.post("/api/sprints/generate", (_req: Request, res: Response) => {
	res.status(501).json({ message: "Sprint generation not yet implemented" });
});

// Start server
async function startServer(): Promise<void> {
	try {
		// Test database connection on startup
		const dbConnected = await testConnection();
		if (!dbConnected) {
			// eslint-disable-next-line no-console
			console.warn("⚠️  Starting server without database connection");
		}

		app.listen(PORT, () => {
			// eslint-disable-next-line no-console
			console.log(`🚀 Server running on http://localhost:${PORT}`);
			// eslint-disable-next-line no-console
			console.log(`📊 Health check: http://localhost:${PORT}/health`);
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Failed to start server:", error);
		process.exit(1);
	}
}

void startServer();
