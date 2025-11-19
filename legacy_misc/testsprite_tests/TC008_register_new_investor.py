import requests
import uuid

BASE_URL = "http://localhost:5002"
API_KEY = "b53edeaf-0046-49a6-a100-4bb284be3682"
API_VALUE = "d4f38ef3-59ab-40fb-b590-4d28893def35"
HEADERS = {
    "Content-Type": "application/json",
    API_KEY: API_VALUE
}
TIMEOUT = 30

def test_register_new_investor():
    url = f"{BASE_URL}/investors"
    # Generate a unique email to avoid conflicts
    unique_suffix = str(uuid.uuid4())
    payload = {
        "firstName": "Test",
        "lastName": "Investor",
        "email": f"test.investor.{unique_suffix}@example.com",
        "phone": "+1234567890",
        "country": "US",
        "address": "123 Blockchain St",
        "identity": {
            "type": "passport",
            "number": "X1234567",
            "issuer": "US",
            "expiryDate": "2030-12-31"
        },
        "kycCompleted": True,
        "accreditedInvestor": True,
        "investmentPreferences": {
            "fundTypes": ["equity", "fixed_income"],
            "maxInvestmentAmount": 1000000
        }
    }

    investor_id = None
    try:
        # Register new investor
        response = requests.post(url, headers=HEADERS, json=payload, timeout=TIMEOUT)
        assert response.status_code == 201, f"Expected status code 201, got {response.status_code}"
        json_response = response.json()
        # Verify that an investor ID or similar identifier is returned
        assert "id" in json_response, "Response does not contain 'id'"
        investor_id = json_response["id"]
        # Additional field validations
        assert json_response.get("email") == payload["email"], "Returned email does not match"
        assert json_response.get("firstName") == payload["firstName"], "Returned firstName does not match"
        assert json_response.get("lastName") == payload["lastName"], "Returned lastName does not match"
        assert json_response.get("kycCompleted") is True, "kycCompleted should be True"
        assert json_response.get("accreditedInvestor") is True, "accreditedInvestor should be True"

    except requests.RequestException as e:
        assert False, f"Request failed: {e}"
    except AssertionError as ae:
        assert False, f"Assertion error: {ae}"
    finally:
        # Cleanup: Attempt to delete the created investor if possible
        if investor_id:
            try:
                delete_url = f"{BASE_URL}/investors/{investor_id}"
                del_response = requests.delete(delete_url, headers=HEADERS, timeout=TIMEOUT)
                # Either 200 OK or 204 No Content expected for deletion success
                assert del_response.status_code in (200, 204), f"Failed to delete investor, status code {del_response.status_code}"
            except Exception:
                pass

test_register_new_investor()