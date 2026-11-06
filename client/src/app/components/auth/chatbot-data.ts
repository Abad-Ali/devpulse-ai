export type ChatbotAction = {
  label: string;
  href: string;
  description: string;
  icon: "password" | "verification" | "login";
};

export type ChatbotKnowledge = {
  keywords: string[];
  questions: string[];
  response: string;
  suggestedLinks: ChatbotAction[];
};

// Application routes
export const CHATBOT_LINKS = {
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  resendVerification: "/resend-verification",
};

// Common suggested actions
export const QUICK_ACTIONS: ChatbotAction[] = [
  {
    label: "Forgot password",
    href: CHATBOT_LINKS.forgotPassword,
    description: "Request a password reset email",
    icon: "password",
  },
  {
    label: "Resend verification",
    href: CHATBOT_LINKS.resendVerification,
    description: "Request a new verification email",
    icon: "verification",
  },
  {
    label: "Login help",
    href: CHATBOT_LINKS.login,
    description: "Get help accessing your account",
    icon: "login",
  },
];

// Chatbot knowledge base
export const CHATBOT_KNOWLEDGE: ChatbotKnowledge[] = [
  // 1. GREETINGS
  {
    keywords: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "how are you",
    ],
    questions: [
      "Hello",
      "Hi",
      "Hey",
      "How are you?",
      "Good morning",
    ],
    response: `Hello! Welcome to DevPulse support.

I'm your account assistant. I can help you with:

- Creating an account
- Logging into your account
- Email verification
- Password recovery
- Missing emails
- Account access issues

What can I help you with today?`,
    suggestedLinks: QUICK_ACTIONS,
  },

  // 2. SIGNUP / REGISTRATION
  {
    keywords: [
      "signup",
      "sign up",
      "register",
      "registration",
      "create account",
      "new account",
      "join",
    ],
    questions: [
      "How do I create an account?",
      "How can I register?",
      "Where can I sign up?",
      "I want to create a new account",
    ],
    response: `Creating a DevPulse account is easy.

Follow these steps:

1. Open the signup page.
2. Enter your registration details.
3. Submit the registration form.
4. Check your registered email address.
5. Find the verification email from DevPulse.
6. Click the verification link in that email.

Once your email is verified, you can log in.

Make sure you provide a valid email address.`,
    suggestedLinks: [
      {
        label: "Create account",
        href: CHATBOT_LINKS.signup,
        description: "Register a new account",
        icon: "login",
      },
      {
        label: "Resend verification",
        href: CHATBOT_LINKS.resendVerification,
        description: "Request a verification email",
        icon: "verification",
      },
    ],
  },

  // 3. LOGIN
  {
    keywords: [
      "login",
      "log in",
      "sign in",
      "signin",
      "cannot login",
      "can't login",
      "login problem",
      "account access",
      "access account",
    ],
    questions: [
      "How do I log in?",
      "I cannot access my account",
      "Why can't I log in?",
      "I have a login problem",
    ],
    response: `Let's help you access your DevPulse account.

Please check the following:

1. Make sure your email address is correct.
2. Check that your password is correct.
3. Make sure your email address has been verified.
4. If you forgot your password, request a password reset email.
5. Try logging in again.

If your account is not verified, request a new verification email.`,
    suggestedLinks: [
      {
        label: "Login",
        href: CHATBOT_LINKS.login,
        description: "Access your account",
        icon: "login",
      },
      {
        label: "Forgot password",
        href: CHATBOT_LINKS.forgotPassword,
        description: "Recover your password",
        icon: "password",
      },
      {
        label: "Resend verification",
        href: CHATBOT_LINKS.resendVerification,
        description: "Request a new verification email",
        icon: "verification",
      },
    ],
  },

  // 4. FORGOT PASSWORD
  {
    keywords: [
      "forgot password",
      "forgot my password",
      "lost password",
      "password forgotten",
      "password recovery",
      "can't remember password",
      "forgotten password",
    ],
    questions: [
      "I forgot my password",
      "How can I recover my password?",
      "I cannot remember my password",
      "How do I request a password reset?",
      "I lost my password",
    ],
    response: `You can recover your DevPulse account by requesting a password reset email.

Follow these steps:

1. Open the Forgot Password page.
2. Enter your registered email address.
3. Submit your request.
4. Check your email inbox for the password reset email.
5. Open the email and click the password reset link.
6. Follow the instructions to create a new password.

If you don't receive the email:

- Check your spam or junk folder.
- Make sure you entered the correct email address.
- Wait a few minutes for the email to arrive.
- Request another reset email if necessary.

Never share your password or reset link with anyone.`,
    suggestedLinks: [
      {
        label: "Forgot password",
        href: CHATBOT_LINKS.forgotPassword,
        description: "Request a password reset email",
        icon: "password",
      },
    ],
  },

  // 5. RESET PASSWORD
  {
    keywords: [
      "reset password",
      "change password",
      "new password",
      "password reset link",
      "reset token",
      "expired reset link",
      "invalid reset token",
      "password update",
    ],
    questions: [
      "How do I reset my password?",
      "How can I change my password?",
      "Where do I enter my reset token?",
      "My password reset link expired",
      "My reset token is invalid",
    ],
    response: `To reset your DevPulse account password, please check your registered email inbox.

If you have already requested a password reset:

1. Open your email inbox.
2. Find the password reset email from DevPulse.
3. Check your spam or junk folder if you cannot find it.
4. Open the email and click the password reset link.
5. Enter your new password.
6. Confirm your new password and submit the form.

If you haven't received the email, you can request another one.

Important:

- Password reset links may expire.
- An expired or invalid link cannot be used.
- Never share your password or reset link with anyone.

Once your password is updated, return to the login page.`,
    suggestedLinks: [
      {
        label: "Request reset email",
        href: CHATBOT_LINKS.forgotPassword,
        description: "Request another password reset email",
        icon: "password",
      },
    ],
  },

  // 6. EMAIL VERIFICATION
  {
    keywords: [
      "verify email",
      "email verification",
      "verify account",
      "not verified",
      "account verification",
      "activation email",
      "verification token",
      "activate account",
      "confirm email",
      "verify my email",
      "email confirmation",
    ],
    questions: [
      "How do I verify my email?",
      "How can I activate my account?",
      "My account is not verified",
      "Where do I enter my verification token?",
      "How do I confirm my email?",
    ],
    response: `To verify your DevPulse account, please check your registered email inbox.

Follow these steps:

1. Open your registered email inbox.
2. Find the verification email from DevPulse.
3. Open the email.
4. Click the verification link.
5. The link will take you to the verification page.
6. Follow the instructions to complete verification.

Once verification is successful, your email address will be confirmed and you can log in to your account.

If you cannot find the verification email:

- Check your spam or junk folder.
- Make sure you entered the correct email address.
- Wait a few minutes for the email to arrive.
- Request another verification email if necessary.

For security, never share your verification link or token with anyone.`,
    suggestedLinks: [
      {
        label: "Resend verification email",
        href: CHATBOT_LINKS.resendVerification,
        description: "Request a new verification email",
        icon: "verification",
      },
    ],
  },

  // 7. RESEND VERIFICATION EMAIL
  {
    keywords: [
      "resend verification",
      "resend verification email",
      "send verification again",
      "verification email again",
      "didn't receive verification",
      "no verification email",
      "send another verification",
      "verification email missing",
      "not received verification",
    ],
    questions: [
      "I didn't receive a verification email",
      "Can I resend the verification email?",
      "How do I get another verification link?",
      "My verification email never arrived",
      "Can you send another verification email?",
    ],
    response: `You can request another verification email for your DevPulse account.

Follow these steps:

1. Open the Resend Verification page.
2. Enter your registered email address.
3. Submit your request.
4. Check your email inbox for the new verification email.
5. Open the latest verification email.
6. Click the verification link to complete verification.

Troubleshooting:

- Check your spam and junk folders.
- Make sure your email address is correct.
- Wait a few minutes for the email to arrive.
- Always use the latest verification link because older links may expire.

If you still cannot receive the email, please try again later.`,
    suggestedLinks: [
      {
        label: "Resend verification",
        href: CHATBOT_LINKS.resendVerification,
        description: "Request a new verification email",
        icon: "verification",
      },
    ],
  },

  // 8. MISSING EMAIL
  {
    keywords: [
      "email not received",
      "no email",
      "missing email",
      "email not coming",
      "spam",
      "junk",
      "not receiving email",
      "email not arrived",
      "didn't get email",
    ],
    questions: [
      "I am not receiving emails",
      "Why haven't I received an email?",
      "I checked my inbox but nothing is there",
      "Where is my verification email?",
      "Why didn't I get my reset email?",
    ],
    response: `Let's troubleshoot your missing DevPulse email.

Please try these steps:

1. Check that you entered the correct email address.
2. Check your inbox.
3. Check your spam or junk folder.
4. Wait a few minutes for the email to arrive.
5. Request another email if necessary.

Make sure you are requesting the correct email type.

For password recovery, use the Forgot Password page.

For account verification, use the Resend Verification page.`,
    suggestedLinks: [
      {
        label: "Forgot password",
        href: CHATBOT_LINKS.forgotPassword,
        description: "Request a password reset email",
        icon: "password",
      },
      {
        label: "Resend verification",
        href: CHATBOT_LINKS.resendVerification,
        description: "Request another verification email",
        icon: "verification",
      },
    ],
  },

  // 9. ACCOUNT NOT VERIFIED
  {
    keywords: [
      "unverified account",
      "account not active",
      "account inactive",
      "verify before login",
      "verification required",
      "email not confirmed",
    ],
    questions: [
      "Why is my account not active?",
      "Why do I need to verify my email?",
      "Why can't I log in before verification?",
      "My account is still unverified",
    ],
    response: `Your DevPulse account may require email verification before you can access your account.

To resolve this:

1. Open the Resend Verification page.
2. Enter your registered email address.
3. Submit your request.
4. Check your inbox for the new verification email.
5. Open the email and click the verification link.

Once verification succeeds, return to the login page and try again.`,
    suggestedLinks: [
      {
        label: "Resend verification",
        href: CHATBOT_LINKS.resendVerification,
        description: "Request a new verification link",
        icon: "verification",
      },
      {
        label: "Login",
        href: CHATBOT_LINKS.login,
        description: "Access your account",
        icon: "login",
      },
    ],
  },

  // 10. SECURITY
  {
    keywords: [
      "security",
      "safe",
      "password safety",
      "token security",
      "share password",
      "share token",
      "account protection",
    ],
    questions: [
      "Is my account secure?",
      "Should I share my verification token?",
      "Can I share my reset token?",
      "How do I protect my account?",
    ],
    response: `Your account security is important.

Please follow these security guidelines:

1. Never share your password.
2. Never share verification tokens.
3. Never share password reset tokens.
4. Only use official DevPulse account pages.
5. Do not open suspicious email links.
6. Use a strong and unique password.

The support assistant will never ask you for your password or verification token.`,
    suggestedLinks: [
      {
        label: "Login",
        href: CHATBOT_LINKS.login,
        description: "Access your account",
        icon: "login",
      },
    ],
  },
];

// Default response
export const DEFAULT_RESPONSE: ChatbotKnowledge = {
  keywords: [],
  questions: [],
  response: `Thanks for contacting DevPulse support!

I'm here to help you with your account.

I can assist with:

- Creating an account
- Logging into your account
- Email verification
- Resending verification emails
- Forgot passwords
- Password resets
- Missing emails
- Account security

Please describe your issue in more detail, or choose one of the suggested options below.`,
  suggestedLinks: QUICK_ACTIONS,
};

// Find matching user question
export const getAssistantReply = (
  message: string,
): ChatbotKnowledge => {
  const text = message.toLowerCase().trim();

  if (!text) {
    return DEFAULT_RESPONSE;
  }

  // Prioritize longer keywords to reduce accidental matches.
  const knowledge = [...CHATBOT_KNOWLEDGE].sort(
    (a, b) =>
      Math.max(...b.keywords.map((keyword) => keyword.length)) -
      Math.max(...a.keywords.map((keyword) => keyword.length)),
  );

  const match = knowledge.find((item) =>
    item.keywords.some((keyword) => text.includes(keyword)),
  );

  return match ?? DEFAULT_RESPONSE;
};
