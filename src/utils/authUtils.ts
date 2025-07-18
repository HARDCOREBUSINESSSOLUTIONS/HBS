
export const cleanupAuthState = () => {
  try {
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('sb-') || key.startsWith('supabase.auth.')) {
        localStorage.removeItem(key);
      }
    });
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('sb-') || key.startsWith('supabase.auth.')) {
        sessionStorage.removeItem(key);
      }
    });
    console.log("Cleaned up Supabase auth state from storage.");
  } catch (error) {
      console.error("Error cleaning up auth state:", error);
  }
};
