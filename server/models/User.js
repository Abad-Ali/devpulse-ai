import mongoose from "mongoose";

const authProviderSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["email", "google", "github"],
      required: true,
    },
    providerId: {
      type: String,
      required: function () {
        return this.provider !== "email";
      },
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    // Basic profile
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      match: [
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*$/,
        "Username can only contain letters, numbers, underscores, and single dots between characters.",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    bio: { type: String, maxlength: 160, default: "" },
    avatar: { type: String, default: "" },

    // Authentication
    passwordHash: { type: String, select: false },
    authProviders: { type: [authProviderSchema], default: [] },

    // Authorization
    role: { type: String, enum: ["user", "admin"], default: "user" },
    accountType: { type: String, enum: ["user", "demo"], default: "user" },

    // Account status
    isEmailVerified: { type: Boolean, default: false },

    emailVerificationToken: { type: String, default: null },
    emailVerificationExpires: { type: Date, default: null },

    passwordResetToken: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null },
    
    isActive: { type: Boolean, default: true },

    // Preferences
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system",
      },
      editorFontSize: { type: Number, min: 10, max: 32, default: 14 },
      tabSize: { type: Number, enum: [2, 4, 8], default: 2 },
    },

    // Statistics
    stats: {
      programsCreated: { type: Number, default: 0, min: 0 },
      codeExecutions: { type: Number, default: 0, min: 0 },
      successfulExecutions: { type: Number, default: 0, min: 0 },
      aiRequests: { type: Number, default: 0, min: 0 },
      aiFixesApplied: { type: Number, default: 0, min: 0 },
      githubPushes: { type: Number, default: 0, min: 0 },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
