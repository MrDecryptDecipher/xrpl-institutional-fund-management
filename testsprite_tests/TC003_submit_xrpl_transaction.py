import requests
import json

BASE_URL = "http://localhost:5002"
API_KEY = "d4f38ef3-59ab-40fb-b590-4d28893def35"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"ApiKey {API_KEY}"
}
TIMEOUT = 30

def test_submit_xrpl_transaction():
    url = f"{BASE_URL}/xrpl/transaction"
    
    # Sample valid XRPL transaction payload (minimal and generic for testing)
    # Including essential fields assuming typical XRPL tx json structure.
    # Adjust fields as per real XRPL transaction schema requirements.
    valid_transaction = {
        "TransactionType": "Payment",
        "Account": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
        "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
        "Amount": "1000000",
        "Fee": "10",
        "Sequence": 1,
        "SigningPubKey": "ED5F39F04185B7B474D248B77B034D31B54CF3E6E6FD494A644CFA6AEB79BAD1D4",
        "TxnSignature": "3045022100F3B2B2D4DDA99F0DB0C92E9DE3D3DE417A8223D040865DE3A72CBD71BC7356D902205120E23F84AC7534B3CE1659E3AE005DF27A78B45939B0D30F68368A68E48A9B"
    }

    try:
        response = requests.post(url, headers=HEADERS, json=valid_transaction, timeout=TIMEOUT)
    except requests.RequestException as e:
        assert False, f"RequestException occurred: {e}"

    # Validate response status code
    assert response.status_code == 200 or response.status_code == 201, \
        f"Unexpected status code: {response.status_code}, Response: {response.text}"

    try:
        resp_json = response.json()
    except json.JSONDecodeError:
        assert False, "Response is not a valid JSON."

    # Basic validations for typical XRPL transaction response
    # Expect at least a transaction ID, result success or similar fields
    assert isinstance(resp_json, dict), "Response JSON is not an object"
    assert "tx" in resp_json or "transaction" in resp_json or "hash" in resp_json, \
        "Response JSON missing transaction identifier fields."

    # Check for success indicators in response body if exist
    success_indicators = ["tesSUCCESS", "engine_result", "result", "status"]
    if "engine_result" in resp_json:
        assert resp_json["engine_result"] == "tesSUCCESS", f"Transaction failed with engine_result: {resp_json['engine_result']}"
    elif "result" in resp_json and isinstance(resp_json["result"], dict):
        # Nested success check
        assert resp_json["result"].get("engine_result") == "tesSUCCESS", "Transaction failed in nested result."
    elif "status" in resp_json:
        assert resp_json["status"].lower() in ("success", "ok"), f"Transaction status not successful: {resp_json['status']}"

    # Additional data validation - presence of transaction hash or ledger index can enhance confidence
    if "tx_json" in resp_json and isinstance(resp_json["tx_json"], dict):
        assert "hash" in resp_json["tx_json"] or "TransactionType" in resp_json["tx_json"], \
            "tx_json missing hash or TransactionType."
    elif "hash" in resp_json:
        assert isinstance(resp_json["hash"], str) and len(resp_json["hash"]) > 0, "Hash field invalid."

    # If errors or failure messages are present, fail test
    if "error" in resp_json or "error_message" in resp_json:
        assert False, f"Error in transaction submission: {resp_json.get('error_message', resp_json.get('error'))}"

test_submit_xrpl_transaction()