import os
import cv2
import numpy as np
from flask import Flask, jsonify, request
from ultralytics import YOLO

app = Flask(__name__)

# Enable CORS for all routes so Vercel frontend can communicate with Render backend
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

# Resolve model path dynamically
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, "best.pt")

# Load YOLO model
print(f"Loading YOLO model from: {MODEL_PATH} ...")
model = YOLO(MODEL_PATH)
print("Model loaded successfully!")

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "online",
        "system": "RakshaNetra AI Surveillance Engine",
        "model": "YOLOv8",
        "endpoints": {
            "health": "/",
            "detect": "POST /detect (form-data: image file)"
        }
    })

@app.route("/detect", methods=["POST", "OPTIONS"])
def detect():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    if "image" not in request.files:
        return jsonify({"error": "No 'image' file provided in form-data"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename provided"}), 400

    try:
        # Read image file to numpy array
        img_bytes = file.read()
        np_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({"error": "Could not decode image"}), 400

        # Run YOLO inference with inference_mode to minimize RAM
        import torch
        with torch.inference_mode():
            results = model(img, verbose=False)
        detections = []

        for r in results:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                label = model.names[cls_id]
                conf = float(box.conf[0])
                x1, y1, x2, y2 = map(int, box.xyxy[0])

                detections.append({
                    "label": label,
                    "confidence": round(conf, 4),
                    "box": {
                        "x1": x1,
                        "y1": y1,
                        "x2": x2,
                        "y2": y2
                    }
                })

        return jsonify({
            "status": "success",
            "detections": detections,
            "count": len(detections)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
