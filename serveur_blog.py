import http.server
import socketserver
import webbrowser
from pathlib import Path
import os

PORT = 8000
root = Path(__file__).parent
os.chdir(root)  # sert les fichiers du dossier courant

Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    url = f"http://localhost:{PORT}/blog_musculation.html"
    print("Serveur lancé sur", url)
    webbrowser.open(url)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServeur arrêté.")
