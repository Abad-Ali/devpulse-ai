const DEVPULSE = {
    website: "https://YOUR-DEVPULSE-WEBSITE.com",
    logo: "https://YOUR-DEVPULSE-WEBSITE.com/logo.png",
    github: "https://github.com/Abad-Ali",
    developer: "Abad-Ali",
    developerGithub: "https://github.com/Abad-Ali",
    developerPortfolio: "https://abadali.vercel.app",
    geminiTerms: "https://ai.google.dev/gemini-api/terms",
};

const escapeMarkdown = (value = "") => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const buildDevPulseReadme = ({ repositoryName = "Untitled Project", description = "", language = "Not specified" }) => {
    const name = escapeMarkdown(repositoryName);
    const projectDescription = escapeMarkdown(
        description || "A project created using DevPulse AI."
    );
    const projectLanguage = escapeMarkdown(language);

    return `# ${name}

${projectDescription}

This project was created using [DevPulse AI](${DEVPULSE.website}), a
browser-based developer workspace for writing, running, debugging, and
managing code.

## About DevPulse AI

DevPulse AI brings coding tools, AI assistance, program management,
execution history, and GitHub integration into one workspace.

Learn more: [DevPulse AI](${DEVPULSE.website})

## Features

- Browser-based code editor for writing and editing programs.
- Code execution for supported programming languages.
- AI-assisted code explanation and debugging.
- Program creation, editing, saving, and management.
- Execution history with output, errors, and execution details.
- GitHub integration for repository workflows.

Feature availability depends on the current DevPulse AI release.

## Quick Guide

1. Open [DevPulse AI](${DEVPULSE.website}) and sign in.
2. Create a program and select a supported programming language.
3. Write your code in the editor.
4. Run your code and review the output or errors.
5. Use available AI tools to understand code or investigate errors.
6. Save your work and review previous executions when needed.
7. Connect GitHub to use the available repository features.

The exact interface and available actions may vary by release.

## AI Features and Modes

DevPulse AI provides AI-assisted development capabilities where available.

Potential workflows include:

- **Explain Code:** Understand code structure and behavior.
- **Debug Code:** Investigate errors and possible solutions.
- **Optimize Code:** Explore improvements to readability and performance.
- **Generate Tests:** Draft test cases for review.
- **Generate Documentation:** Draft code explanations and documentation.

Only features available in the current release can be used.

### How AI Works

When you request AI assistance, DevPulse AI prepares the relevant input
and sends it to the configured AI provider when required. Depending on
the feature, this may include prompts, selected code, error messages,
or related context. The provider processes the request and returns a
response for you to review.

AI-generated content can be inaccurate or insecure. Review and test
suggestions before applying them to your project.

### AI Data Usage

The information processed by an AI feature depends on its implementation
and the configured provider. Do not assume that every request is processed
locally or that submitted data is never retained.

Avoid submitting API keys, passwords, access tokens, confidential code,
or personal information unless you are authorized to share it and have
reviewed the applicable data-handling terms.

For Google's Gemini API, review the
[Gemini API Terms](${DEVPULSE.geminiTerms}).

## Security

Follow these practices when working with this repository:

- Never commit passwords, API keys, access tokens, or private keys.
- Store sensitive configuration in environment variables.
- Never expose backend secrets in frontend code.
- Review repository visibility before publishing.
- Review AI-generated code before executing or deploying it.
- Check dependencies before installing or running them.
- Remove sensitive information before sharing code or commit history.

Public repositories may be accessible to anyone. Private repository access
depends on GitHub permissions and policies.

## Privacy and User Data

Depending on the features used and the service implementation, DevPulse AI
may process account information, saved programs, execution records,
GitHub connection information, and AI request context.

The actual information collected, purpose of processing, storage,
retention, deletion, and sharing practices must match DevPulse AI's
implementation and applicable privacy disclosures.

Users should avoid submitting sensitive information to AI features and
should review the terms of any connected third-party service.

This README provides general information. It is not an official privacy
policy and does not guarantee specific data-handling practices.

## Terms and Conditions

When using DevPulse AI and its integrations:

- Use only code and content you have permission to use.
- Respect copyrights, licenses, and intellectual property rights.
- Do not use the service for unlawful or harmful activities.
- Do not attempt to access another user's account, code, or data.
- Do not misuse integrations or bypass security controls.
- Review and test AI-generated output before relying on it.
- Follow the applicable terms of GitHub and connected AI providers.
- Check repository permissions before sharing your work.

This section is a general usage guide, not a legally reviewed Terms
of Service or a substitute for applicable provider agreements.

## Project Information

- **Project name:** ${name}
- **Primary language:** ${projectLanguage}
- **Created with:** [DevPulse AI](${DEVPULSE.website})
- **Developer:** [${DEVPULSE.developer}](${DEVPULSE.developerGithub})
- **Developer portfolio:** [Visit portfolio](${DEVPULSE.developerPortfolio})
- **GitHub:** [DevPulse AI repositories](${DEVPULSE.github})

## Getting Started

Follow the setup instructions for this project's actual language,
dependencies, and framework.

### 1. Clone the repository

\`\`\`bash
git clone <repository-url>
cd ${repositoryName.replace(/[\r\n]/g, "").replace(/[`$]/g, "")}
\`\`\`

### 2. Install dependencies

Install the dependencies required by this project.

For a Node.js project, for example:

\`\`\`bash
npm install
\`\`\`

Use the appropriate package manager for your project.

### 3. Configure environment variables

Create a local environment configuration file if required by the project.
Add the required variable names to a documented example file such as
\`.env.example\`, but never commit real secrets.

### 4. Run the project

Use the start or development command defined by the project's
configuration. For example, a Node.js project may use:

\`\`\`bash
npm run dev
\`\`\`

The commands above are examples. Replace them with the actual setup
and run commands for this repository before sharing it.

## License

No license has been specified by this template. Add a LICENSE file
if you intend to distribute or license this project.

The project's license is separate from DevPulse AI's own licensing.

---

Created with [DevPulse AI](${DEVPULSE.website}).
`;
};

export default buildDevPulseReadme;