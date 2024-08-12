import React, { useState } from "react";
import { Button, Text } from "@canva/app-ui-kit";
import axios from "axios";
import { addNativeElement } from "@canva/design";

export const App = () => {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleImageProcessing = async () => {
    if (!imageFile) {
      console.error("No image file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post("http://localhost:3000/process-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { skeletonImageUrl } = response.data;
      if (skeletonImageUrl) {
        addNativeElement({
          type: "IMAGE",
          dataUrl: skeletonImageUrl,
        });
      } else {
        console.error("No skeleton image URL returned");
      }
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
