import requests

BASE_URL = "http://localhost:5002"
API_KEY = "d4f38ef3-59ab-40fb-b590-4d28893def35"
HEADERS = {
    "x-api-key": API_KEY,
    "Accept": "application/json"
}

def test_list_investors():
    url = f"{BASE_URL}/investors"
    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        data = response.json()
        assert isinstance(data, list), "Response JSON is not a list of investors"

        for investor in data:
            assert isinstance(investor, dict), "Investor entry is not an object"
            if "id" in investor:
                assert isinstance(investor["id"], str), "Investor id is not a string"
            if "name" in investor:
                assert isinstance(investor["name"], str), "Investor name is not a string"
            if "kycStatus" in investor:
                assert isinstance(investor["kycStatus"], str), "Investor kycStatus is not a string"
    except requests.exceptions.RequestException as e:
        assert False, f"HTTP request failed: {e}"
    except ValueError:
        assert False, "Response content is not valid JSON"

test_list_investors()
