

import gdown
import os

file_id = "1GZGJrHKIQbmz7GAik_CysPOjzVXxmGB_"  # Replace with your Google Drive file ID
output = "plastic_type_model.keras"

if not os.path.exists(output):
    url = f"https://drive.google.com/uc?id={file_id}"
    gdown.download(url, output, quiet=False)
    print("Model downloaded!")
else:
    print("Model already exists.")
