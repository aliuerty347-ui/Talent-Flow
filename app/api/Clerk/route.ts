import { createClerkClient } from '@clerk/nextjs/server';

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function setUserRole(userId: string, role: 'admin' | 'employee') {
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: role,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating role:', error);
    return { success: false, error: 'Failed to set user role' };
  }
}