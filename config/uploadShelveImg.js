
 export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  // 1. Setup the form data
  const formData = new FormData();
  formData.append("file", file);
  
  // REPLACE THESE WITH YOUR ACTUAL VALUES
  formData.append("upload_preset", "bookify_uploads"); 
  formData.append("cloud_name", "gmovi"); 

  try {
    // 2. Upload to Cloudinary REST API
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/gmovi/image/upload", 
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    // 3. Return the optimized URL
    // 'secure_url' is the HTTPS link to the image
    return data.secure_url; 
    
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};