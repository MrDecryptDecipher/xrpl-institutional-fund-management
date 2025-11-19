import requests
import uuid

BASE_URL = "http://localhost:5002"
API_KEY = "d4f38ef3-59ab-40fb-b590-4d28893def35"
HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY
}
TIMEOUT = 30

def test_execute_xrpl_transaction_post_request():
    # Prepare a sample transaction payload (mock data)
    payload = {
        "account": f"rMockAccount{uuid.uuid4().hex[:8]}",
        "amount": "1000000",
        "recipient": f"rRecipient{uuid.uuid4().hex[:8]}",
        "transactionType": "Payment",
        "network": "Testnet"
    }

    try:
        response = requests.post(
            f"{BASE_URL}/api/execute-transaction",
            headers=HEADERS,
            json=payload,
            timeout=TIMEOUT
        )
        assert response.status_code == 200, f"Unexpected status code: {response.status_code}"
        
        resp_json = response.json()
        assert isinstance(resp_json, dict), "Response is not a JSON object"
        assert resp_json.get("success") is True, "Transaction success flag is not True"
        assert isinstance(resp_json.get("uuid"), str) and len(resp_json.get("uuid")) > 0, "uuid is missing or empty"
        assert isinstance(resp_json.get("qrCodeUrl"), str) and resp_json.get("qrCodeUrl").startswith("http"), "qrCodeUrl is missing or invalid"
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"
    except AssertionError:
        raise


test_execute_xrpl_transaction_post_request()