
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** xrpl_institutional_fund_management_protocol
- **Date:** 2025-10-12
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001
- **Test Name:** list all funds
- **Test Code:** [TC001_list_all_funds.py](./TC001_list_all_funds.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 39, in <module>
  File "<string>", line 18, in test_list_all_funds
AssertionError: Expected response body to be a list but got dict

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/064f1db4-f6cf-4772-8dee-261244d4f4db/4cab6015-a68f-4cc2-aff2-45fac9ee099e
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002
- **Test Name:** create a new fund
- **Test Code:** [TC002_create_a_new_fund.py](./TC002_create_a_new_fund.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 68, in <module>
  File "<string>", line 34, in test_create_new_fund
AssertionError: Expected 201, got 500

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/064f1db4-f6cf-4772-8dee-261244d4f4db/079096f1-a7f4-47c5-a4bb-0d352db0779b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003
- **Test Name:** submit xrpl transaction
- **Test Code:** [TC003_submit_xrpl_transaction.py](./TC003_submit_xrpl_transaction.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 70, in <module>
  File "<string>", line 35, in test_submit_xrpl_transaction
AssertionError: Unexpected status code: 500, Response: {"success":false,"error":"WebSocket is not defined"}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/064f1db4-f6cf-4772-8dee-261244d4f4db/e636c2f2-8f91-4f49-8278-f6e96e074208
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004
- **Test Name:** get account balance
- **Test Code:** [TC004_get_account_balance.py](./TC004_get_account_balance.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 90, in <module>
  File "<string>", line 37, in test_get_account_balance
AssertionError: Expected 200 OK, got 500

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/064f1db4-f6cf-4772-8dee-261244d4f4db/05882632-15ab-4dc9-b352-208c7657e7bb
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005
- **Test Name:** create xaman payload
- **Test Code:** [TC005_create_xaman_payload.py](./TC005_create_xaman_payload.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 66, in <module>
  File "<string>", line 41, in test_create_xaman_payload
AssertionError: Unexpected status code: 500, Response: {"success":false,"error":"Xaman API credentials not configured"}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/064f1db4-f6cf-4772-8dee-261244d4f4db/15e435c4-f766-45c2-93bf-67e561f655d6
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006
- **Test Name:** verify xaman signature
- **Test Code:** [TC006_verify_xaman_signature.py](./TC006_verify_xaman_signature.py)
- **Test Error:** Traceback (most recent call last):
  File "<string>", line 23, in test_verify_xaman_signature
  File "/var/task/requests/models.py", line 1024, in raise_for_status
    raise HTTPError(http_error_msg, response=self)
requests.exceptions.HTTPError: 500 Server Error: Internal Server Error for url: http://localhost:5002/xaman/verify

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 42, in <module>
  File "<string>", line 25, in test_verify_xaman_signature
AssertionError: Request failed: 500 Server Error: Internal Server Error for url: http://localhost:5002/xaman/verify

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/064f1db4-f6cf-4772-8dee-261244d4f4db/f401b508-634e-4ece-9147-752785e15b53
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007
- **Test Name:** list investors
- **Test Code:** [TC007_list_investors.py](./TC007_list_investors.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 31, in <module>
  File "<string>", line 16, in test_list_investors
AssertionError: Response JSON is not a list of investors

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/064f1db4-f6cf-4772-8dee-261244d4f4db/d87247cf-fce9-4117-ab1f-517974b1c5ca
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008
- **Test Name:** register new investor
- **Test Code:** [TC008_register_new_investor.py](./TC008_register_new_investor.py)
- **Test Error:** Traceback (most recent call last):
  File "<string>", line 42, in test_register_new_investor
AssertionError: Expected status code 201, got 500

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 69, in <module>
  File "<string>", line 57, in test_register_new_investor
AssertionError: Assertion error: Expected status code 201, got 500

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/064f1db4-f6cf-4772-8dee-261244d4f4db/7ebe98ac-c647-4ad0-b6e1-a205bcd7e993
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009
- **Test Name:** run compliance check
- **Test Code:** [TC009_run_compliance_check.py](./TC009_run_compliance_check.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 77, in <module>
  File "<string>", line 41, in test_run_compliance_check
AssertionError: Expected status code 200, got 500

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/064f1db4-f6cf-4772-8dee-261244d4f4db/04f1feca-8c42-48f3-942d-597043778753
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010
- **Test Name:** rebalance portfolio
- **Test Code:** [TC010_rebalance_portfolio.py](./TC010_rebalance_portfolio.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 135, in <module>
  File "<string>", line 71, in test_rebalance_portfolio
  File "<string>", line 26, in create_dummy_fund
  File "/var/task/requests/models.py", line 1024, in raise_for_status
    raise HTTPError(http_error_msg, response=self)
requests.exceptions.HTTPError: 500 Server Error: Internal Server Error for url: http://localhost:5002/funds

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/064f1db4-f6cf-4772-8dee-261244d4f4db/5f068f79-4e16-4f8d-9a27-3e30f194ff23
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **0.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---