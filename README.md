## Inspiration
The inspiration behind "Draw-From-Skeleton" is to enable users, especially those in creative fields, to build upon skeletal structures of images directly within Canva. This tool aims to simplify the process of tracing or enhancing images, making it accessible for artists, designers, and educators who wish to create or teach drawing techniques using skeletal outlines.
## What it does
"Draw-From-Skeleton" allows users to upload an image within Canva, processes the image to extract its skeletal structure using Python's OpenCV library, and then displays the processed skeletal image within Canva. Users can then build upon this base skeleton as they wish.
## How we built it
The project was built using Canva's SDK to integrate the app directly into the Canva environment. The frontend is developed in TypeScript with React, utilizing Canva's UI components. The backend is built with Express.js and Python. The backend service processes images by extracting their skeletal structure using OpenCV, which is then returned to the Canva app for display.
## Challenges we ran into
One of the key challenges was integrating the backend image processing service with Canva's frontend. Ensuring seamless communication between the Python-based backend and the React/TypeScript frontend required overcoming issues related to file handling, API integration, and cross-origin requests. Additionally, working with Canva's SDK and managing the development environment posed challenges, especially when dealing with TypeScript errors and module compatibility issues.
## Accomplishments that we're proud of
Successfully integrating the image processing pipeline with Canva's environment is a major accomplishment. Extracting and displaying skeletal structures from images within Canva highlights the potential to further apply image processing solutions creatively over Canva.
## What we learned
I learned a lot about working with Canva's SDK and integrating backend services with frontend applications. The process provided insights into handling a full-stack project, debugging TypeScript issues, and ensuring smooth communication between different components of the application.

## What's next for Draw-From-Skeleton
 Expanding the skeletonizing features capabilities, i.e. allowing users to edit thickness or color of the uploaded image's skeleton. 
