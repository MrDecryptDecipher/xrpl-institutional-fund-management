import requests

BASE_URL = "http://localhost:5002"
API_KEY = "d4f38ef3-59ab-40fb-b590-4d28893def35"
HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY
}
TIMEOUT = 30

def test_run_compliance_check():
    url = f"{BASE_URL}/compliance/check"
    # Example valid payload for a compliance check, based on typical compliance input schema
    # Since the schema is not explicitly provided, this is a reasonable representative payload
    payload = {
        "transaction": {
            "source": "rExampleSourceAddress",
            "destination": "rExampleDestinationAddress",
            "amount": "1000000",               # amount in drops or smallest unit
            "currency": "XRP",
            "txType": "Payment",
            "metadata": {
                "jurisdiction": "MAS",
                "investorCredential": "cred-example-12345",
                "fundId": "fund-example-67890",
                "timestamp": "2025-10-04T12:00:00Z"
            }
        },
        "context": {
            "wallet": "Xaman Wallet 1.0",
            "xrplNetwork": "Testnet",
            "fundOperation": "transfer"
        }
    }

    try:
        response = requests.post(url, headers=HEADERS, json=payload, timeout=TIMEOUT)
    except requests.exceptions.RequestException as e:
        assert False, f"Request to {url} failed: {e}"

    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    try:
        compliance_result = response.json()
    except ValueError:
        assert False, "Response is not a valid JSON"

    # Validate expected keys and types in compliance result
    # Typical compliance results might include: status, issues found, detailed report
    assert "status" in compliance_result, "Compliance result missing 'status' field"
    assert compliance_result["status"] in ("pass", "fail", "partial"), "Unexpected compliance status value"

    # If fail or partial, expect an issues list
    if compliance_result["status"] in ("fail", "partial"):
        assert "issues" in compliance_result, "Compliance result missing 'issues' field on failure/partial"
        assert isinstance(compliance_result["issues"], list), "'issues' field should be a list"
    else:
        # On pass, issues may be absent or empty
        if "issues" in compliance_result:
            assert isinstance(compliance_result["issues"], list), "'issues' field should be a list if present"

    # Example check for immutable on-chain evidence reference if provided
    if "ledgerEvidence" in compliance_result:
        ledger_evidence = compliance_result["ledgerEvidence"]
        assert isinstance(ledger_evidence, dict), "'ledgerEvidence' should be a dict"
        assert "transactionHash" in ledger_evidence, "'ledgerEvidence' missing 'transactionHash'"
        assert isinstance(ledger_evidence["transactionHash"], str), "'transactionHash' should be a string"

    # Compliance report or summary should contain key metrics if present
    if "report" in compliance_result:
        report = compliance_result["report"]
        assert isinstance(report, dict), "'report' field should be a dict"
        # Example keys
        for key in ("checkedJurisdiction", "verificationTimestamp"):
            assert key in report, f"Report missing expected key '{key}'"

test_run_compliance_check()