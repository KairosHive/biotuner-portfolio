import os
from PIL import Image
import shutil

source_dir = r"c:\Users\Admin\git\biotuner-portfolio\_raw_materials\figures"
dest_dir = r"c:\Users\Admin\git\biotuner-portfolio\public\assets\figures"

files_to_process = {
    "figure1.tiff": "figure_1.png",
    "figure2.tiff": "figure_2.png",
    "figure4.tiff": "figure_4.png",
    "figure5.tiff": "figure_5.png",
    "figure9.tiff": "figure_9.png"
}

gemini_files = [f for f in os.listdir(source_dir) if f.startswith("Gemini")]
for i, f in enumerate(gemini_files):
    files_to_process[f] = f"gemini_{i+1}.png"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

for src_name, dest_name in files_to_process.items():
    src_path = os.path.join(source_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    
    if os.path.exists(src_path):
        print(f"Processing {src_name} -> {dest_name}")
        try:
            if src_name.endswith('.tiff') or src_name.endswith('.tif'):
                with Image.open(src_path) as img:
                    img.save(dest_path, 'PNG')
            else:
                shutil.copy2(src_path, dest_path)
            print("Success")
        except Exception as e:
            print(f"Failed: {e}")
    else:
        print(f"Source file not found: {src_name}")
