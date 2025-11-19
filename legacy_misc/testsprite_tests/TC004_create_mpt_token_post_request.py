import requests
import uuid

BASE_URL = "http://localhost:5002"
API_KEY = "b53edeaf-0046-49a6-a100-4bb284be3682"
API_VALUE = "d4f38ef3-59ab-40fb-b590-4d28893def35"
HEADERS = {
    "Content-Type": "application/json",
    "key": API_KEY,
    "value": API_VALUE
}

def test_create_mpt_token_post_request():
    # Sample payload based on the API schema for creating MPT token
    payload = {
        "issuerSeed": "s████████████████████████████",  # A placeholder seed; in real test replace with valid seed
        "metadata": {
            "name": f"TestToken-{uuid.uuid4()}",
            "symbol": "TTKN",
            "description": "Test Multi-Purpose Token",
            "decimals": 6,
            "totalSupply": "1000000000",
            "uri": "https://example.com/token-metadata.json"
        },
        "transferFee": 10,
        "flags": 0
    }

    response = None
    try:
        response = requests.post(
            f"{BASE_URL}/api/create-mpt-token",
            headers=HEADERS,
            json=payload,
            timeout=30
        )
        response.raise_for_status()
        data = response.json()

        # Validate success status
        assert isinstance(data.get("success"), bool), "Missing or invalid 'success' in response"
        assert data["success"] is True, "MPT token creation was not successful"

        # Validate mptId
        mpt_id = data.get("mptId")
        assert isinstance(mpt_id, str) and mpt_id, "Missing or invalid 'mptId' in response"

        # Validate txHash
        tx_hash = data.get("txHash")
        assert isinstance(tx_hash, str) and tx_hash, "Missing or invalid 'txHash' in response"

    except requests.RequestException as e:
        assert False, f"HTTP request failed: {e}"
    except AssertionError as e:
        assert False, f"Assertion failed: {e}"

test_create_mpt_token_post_request()