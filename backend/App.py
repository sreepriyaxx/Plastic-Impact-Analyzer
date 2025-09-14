from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS

model = load_model('plastic_type_model.keras')

PLASTIC_IMPACT = {
    "PVC": {
        "impact": "PVC is recyclable but releases toxins if burned.",
        "disposal": "Dispose at hazardous waste facility."
    },
    "PET": {
        "impact": "PET is widely recycled, takes ~450 years to degrade.",
        "disposal": "Place in regular recycling bin."
    },
    "HDPE": {
        "impact": "HDPE is recyclable, takes ~500 years to degrade if not recycled.",
        "disposal": "Place in regular recycling bin."
    }
}

def preprocess_image(image):
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    image_array = image_array.reshape((1, 224, 224, 3))
    return image_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    img = Image.open(file.stream).convert('RGB')

    processed_image = preprocess_image(img)
    prediction = model.predict(processed_image)

    predicted_class_index = np.argmax(prediction)

    CLASS_MAPPING = {
        0: "Others",
        1: "PC",
        2: "PE",
        3: "PET",
        4: "PP",
        5: "PS"
    }

    plastic_type = CLASS_MAPPING.get(predicted_class_index, "Unknown")

    impact_info = PLASTIC_IMPACT.get(plastic_type, {
        "impact": "No info available",
        "disposal": "No advice available"
    })

    response = {
        "plastic_type": plastic_type,
        "impact": impact_info.get('impact', 'No info available'),
        "disposal_advice": impact_info.get('disposal', 'No advice available')
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)



