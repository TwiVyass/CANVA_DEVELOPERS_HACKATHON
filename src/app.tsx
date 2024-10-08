import React, { useState } from "react";
import { Button, Text } from "@canva/app-ui-kit";
import axios from "axios";
import { addNativeElement } from "@canva/design";

export const App = () => {
  const [imageFile, setImageFile] = useState(null);

  // Handle image file change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Process the image
  const handleImageProcessing = async () => {
    if (!imageFile) {
      console.error("No image file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // Send the image file to your backend for processing
      const response = await axios.post("http://localhost:8080/process-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming backend returns the URL or base64 data of the processed image
      const skeletonImageUrl = response.data.skeletonImageUrl; // Make sure this is a valid URL or base64 data

      // Add the processed image to Canva
      addNativeElement({
        type: "IMAGE",
        dataUrl: skeletonImageUrl, // Use dataUrl for the image source
      });
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  return (
    <div className="App">
      <h1>Draw-From-Skeleton</h1>
      <Text>Upload an image and click the button to process it and get its skeleton.</Text>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <Button variant="primary" onClick={handleImageProcessing}>
        Process Image
      </Button>
    </div>
  );
};

export default App;
