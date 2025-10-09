from pathlib import Path
import webbrowser

html_path = Path(__file__).parent / "index.html"

if not html_path.exists():
    print("Erreur — fichier introuvable :", html_path)
else:
    webbrowser.open(html_path.resolve().as_uri(), new=2)
