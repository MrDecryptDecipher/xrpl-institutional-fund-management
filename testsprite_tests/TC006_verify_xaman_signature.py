import requests

def test_verify_xaman_signature():
    base_url = "http://localhost:5002"
    url = f"{base_url}/xaman/verify"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": "d4f38ef3-59ab-40fb-b590-4d28893def35"
    }

    # Construct a valid payload for Xaman signature verification.
    # As the exact schema details for XamanVerification are not provided explicitly,
    # this is a representative example with typical fields commonly needed for signature verification.
    payload = {
        "address": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
        "message": "test message for signature verification",
        "signature": "3045022100dff9c9730fa8b16bda84c16cf8a1fef4e71302de9f0cc7a1abe4a8f1f9f2aa0b0220540ab3dc9a521db39aa7ffc21cecc860859e71a62ebda7b8d7e7c0d9e80558f3",
        "signing_method": "ed25519"
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        assert False, f"Request failed: {e}"

    # Validate response structure and content
    try:
        resp_json = response.json()
    except ValueError:
        assert False, "Response is not a valid JSON"

    # Expected fields in response: success indicator and verification result
    assert "verified" in resp_json, "Response missing 'verified' field"
    assert isinstance(resp_json["verified"], bool), "'verified' field should be boolean"
    assert resp_json["verified"] is True, "Signature verification failed when it should succeed"

    # Optionally verify presence of additional response info if available
    # e.g. resp_json.get("message") or resp_json.get("address")
    assert resp_json.get("address") == payload["address"], "Response address does not match request address"

test_verify_xaman_signature()