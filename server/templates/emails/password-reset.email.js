export const passwordResetEmailTemplate = ({
  name,
  resetUrl,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Reset your password</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f5;
    font-family: Arial, Helvetica, sans-serif;
  "
>

  <div
    style="
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 12px;
    "
  >

    <h1 style="color: #111827;">
      Reset your password
    </h1>

    <p style="color: #374151;">
      Hello ${name},
    </p>

    <p
      style="
        color: #374151;
        line-height: 1.6;
      "
    >
      We received a request to reset your DevPulse AI
      password.
    </p>

    <p
      style="
        color: #374151;
        line-height: 1.6;
      "
    >
      Click the button below to create a new password.
    </p>

    <div style="margin: 30px 0;">

      <a
        href="${resetUrl}"
        style="
          display: inline-block;
          padding: 14px 24px;
          background-color: #2563eb;
          color: #ffffff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
        "
      >
        Reset Password
      </a>

    </div>

    <p
      style="
        color: #6b7280;
        font-size: 14px;
      "
    >
      This password reset link will expire in 15 minutes.
    </p>

    <p
      style="
        color: #6b7280;
        font-size: 14px;
      "
    >
      If you didn't request a password reset, you can safely
      ignore this email.
    </p>

  </div>

</body>

</html>
`;
};