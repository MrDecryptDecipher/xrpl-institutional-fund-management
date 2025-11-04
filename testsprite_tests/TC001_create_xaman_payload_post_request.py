import requests
import uuid

BASE_URL = "http://localhost:5002"
API_KEY = "d4f38ef3-59ab-40fb-b590-4d28893def35"
HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY
}

def test_create_xaman_payload_post_request():
    url = f"{BASE_URL}/api/create-xaman-payload"
    payload = {
        "transactionType": "Payment",
        "transactionData": {
            "Account": "rEXAMPLE8YwP8hHExAMPLE1dr2M",
            "Amount": "1000",
            "Destination": "rDESTINATION8YwP8hHExAMPLEdr2M"
        }
    }

    try:
        response = requests.post(url, json=payload, headers=HEADERS, timeout=30)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 200, f"Expected status code 200 but got {response.status_code}"

    try:
        resp_json = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    assert isinstance(resp_json.get("success"), bool), "'success' field missing or not boolean"
    assert resp_json["success"] is True, "API did not indicate success"

    uuid_val = resp_json.get("uuid")
    assert isinstance(uuid_val, str) and len(uuid_val) > 0, "Response missing 'uuid' or it's empty"

    refs = resp_json.get("refs")
    assert isinstance(refs, dict), "Response 'refs' field missing or not an object"

test_create_xaman_payload_post_request()