from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
from io import BytesIO

app = Flask(__name__)

def skeletonize_image(image):
    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply threshold
    _, threshed = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
    
    # Perform skeletonization
    skeleton = cv2.ximgproc.thinning(threshed)
    
    return skeleton

@app.route('/process-image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files['image']
    np_img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    
    skeleton = skeletonize_image(img)
    
    _, buffer = cv2.imencode('.png', skeleton)
    skeleton_image = base64.b64encode(buffer).decode('utf-8')
    
    return jsonify({"skeletonImageUrl": f"data:image/png;base64,{skeleton_image}"})

if __name__ == '__main__':
    app.run(port=3000)
