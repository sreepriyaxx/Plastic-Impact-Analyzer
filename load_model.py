from tensorflow.keras.models import load_model
import download_model  # this will run the download script first

# Load the model
model = load_model("plastic_type_model.keras")
print("Model loaded successfully!")

# Optional: test with dummy input
import numpy as np
sample_input = np.random.rand(1, 224, 224, 3)  # adjust shape to your model
prediction = model.predict(sample_input)
print("Prediction:", prediction)
