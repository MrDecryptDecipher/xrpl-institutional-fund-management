import requests

BASE_URL = "http://localhost:5002"
API_KEY = "d4f38ef3-59ab-40fb-b590-4d28893def35"
API_KEY_NAME = "b53edeaf-0046-49a6-a100-4bb284be3682"
TIMEOUT = 30

def test_get_account_balance():
    # Since the test case requires querying balance for a given account,
    # we need a valid XRPL account to test with.
    # As no account is provided, we assume an environment variable or a hardcoded test account.
    # For comprehensive testing, this account should be authorized and have known balance on the test network.
    # Here, we use a placeholder account implemented as a string.

    # Placeholder test account for demonstration purposes
    test_account = "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"

    headers = {
        API_KEY_NAME: API_KEY,
        "Accept": "application/json"
    }

    params = {
        "account": test_account
    }

    try:
        response = requests.get(
            f"{BASE_URL}/xrpl/balance",
            headers=headers,
            params=params,
            timeout=TIMEOUT
        )
    except requests.RequestException as e:
        assert False, f"Request to /xrpl/balance failed: {e}"

    assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}"
    try:
        json_data = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    # Validate response JSON structure and values
    # At a minimum, the balance should be present and be a non-negative number.
    # The exact format is not detailed in the PRD, so test for typical XRPL balance response:
    # For example, JSON might be { "balance": "123456789" } or { "balance": 123456789 }

    assert "balance" in json_data, "Response JSON does not contain 'balance' field"
    balance = json_data["balance"]
    # Accept balance as string representing a number or an int
    if isinstance(balance, str):
        try:
            balance_num = int(balance)
        except ValueError:
            assert False, "'balance' field is not a valid integer string"
    elif isinstance(balance, int):
        balance_num = balance
    else:
        assert False, "'balance' field is neither string nor integer"

    assert balance_num >= 0, "Account balance should be non-negative"

    # Additional robustness: try querying with an invalid account to test error handling
    invalid_params = {
        "account": "InvalidAccount123"
    }
    try:
        error_response = requests.get(
            f"{BASE_URL}/xrpl/balance",
            headers=headers,
            params=invalid_params,
            timeout=TIMEOUT
        )
    except requests.RequestException as e:
        assert False, f"Request to /xrpl/balance with invalid account failed: {e}"

    # We expect a 4xx error code (likely 400 or 404)
    assert error_response.status_code >= 400 and error_response.status_code < 500, \
        f"Expected 4xx error for invalid account, got {error_response.status_code}"

    try:
        err_json = error_response.json()
    except ValueError:
        err_json = None

    # Optionally check error message presence
    if err_json and "error" in err_json:
        assert isinstance(err_json["error"], str), "Error message should be a string"

test_get_account_balance()
