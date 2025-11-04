import requests
import uuid
import time

BASE_URL = "http://localhost:5002"
API_KEY = "d4f38ef3-59ab-40fb-b590-4d28893def35"
HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY
}
TIMEOUT = 30


def create_dummy_fund():
    url = f"{BASE_URL}/funds"
    fund_name = f"TestFund-{uuid.uuid4()}"
    data = {
        "name": fund_name,
        "symbol": f"SYM{str(uuid.uuid4())[:4].upper()}",
        "fundType": "institutional",
        "status": "active",
        "aum": 1000000,
        "nav": 1.0
    }
    response = requests.post(url, json=data, headers=HEADERS, timeout=TIMEOUT)
    response.raise_for_status()
    if response.status_code != 201:
        raise Exception(f"Fund creation failed with status {response.status_code}")
    # Some APIs return created resource in body; try to get id either from body or Location header
    fund_id = None
    try:
        fund_json = response.json()
        fund_id = fund_json.get("id")
    except Exception:
        pass
    if not fund_id:
        location = response.headers.get("Location")
        if location:
            fund_id = location.rstrip('/').split('/')[-1]
    if not fund_id:
        raise Exception("Failed to obtain fund ID after creation")
    return fund_id


def delete_dummy_fund(fund_id):
    url = f"{BASE_URL}/funds/{fund_id}"
    try:
        requests.delete(url, headers=HEADERS, timeout=TIMEOUT)
    except Exception:
        pass  # Best effort cleanup


def get_portfolio(fund_id):
    url = f"{BASE_URL}/portfolio/{fund_id}"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        if resp.status_code == 200:
            return resp.json()
    except Exception:
        pass
    return None


def test_rebalance_portfolio():
    """
    Test the POST /portfolio/rebalance endpoint to rebalance a portfolio with valid request data and verify the portfolio is updated accordingly.
    Covers authentication, data validation, XRPL interactions implied.
    """

    # Step 1: Prepare a fund for portfolio rebalance - create a new fund resource
    fund_id = create_dummy_fund()

    try:
        # Step 2: Prepare rebalance request payload
        # Since no exact schema is provided, assume the payload includes fundId & target allocations
        # For realism, querying current portfolio to build target allocations could be done if API supported
        # Construct a sample rebalance request with dummy data
        rebalance_url = f"{BASE_URL}/portfolio/rebalance"
        # Sample payload structure - this is guessed based on portfolio management and rebalance functionality
        payload = {
            "fundId": fund_id,
            "targetAllocations": [
                {"asset": "XRP", "percentage": 50.0},
                {"asset": "MPT1", "percentage": 30.0},
                {"asset": "MPT2", "percentage": 20.0}
            ],
            "timestamp": int(time.time())
        }

        response = requests.post(rebalance_url, json=payload, headers=HEADERS, timeout=TIMEOUT)

        # Validate HTTP status
        assert response.status_code == 200, f"Expected status 200 but got {response.status_code}"

        rebalance_result = response.json()
        # Validate response includes confirmation of rebalance success or updated portfolio
        assert isinstance(rebalance_result, dict), "Response is not a JSON object"
        assert rebalance_result.get("fundId") == fund_id, "Response fundId mismatch"
        assert rebalance_result.get("status") == "success", "Rebalance status not success"

        # Optional: Validate updated portfolio matches target allocations
        updated_portfolio_resp = requests.get(f"{BASE_URL}/portfolio/{fund_id}", headers=HEADERS, timeout=TIMEOUT)
        assert updated_portfolio_resp.status_code == 200, f"Failed to fetch updated portfolio, status {updated_portfolio_resp.status_code}"
        updated_portfolio = updated_portfolio_resp.json()
        # Validate keys and allocation roughly match the rebalance request
        # E.g. check assets and their allocation percentages exist and sum approximately to 100%
        allocations = updated_portfolio.get("allocations")
        assert allocations is not None, "Updated portfolio missing allocations"

        total_percentage = 0.0
        asset_percent_map = {}
        for alloc in allocations:
            asset = alloc.get("asset")
            pct = alloc.get("percentage")
            assert asset is not None and isinstance(pct, (int, float)), "Allocation missing asset or percentage"
            total_percentage += pct
            asset_percent_map[asset] = pct

        # Check sum close to 100 (allow tiny float precision differences)
        assert abs(total_percentage - 100.0) < 0.01, "Allocations do not sum to 100%"

        # Check at least the requested assets are present and allocation close (±5%) to target
        for tgt in payload["targetAllocations"]:
            asset = tgt["asset"]
            tgt_pct = tgt["percentage"]
            actual_pct = asset_percent_map.get(asset)
            assert actual_pct is not None, f"Asset {asset} missing in updated portfolio"
            assert abs(actual_pct - tgt_pct) <= 5.0, f"Allocation for {asset} differs too much from target ({actual_pct} vs {tgt_pct})"

    finally:
        # Cleanup the created fund resource if supported
        delete_dummy_fund(fund_id)


test_rebalance_portfolio()
