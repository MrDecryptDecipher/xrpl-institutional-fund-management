import requests

BASE_URL = "http://localhost:5002"
API_KEY = "d4f38ef3-59ab-40fb-b590-4d28893def35"
HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY
}
TIMEOUT = 30

def test_get_xaman_payload_status_by_uuid():
    create_payload_url = f"{BASE_URL}/api/create-xaman-payload"
    payload_body = {
        "transactionType": "Payment",
        "transactionData": {
            "Account": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
            "Amount": "1000000",
            "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
        }
    }

    uuid = None
    try:
        # Create a Xaman payload to get a valid uuid
        response = requests.post(create_payload_url, json=payload_body, headers=HEADERS, timeout=TIMEOUT)
        assert response.status_code == 200, f"Unexpected status code on payload creation: {response.status_code}"
        data = response.json()
        assert isinstance(data, dict), "Response is not a JSON object"
        assert data.get("success") is True, "Payload creation success is False"
        assert "uuid" in data and isinstance(data["uuid"], str) and data["uuid"], "uuid missing or invalid in payload creation response"

        uuid = data["uuid"]

        # Fetch the payload status by uuid
        status_url = f"{BASE_URL}/api/payload-status/{uuid}"
        status_response = requests.get(status_url, headers=HEADERS, timeout=TIMEOUT)
        assert status_response.status_code == 200, f"Unexpected status code on payload status: {status_response.status_code}"
        status_data = status_response.json()

        assert isinstance(status_data, dict), "Payload status response is not a JSON object"
        assert "meta" in status_data and isinstance(status_data["meta"], dict), "'meta' missing or not an object in response"
        assert "response" in status_data and isinstance(status_data["response"], dict), "'response' missing or not an object in response"

    finally:
        # no deletion endpoint provided for payload; skipping cleanup
        pass

test_get_xaman_payload_status_by_uuid()