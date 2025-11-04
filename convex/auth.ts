import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { query, action } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password, Anonymous],
});

export const loggedInUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }
    return user;
  },
});

// Xaman authentication action
export const authenticateWithXaman = action({
  handler: async (ctx, args: { payloadUuid: string }) => {
    try {
      // Import the Xaman authentication functions
      const { getXamanAccount, createOrGetUserByXRPLAccount } = await import("./auth/xaman");
      
      // Get the XRPL account from the Xaman payload
      const xrplAccount = await getXamanAccount(args.payloadUuid);
      
      // Create or get user by XRPL account
      const userId = await createOrGetUserByXRPLAccount(xrplAccount);
      
      // For now, we'll just return the user ID
      // In a real implementation, this would sign in the user
      return {
        success: true,
        userId: userId,
        xrplAccount: xrplAccount
      };
    } catch (error) {
      console.error("Xaman authentication error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  },
});
