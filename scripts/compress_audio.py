import os
import json
import subprocess
import sys

# Configuration
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_ROOT = os.path.join(PROJECT_ROOT, 'public', 'assets', 'audio')
MANIFEST_PATH = os.path.join(PROJECT_ROOT, 'public', 'assets', 'manifest.json')

def convert_to_mp3(file_path):
    """Converts a WAV file to MP3 using ffmpeg."""
    if not file_path.lower().endswith('.wav'):
        return None
    
    mp3_path = file_path[:-4] + '.mp3'
    
    # Check if we should skip
    if os.path.exists(mp3_path):
        # We could skip if exists, but we want to ensure it is the latest version
        # For this task, let's just overwrite to be sure
        pass

    print(f"Converting {file_path} to {mp3_path}...")
    
    try:
        # -b:a 192k is a good balance for lightweight but quality
        cmd = ['ffmpeg', '-y', '-i', file_path, '-b:a', '192k', mp3_path]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return mp3_path
    except subprocess.CalledProcessError as e:
        print(f"Error converting {file_path}: {e}")
        return None
    except FileNotFoundError:
        print("Error: ffmpeg not found. Please ensure ffmpeg is installed and in your PATH.")
        sys.exit(1)

def update_manifest(manifest_path):
    """Updates the manifest.json file with new MP3 paths."""
    print(f"Updating manifest at {manifest_path}...")
    with open(manifest_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    updated_count = 0
    
    def recursive_update(obj):
        nonlocal updated_count
        if isinstance(obj, dict):
            for k, v in obj.items():
                if isinstance(v, str):
                    # Check if this string looks like a path we might have converted
                    # The manifest paths start with /assets/audio/
                    if '/assets/audio/' in v and v.lower().endswith('.wav'):
                        # Check if corresponding mp3 exists
                        # v is like "/assets/audio/subdir/file.wav"
                        # We need to construct absolute path to verify existence
                        
                        # Remove leading slash for join
                        rel_path = v.lstrip('/')
                        # Replace forward slashes with os sep
                        os_sep_path = rel_path.replace('/', os.sep)
                        
                        full_path_wav = os.path.join(PROJECT_ROOT, 'public', os_sep_path)
                        # The mp3 should be next to it
                        full_path_mp3 = full_path_wav[:-4] + '.mp3'
                        
                        if os.path.exists(full_path_mp3):
                             new_val = v[:-4] + '.mp3'
                             obj[k] = new_val
                             print(f"  Updated entry: {v} -> {new_val}")
                             updated_count += 1
                else:
                    recursive_update(v)
        elif isinstance(obj, list):
            for item in obj:
                recursive_update(item)

    recursive_update(data)
    
    if updated_count > 0:
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Manifest updated with {updated_count} changes.")
    else:
        print("No changes needed in manifest.")

def main():
    if not os.path.exists(AUDIO_ROOT):
        print(f"Audio directory not found: {AUDIO_ROOT}")
        return

    print(f"Scanning for .wav files in {AUDIO_ROOT}...")
    
    wav_files = []
    # Walk through audio directory
    for root, dirs, files in os.walk(AUDIO_ROOT):
        for file in files:
            if file.lower().endswith('.wav'):
                full_path = os.path.join(root, file)
                wav_files.append(full_path)
    
    if not wav_files:
        print("No .wav files found.")
    else:
        print(f"Found {len(wav_files)} .wav files. Starting conversion...")
        for wav in wav_files:
            convert_to_mp3(wav)
            
    # Update manifest
    if os.path.exists(MANIFEST_PATH):
        update_manifest(MANIFEST_PATH)
    else:
        print("Manifest not found.")

if __name__ == "__main__":
    main()
