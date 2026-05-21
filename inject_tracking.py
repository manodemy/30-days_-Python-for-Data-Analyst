import os
import glob

tracking_snippet = """  <!-- Manodemy Telemetry & Analytics -->
  <script>
    if (!window.MANODEMY_CONFIG) {
        window.MANODEMY_CONFIG = {};
    }
    window.MANODEMY_CONFIG.SUPA_URL = 'https://gvhnwmuyrwissgkumeif.supabase.co';
    window.MANODEMY_CONFIG.SUPA_KEY = 'sb_publishable_x0gyXkcrCSaxSG23Zyi7qA__v1sBgOq';
  </script>
  <script src="supabase.js"></script>
  <script src="manodemy-telemetry.js"></script>
"""

def inject_tracking(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {os.path.basename(file_path)}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Prevent duplicate injections
    if 'manodemy-telemetry.js' in content:
        print(f"Skipped  {os.path.basename(file_path)} (already injected)")
        return

    # Replace the last occurrence of </body>
    if '</body>' in content:
        parts = content.rsplit('</body>', 1)
        new_content = parts[0] + tracking_snippet + '</body>' + parts[1]

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Injected {os.path.basename(file_path)}")
    else:
        print(f"FAILED   {os.path.basename(file_path)} (</body> not found)")

if __name__ == "__main__":
    base_dir = r"d:\Learn Python in 60days\Manodemy_Web_V2"

    files_to_inject = [
        os.path.join(base_dir, "index.html"),
        os.path.join(base_dir, "payment-success.html"),
        os.path.join(base_dir, "payment-failed.html"),
    ]

    # Add day01.html to day30.html
    for i in range(1, 31):
        files_to_inject.append(os.path.join(base_dir, f"day{i:02d}.html"))

    for file in files_to_inject:
        inject_tracking(file)

    print("\nDone! All curriculum pages have telemetry.")

