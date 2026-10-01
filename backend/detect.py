import os
from ultralytics import YOLO
import cv2

# Load your trained model
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "best.pt")
model = YOLO(model_path)

# Open camera (0 = webcam)
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Run YOLO detection
    results = model(frame)

    for r in results:
        for box in r.boxes:

            # Coordinates of box
            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # Confidence
            conf = float(box.conf[0])

            # Class ID → label
            cls = int(box.cls[0])
            label = model.names[cls]

            # Draw rectangle
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)

            # Put label
            cv2.putText(frame, f"{label} {conf:.2f}",
                        (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.5, (0,255,0), 2)

    cv2.imshow("Detection", frame)

    if cv2.waitKey(1) == 27:
        break

cap.release()
cv2.destroyAllWindows()