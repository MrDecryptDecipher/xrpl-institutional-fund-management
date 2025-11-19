import requests
import json

BASE_URL = "http://localhost:5002"
API_KEY = "d4f38ef3-59ab-40fb-b590-4d28893def35"
API_KEY_NAME = "b53edeaf-0046-49a6-a100-4bb284be3682"
TIMEOUT = 30

def test_create_xaman_payload():
    url = f"{BASE_URL}/xaman/payload"
    headers = {
        "Content-Type": "application/json",
        API_KEY_NAME: API_KEY
    }

    # Example payload based on typical xaman payload creation needs.
    # The schema was not provided explicitly, so we'll simulate a valid xaman payload request.
    # Usually includes transaction details, signing instructions, wallet info etc.
    payload = {
        "transaction": {
            "Account": "rExampleAccountAddressXYZ",
            "TransactionType": "Payment",
            "Amount": "1000000",
            "Destination": "rDestinationAccountXYZ",
            "Fee": "12",
            "Sequence": 1
        },
        "wallet": {
            "id": "xaman-wallet-123",
            "type": "Xaman"
        },
        "metadata": {
            "purpose": "Test transaction for Xaman payload creation",
            "timestamp": "2025-10-04T12:00:00Z"
        }
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=TIMEOUT)
        # Check HTTP status code 200 (or 201 if applicable)
        assert response.status_code == 200, f"Unexpected status code: {response.status_code}, Response: {response.text}"

        response_json = response.json()
        # Basic checks on the response content structure for payload generation
        assert "payload" in response_json, "Response missing 'payload' key"
        assert isinstance(response_json["payload"], dict), "'payload' should be an object"

        # Check that some expected fields exist in the payload
        payload_fields = ["transaction", "signingRequest", "instructions"]
        for field in payload_fields:
            assert field in response_json["payload"], f"Payload missing expected field '{field}'"

        # Spot check transaction matches input or expected transformed structure
        tx = response_json["payload"].get("transaction")
        assert tx is not None, "Payload transaction field is None"
        assert tx.get("Account") == payload["transaction"]["Account"], "Transaction Account mismatch"
        assert tx.get("TransactionType") == payload["transaction"]["TransactionType"], "TransactionType mismatch"

        # Further validations can be added based on Xaman payload specs and XRPL transaction handling

    except requests.exceptions.RequestException as e:
        assert False, f"Request failed: {e}"
    except json.JSONDecodeError:
        assert False, "Response is not valid JSON"

test_create_xaman_payload()