/**
 * Firebase Auth Error Parser and Formatter
 * Provides user-friendly error messages and troubleshooting guides
 */

export interface AuthErrorInfo {
  title: string;
  message: string;
  isUnauthorizedDomain?: boolean;
  domain?: string;
  consoleUrl?: string;
}

export function parseAuthError(error: any): AuthErrorInfo {
  const code = error?.code || '';
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'app.imprince.me';
  const projectId = 'gen-lang-client-0927462651';
  const consoleSettingsUrl = `https://console.firebase.google.com/project/${projectId}/authentication/settings`;

  switch (code) {
    case 'auth/unauthorized-domain':
      return {
        title: 'Domain Not Authorized in Firebase',
        message: `The domain "${currentHost}" is not added to your Firebase project's Authorized Domains list. Login and Signup cannot complete until this domain is whitelisted.`,
        isUnauthorizedDomain: true,
        domain: currentHost,
        consoleUrl: consoleSettingsUrl
      };

    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return {
        title: 'Invalid Credentials',
        message: 'The email address or password you entered is incorrect. Please check and try again.'
      };

    case 'auth/user-not-found':
      return {
        title: 'Account Not Found',
        message: 'No account was found with this email. Please sign up to create a new account.'
      };

    case 'auth/email-already-in-use':
      return {
        title: 'Email Already In Use',
        message: 'An account with this email address already exists. Please log in instead.'
      };

    case 'auth/weak-password':
      return {
        title: 'Weak Password',
        message: 'Your password must be at least 6 characters long with a mix of letters and numbers.'
      };

    case 'auth/invalid-email':
      return {
        title: 'Invalid Email',
        message: 'Please enter a valid email address (e.g. name@example.com).'
      };

    case 'auth/popup-closed-by-user':
      return {
        title: 'Sign-in Cancelled',
        message: 'The sign-in popup was closed before completing authentication.'
      };

    case 'auth/popup-blocked':
      return {
        title: 'Popup Blocked',
        message: 'Your browser blocked the sign-in popup. Please allow popups for this site and try again.'
      };

    case 'auth/network-request-failed':
      return {
        title: 'Network Error',
        message: 'Unable to reach Firebase servers. Please check your internet connection and try again.'
      };

    case 'auth/too-many-requests':
      return {
        title: 'Too Many Attempts',
        message: 'Access to this account has been temporarily disabled due to many failed login attempts. Please reset your password or try again later.'
      };

    case 'auth/account-exists-with-different-credential':
      return {
        title: 'Account Exists With Different Provider',
        message: 'An account already exists with this email using another sign-in method.'
      };

    default:
      return {
        title: 'Authentication Failed',
        message: error?.message?.replace(/^Firebase:\s*/, '') || 'An unexpected authentication error occurred. Please try again.'
      };
  }
}
