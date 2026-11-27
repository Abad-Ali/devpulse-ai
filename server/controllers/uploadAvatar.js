import cloudinary from "../config/cloudinary.js";

const uploadAvatar = async (fileBuffer) => {
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "DevPulse_AI/profile_pictures",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(fileBuffer);
  });

  return result.secure_url;
};

export default uploadAvatar;