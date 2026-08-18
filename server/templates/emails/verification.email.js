export const verificationEmailTemplate = ({
  name,
  verificationUrl,
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

  <title>Verify your email</title>
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
      Welcome to DevPulse AI
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
      Thanks for creating your DevPulse AI account.
      Please verify your email address by clicking
      the button below.
    </p>

    <div style="margin: 30px 0;">

      <a
        href="${verificationUrl}"
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
        Verify Email
      </a>

    </div>

    <p
      style="
        color: #6b7280;
        font-size: 14px;
      "
    >
      This verification link will expire in 15 minutes.
    </p>

    <p
      style="
        color: #6b7280;
        font-size: 14px;
      "
    >
      If you didn't create this account, you can safely
      ignore this email.
    </p>

  </div>

</body>

</html>
`;
};