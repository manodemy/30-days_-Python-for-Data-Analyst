"""

Advanced diagnostic: Test insert with explicit role headers to pinpoint the exact failure.

"""

import urllib.request, json, ssl, urllib.error



ctx = ssl.create_default_context()

ctx.check_hostname = False

ctx.verify_mode = ssl.CERT_NONE



SUPA_URL = "https://erqoyvbuhmkyvcqgwcbz.supabase.co"

ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw"



def api_insert(extra_headers={}):

    headers = {

        "apikey": ANON_KEY,

        "Authorization": f"Bearer {ANON_KEY}",

        "Content-Type": "application/json",

        "Prefer": "return=minimal",

        **extra_headers

    }

    body = json.dumps({

        "session_id": "diag_test_" + str(int(__import__('time').time())),

        "page_url": "/diagnostic"

    }).encode()

    req = urllib.request.Request(

        f"{SUPA_URL}/rest/v1/page_views",

        data=body, headers=headers, method="POST"

    )

    try:

        with urllib.request.urlopen(req, context=ctx) as r:

            return r.status, r.read().decode() or "(empty - success)"

    except urllib.error.HTTPError as e:

        return e.code, e.read().decode()



# Test 1: Standard anon insert

print("TEST A: Insert without user_id (anonymous)")

s, b = api_insert()

print(f"  Status: {s} | {b[:200]}")



# Test 2: Check if the page_views table allows user_id=NULL

print("\nTEST B: Insert with explicit user_id=null")

def api_insert_with_null():

    headers = {

        "apikey": ANON_KEY,

        "Authorization": f"Bearer {ANON_KEY}",

        "Content-Type": "application/json",

        "Prefer": "return=representation"

    }

    body = json.dumps({

        "session_id": "diag_null_" + str(int(__import__('time').time())),

        "page_url": "/diagnostic-null",

        "user_id": None

    }).encode()

    req = urllib.request.Request(

        f"{SUPA_URL}/rest/v1/page_views",

        data=body, headers=headers, method="POST"

    )

    try:

        with urllib.request.urlopen(req, context=ctx) as r:

            return r.status, r.read().decode()

    except urllib.error.HTTPError as e:

        return e.code, e.read().decode()



s, b = api_insert_with_null()

print(f"  Status: {s} | {b[:300]}")



# Test 3: Count rows in page_views to see if any inserts succeeded

print("\nTEST C: Count rows in page_views")

req = urllib.request.Request(

    f"{SUPA_URL}/rest/v1/page_views?select=count",

    headers={

        "apikey": ANON_KEY,

        "Authorization": f"Bearer {ANON_KEY}",

        "Range-Unit": "items",

        "Prefer": "count=exact"

    }

)

try:

    with urllib.request.urlopen(req, context=ctx) as r:

        print(f"  Status: {r.status} | Content-Range: {r.headers.get('Content-Range')}")

except urllib.error.HTTPError as e:

    print(f"  Status: {e.code} | {e.read().decode()[:200]}")



# Test 4: Check if page_views has NOT NULL constraint on session_id

print("\nTEST D: Check page_views schema via PostgREST")

req = urllib.request.Request(

    f"{SUPA_URL}/rest/v1/",

    headers={"apikey": ANON_KEY}

)

try:

    with urllib.request.urlopen(req, context=ctx) as r:

        data = json.loads(r.read().decode())

        pv = [t for t in data.get('definitions', {}).keys() if 'page_view' in t]

        print(f"  Tables matching 'page_view': {pv}")

except Exception as e:

    print(f"  Error: {e}")

