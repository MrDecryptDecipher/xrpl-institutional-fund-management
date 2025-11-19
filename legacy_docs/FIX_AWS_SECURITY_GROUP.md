# Fix AWS Security Group - Open Port 80 & 443

## 🔴 PROBLEM
**Error:** `ERR_CONNECTION_TIMED_OUT` when accessing `xrplfund.duckdns.org`

**Cause:** AWS Security Group is blocking incoming traffic on port 80 (HTTP) and 443 (HTTPS)

**Status:**
- ✅ Nginx is running and listening on port 80
- ✅ XRPL app is running on port 5002
- ✅ Nginx config includes `xrplfund.duckdns.org`
- ❌ AWS firewall (Security Group) is blocking external access

---

## ✅ SOLUTION: Open Ports in AWS Security Group

### **Step 1: Login to AWS Console**

1. Go to: https://console.aws.amazon.com/
2. Login with your AWS credentials
3. Select region: **Asia Pacific (Mumbai) ap-south-1** (or your region)

---

### **Step 2: Navigate to EC2 Security Groups**

1. In AWS Console, search for: **EC2**
2. Click on **EC2** service
3. In left sidebar, scroll down to **Network & Security**
4. Click **Security Groups**

---

### **Step 3: Find Your Security Group**

1. Look for the security group attached to instance: **3.111.22.56**
2. You can identify it by:
   - Instance ID
   - Security Group name (usually something like `launch-wizard-1` or custom name)
3. Click on the **Security Group ID**

---

### **Step 4: Add Inbound Rules for HTTP & HTTPS**

1. Click on **Inbound rules** tab
2. Click **Edit inbound rules** button
3. Click **Add rule** (do this twice - once for HTTP, once for HTTPS)

**Rule 1: HTTP (Port 80)**
- Type: `HTTP`
- Protocol: `TCP`
- Port range: `80`
- Source: `0.0.0.0/0` (Anywhere IPv4)
- Description: `HTTP access for xrplfund.duckdns.org`

**Rule 2: HTTPS (Port 443)**
- Type: `HTTPS`
- Protocol: `TCP`
- Port range: `443`
- Source: `0.0.0.0/0` (Anywhere IPv4)
- Description: `HTTPS access for xrplfund.duckdns.org`

4. Click **Save rules**

---

### **Step 5: Verify Rules**

Your inbound rules should now include:

| Type | Protocol | Port Range | Source | Description |
|------|----------|------------|--------|-------------|
| SSH | TCP | 22 | 0.0.0.0/0 | SSH access |
| HTTP | TCP | 80 | 0.0.0.0/0 | HTTP access for xrplfund.duckdns.org |
| HTTPS | TCP | 443 | 0.0.0.0/0 | HTTPS access for xrplfund.duckdns.org |
| Custom TCP | TCP | 5002 | 0.0.0.0/0 | XRPL Fund Management (if exists) |
| Custom TCP | TCP | 6101-6103 | 0.0.0.0/0 | Nwallet (if exists) |
| ... | ... | ... | ... | Other existing rules |

---

## 🧪 TEST AFTER OPENING PORTS

### **Test 1: Check from server**
```bash
# Test local access
curl -I http://localhost

# Test external access (should work after AWS changes)
curl -I http://3.111.22.56
```

### **Test 2: Check from browser**
```
http://3.111.22.56
http://xrplfund.duckdns.org
```

Both should now work! ✅

---

## 📋 CURRENT STATUS

**What's Working:**
- ✅ Nginx installed and running
- ✅ Nginx listening on port 80
- ✅ Nginx config updated with `xrplfund.duckdns.org`
- ✅ XRPL app running on port 5002
- ✅ Local access works (`curl http://localhost`)

**What's Blocked:**
- ❌ External access to port 80 (AWS Security Group)
- ❌ External access to port 443 (AWS Security Group)

**After Opening Ports:**
- ✅ `http://3.111.22.56` will work
- ✅ `http://xrplfund.duckdns.org` will work
- ✅ Ready for Cloudflare SSL setup

---

## 🔐 SECURITY NOTES

**Is it safe to open port 80/443 to 0.0.0.0/0?**

