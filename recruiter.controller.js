// controllers/recruiter.controller.js
export const uploadResumeTemplate = (req, res) => {
    try {
      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded', success: false });
      }
  
      // Process the uploaded file (save the file path to the database or return a response)
      const filePath = req.file.path;  // This will be the path where the file is saved
  
      // You can save the file information to the database here if needed
      // Example: Save the file path to the recruiter or job listing data
  
      res.status(200).json({
        message: 'Resume template uploaded successfully',
        success: true,
        filePath,  // Send the file path in the response if needed
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', success: false });
    }
  };
  