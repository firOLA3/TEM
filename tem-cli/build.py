import os
import sys

def main():
    print("Building TEM executable...")
    
    try:
        import PyInstaller.__main__
    except ImportError:
        print("PyInstaller not found. Please run 'pip install pyinstaller'")
        sys.exit(1)
        
    main_script = os.path.join("src", "tem_cli", "main.py")
    
    args = [
        main_script,
        "--name", "tem",
        "--onefile",
        "--noconsole",
        "--clean",
    ]
    
    PyInstaller.__main__.run(args)
    
    print("\nBuild complete. Check the 'dist' directory for tem.exe")

if __name__ == "__main__":
    main()