**YES!** This is standard practice:
- Port 80 (HTTP) and 443 (HTTPS) are meant to be publicly accessible
- This is how websites work - they need to be accessible from anywhere
- Nginx provides security through:
  - Rate limiting
  - Security headers (already configured)
  - Reverse proxy (hides your app)
  - DDoS protection (when using Cloudflare)

**Your app (port 5002) is still protected:**
- Port 5002 is NOT exposed directly to internet
- Only Nginx (localhost) can access port 5002
- External users can only access through Nginx on port 80/443

---

## 🚀 NEXT STEPS AFTER OPENING PORTS

### **1. Test HTTP Access**
```bash
# From your local machine
curl -I http://xrplfund.duckdns.org
```

Expected result:
```
HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
...
```

### **2. Set Up Cloudflare SSL**

Once HTTP works, set up HTTPS:

1. Go to: https://www.cloudflare.com/plans/free/
2. Sign up for free account
3. Add site: `xrplfund.duckdns.org`
4. Add DNS A record:
   - Type: `A`
   - Name: `@`
   - IPv4: `3.111.22.56`
   - Proxy: `ON` (orange cloud)
5. SSL/TLS → Overview → Set to `Full`
6. SSL/TLS → Edge Certificates → Enable `Always Use HTTPS`

### **3. Access Your Site**
```
https://xrplfund.duckdns.org
```

---

## 📸 VISUAL GUIDE

### **AWS Security Group - Inbound Rules**

```
┌─────────────────────────────────────────────────────────────┐
│ Inbound rules                                    Edit rules  │
├─────────────────────────────────────────────────────────────┤
│ Type      Protocol  Port Range  Source          Description │
├─────────────────────────────────────────────────────────────┤
│ SSH       TCP       22          0.0.0.0/0       SSH         │
│ HTTP      TCP       80          0.0.0.0/0       HTTP        │ ← ADD THIS
│ HTTPS     TCP       443         0.0.0.0/0       HTTPS       │ ← ADD THIS
│ Custom    TCP       5002        0.0.0.0/0       XRPL        │
└─────────────────────────────────────────────────────────────┘
```

---

## ❓ TROUBLESHOOTING

### **Still getting timeout after opening ports?**

1. **Wait 1-2 minutes** for AWS changes to propagate

2. **Verify security group is attached to instance:**
   ```bash
   # Check instance metadata
   curl http://169.254.169.254/latest/meta-data/security-groups
   ```

3. **Check if port is listening:**
   ```bash
   sudo netstat -tlnp | grep :80
   ```
   Should show: `0.0.0.0:80 ... LISTEN ... nginx`

4. **Test from server:**
   ```bash
   curl -I http://3.111.22.56
   ```

5. **Check Nginx logs:**
   ```bash
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

### **DNS not resolving?**

1. Check DuckDNS dashboard: https://www.duckdns.org
2. Verify IP is set to: `3.111.22.56`
3. Test DNS resolution:
   ```bash
   nslookup xrplfund.duckdns.org
   dig xrplfund.duckdns.org
   ```

---

## 📞 QUICK REFERENCE

**AWS Console:** https://console.aws.amazon.com/ec2/v2/home#SecurityGroups  
**DuckDNS:** https://www.duckdns.org  
**Cloudflare:** https://www.cloudflare.com

**Server IP:** 3.111.22.56  
**Domain:** xrplfund.duckdns.org  
**App Port:** 5002  
**Nginx Port:** 80, 443

---

## ✅ CHECKLIST

- [ ] Login to AWS Console
- [ ] Navigate to EC2 → Security Groups
- [ ] Find security group for 3.111.22.56
- [ ] Add inbound rule: HTTP (port 80)
- [ ] Add inbound rule: HTTPS (port 443)
- [ ] Save rules
- [ ] Wait 1-2 minutes
- [ ] Test: `curl -I http://3.111.22.56`
- [ ] Test: `curl -I http://xrplfund.duckdns.org`
- [ ] Open in browser: http://xrplfund.duckdns.org
- [ ] Set up Cloudflare SSL
- [ ] Access: https://xrplfund.duckdns.org

---

**Once ports are open, your XRPL Fund Management Platform will be accessible worldwide!** 🌍

