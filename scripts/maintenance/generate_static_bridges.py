import os
from pathlib import Path

root = Path(r'd:\Learn Python in 60days\Manodemy_Web_V2\public')

bridges = {
    'q1': '/Version-3/index.html?day=4&challenge=SQL-01-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q1_high_performer',
    'q2': '/Version-3/index.html?day=4&challenge=SQL-01-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q2_salary_analytic',
    'q3': '/Version-3/index.html?day=5&challenge=SQL-02-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q3_dept_ranking',
    'q4': '/Version-3/index.html?day=5&challenge=SQL-02-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q4_sales_growth',
    'q5': '/Version-3/index.html?day=4&challenge=SQL-03-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q5_count_null',
    'q6': '/Version-3/index.html?day=4&challenge=SQL-03-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q6_precedence',
    'q7': '/Version-3/index.html?day=5&challenge=SQL-04-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q7_where_having',
    'q8': '/Version-3/index.html?day=4&challenge=SQL-04-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day04_q8_date_range',
    'q9': '/Version-3/index.html?day=5&challenge=SQL-05-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day05_q9_left_join',
    'q10': '/Version-3/index.html?day=5&challenge=SQL-05-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day05_q10_conditional_count',
    'q11': '/Version-3/index.html?day=6&challenge=SQL-06-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day06_q11_ceo_hierarchy',
    'q12': '/Version-3/index.html?day=7&challenge=SQL-07-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day07_q12_not_in_null',
    'q13': '/Version-3/index.html?day=7&challenge=SQL-07-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day07_q13_salary_dense_rank',
    'q14': '/Version-3/index.html?day=8&challenge=SQL-08-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day08_q14_like_wildcard',
    'q15': '/Version-3/index.html?day=8&challenge=SQL-08-R2&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day08_q15_union_dedup',
    'q16': '/Version-3/index.html?day=9&challenge=SQL-09-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day09_q16_latest_record',
    'q17': '/Version-3/index.html?day=10&challenge=SQL-10-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day10_q17_gaps_islands',
    'q18': '/Version-3/index.html?day=11&challenge=SQL-11-R1&guest=true&tab=practice&utm_source=instagram&utm_medium=reels&utm_campaign=reel_day11_q18_manager_salary'
}

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url={target}">
  <title>Redirecting to Manodemy SQL Simulator...</title>
  <style>
    body {{ background: #0b0f19; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }}
    .box {{ text-align: center; padding: 24px; }}
    .spinner {{ width: 36px; height: 36px; border: 3px solid rgba(255,255,255,0.1); border-top-color: #00f0ff; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }}
    @keyframes spin {{ to {{ transform: rotate(360deg); }} }}
  </style>
  <script>
    window.location.replace('{target}');
  </script>
</head>
<body>
  <div class="box">
    <div class="spinner"></div>
    <p>Launching interactive SQL challenge...</p>
  </div>
</body>
</html>"""

for slug, target in bridges.items():
    # 1. /qXX/index.html
    p1 = root / slug / 'index.html'
    p1.parent.mkdir(parents=True, exist_ok=True)
    p1.write_text(html_template.format(target=target), encoding='utf-8')
    
    # 2. /go/qXX/index.html
    p2 = root / 'go' / slug / 'index.html'
    p2.parent.mkdir(parents=True, exist_ok=True)
    p2.write_text(html_template.format(target=target), encoding='utf-8')

print(f"Successfully generated {len(bridges) * 2} static bridge redirect pages in public/")
