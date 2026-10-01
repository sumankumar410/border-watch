# Border Watch - AI Detection Backend

This folder contains the YOLOv8 object detection model and scripts for border surveillance.

## Files
- `app.py`: Production Flask REST API for cloud deployment (Render, AWS, etc.) with `/detect` endpoint and full CORS.
- `detect.py`: Real-time object detection script using local webcam/video stream and OpenCV HUD.
- `best.pt`: Trained YOLO weights.
- `requirements.txt`: Python package dependencies (Flask, Gunicorn, Ultralytics, OpenCV-headless).

## Setup & Running

### 1. Local Webcam Mode:
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python detect.py
```

### 2. Cloud API Mode (Render / Production):
```bash
# Start with Gunicorn on Linux / Render
gunicorn app:app

# Or test locally with Flask
python app.py
```

### API Endpoints
- `GET /`: Health check & system status.
- `POST /detect`: Send an image in `multipart/form-data` with key `image`. Returns JSON bounding boxes, labels, and confidence scores.
