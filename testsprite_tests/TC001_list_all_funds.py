import requests

def test_list_all_funds():
    base_url = "http://localhost:5002"
    endpoint = "/funds"
    url = base_url + endpoint
    headers = {
        "Content-Type": "application/json",
        "Authorization": "ApiKey b53edeaf-0046-49a6-a100-4bb284be3682:d4f38ef3-59ab-40fb-b590-4d28893def35"
    }
    timeout = 30

    try:
        response = requests.get(url, headers=headers, timeout=timeout)
        assert response.status_code == 200, f"Expected status code 200 but got {response.status_code}"
        funds = response.json()

        assert isinstance(funds, list), f"Expected response body to be a list but got {type(funds).__name__}"

        required_props = {"id", "name", "symbol", "fundType", "status", "aum", "nav"}

        for fund in funds:
            assert isinstance(fund, dict), f"Each fund should be a dict but found {type(fund).__name__}"
            fund_keys = set(fund.keys())
            missing_props = required_props - fund_keys
            assert not missing_props, f"Missing properties in fund: {missing_props}"
            # Validate types for each property
            assert isinstance(fund["id"], str), "Property 'id' should be a string"
            assert isinstance(fund["name"], str), "Property 'name' should be a string"
            assert isinstance(fund["symbol"], str), "Property 'symbol' should be a string"
            assert isinstance(fund["fundType"], str), "Property 'fundType' should be a string"
            assert isinstance(fund["status"], str), "Property 'status' should be a string"
            assert isinstance(fund["aum"], (int, float)), "Property 'aum' should be a number"
            assert isinstance(fund["nav"], (int, float)), "Property 'nav' should be a number"

    except requests.exceptions.RequestException as e:
        assert False, f"Request failed: {e}"

test_list_all_funds()
