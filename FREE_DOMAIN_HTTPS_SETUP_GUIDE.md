# Free Domain & HTTPS Setup Guide for XRPL Fund Management
## Research Date: October 17, 2025

---

## 🎯 OBJECTIVE
Set up http://3.111.22.56:5002/ with:
- ✅ Free custom domain (xrplfund.something)
- ✅ HTTPS/SSL certificate (free)
- ✅ Professional appearance
- ✅ Zero cost

---

## 🔍 RESEARCH FINDINGS (October 17, 2025)

### **Available Free DNS Services:**

1. **FreeDNS (afraid.org)** ✅ RECOMMENDED
   - URL: https://freedns.afraid.org
   - Status: Active (5M+ members, 13M+ records)
   - Features:
     - 27,198 shared domains available
     - Free subdomains (e.g., xrplfund.mooo.com, xrplfund.chickenkiller.com)
     - Dynamic DNS support
     - IPv6 support
     - No credit card required
   - Cost: **FREE**

2. **DuckDNS** ✅ RECOMMENDED
   - URL: https://www.duckdns.org
   - Status: Active (hosted on AWS)
   - Features:
     - Free subdomain (e.g., xrplfund.duckdns.org)
     - Dynamic DNS
     - Simple setup
     - Login with Google/GitHub/Twitter
   - Cost: **FREE**

3. **Freenom** ❌ NOT AVAILABLE
   - Status: 502 Server Error (service down)
   - Note: Previously offered free .tk, .ml, .ga, .cf, .gq domains

### **Free SSL/HTTPS Options:**

1. **Cloudflare** ✅ RECOMMENDED
   - URL: https://www.cloudflare.com/plans/free/
   - Status: Active
   - Features:
     - Free SSL certificate (Universal SSL)
     - DDoS protection
     - CDN (Content Delivery Network)
     - Web Application Firewall (WAF)
     - Always Online
     - Analytics
   - Cost: **FREE**

2. **Let's Encrypt** ✅ ALTERNATIVE
   - Free SSL certificates
   - 90-day validity (auto-renewable)
   - Requires Certbot installation

---

## 📋 RECOMMENDED SOLUTION

### **Option 1: DuckDNS + Cloudflare (EASIEST)**

**Domain:** xrplfund.duckdns.org  
**SSL:** Cloudflare Free SSL  
**Setup Time:** 15-20 minutes

**Advantages:**
- ✅ Simplest setup
- ✅ Login with Google (no email verification)
- ✅ Cloudflare provides instant SSL
- ✅ DDoS protection included
- ✅ CDN for faster loading

### **Option 2: FreeDNS + Cloudflare (MORE DOMAIN CHOICES)**

**Domain:** xrplfund.mooo.com (or 27,000+ other options)  
**SSL:** Cloudflare Free SSL  
**Setup Time:** 20-25 minutes

**Advantages:**
- ✅ More domain name choices
- ✅ Professional-looking domains available
- ✅ Same Cloudflare benefits

---

## 🚀 STEP-BY-STEP SETUP GUIDE

### **OPTION 1: DuckDNS + Cloudflare Setup**

#### **Step 1: Get Free Subdomain from DuckDNS**

1. Go to https://www.duckdns.org
2. Click "login with google" (or GitHub/Twitter)
3. Authorize DuckDNS
4. In the "domains" section, enter: **xrplfund**
5. Click "add domain"
6. You now have: **xrplfund.duckdns.org**
7. In the "current ip" field, enter: **3.111.22.56**
8. Click "update ip"
9. Copy your token (you'll need this later)

#### **Step 2: Set Up Cloudflare**

1. Go to https://www.cloudflare.com/plans/free/
2. Click "Sign Up Free"
3. Create account with email
4. Click "Add a Site"
5. Enter: **xrplfund.duckdns.org**
6. Select "Free Plan"
7. Cloudflare will scan DNS records
8. Add an A record:
   - Type: A
   - Name: @
   - IPv4 address: 3.111.22.56
   - Proxy status: Proxied (orange cloud)
   - TTL: Auto
9. Click "Continue"
10. Cloudflare will provide nameservers (but DuckDNS handles this)

#### **Step 3: Configure Nginx Reverse Proxy**

SSH into your server and run:

```bash
# Install Nginx if not already installed
sudo apt update
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/xrplfund
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name xrplfund.duckdns.org;

    location / {
        proxy_pass http://localhost:5002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/xrplfund /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### **Step 4: Install Let's Encrypt SSL (Alternative to Cloudflare)**

If you want SSL directly on your server:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d xrplfund.duckdns.org

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)

# Auto-renewal is set up automatically
# Test renewal:
sudo certbot renew --dry-run
```

#### **Step 5: Update DuckDNS IP (Dynamic DNS)**

Create a cron job to keep IP updated:

```bash
# Create update script
mkdir -p ~/duckdns
cd ~/duckdns
nano duck.sh
```

Add this content (replace YOUR_TOKEN with your DuckDNS token):

```bash
#!/bin/bash
echo url="https://www.duckdns.org/update?domains=xrplfund&token=YOUR_TOKEN&ip=" | curl -k -o ~/duckdns/duck.log -K -
```

Make it executable and add to cron:

```bash
chmod +x duck.sh

# Add to crontab (runs every 5 minutes)
crontab -e

# Add this line:
*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1
```

---

### **OPTION 2: FreeDNS + Cloudflare Setup**

#### **Step 1: Get Free Subdomain from FreeDNS**

1. Go to https://freedns.afraid.org
2. Click "Sign up Free"
3. Fill in registration form
4. Verify email
5. Login to FreeDNS
6. Click "Subdomains" → "Add"
7. Choose from 27,000+ domains:
   - **xrplfund.mooo.com** (recommended)
   - **xrplfund.chickenkiller.com**
   - **xrplfund.zapto.org**
   - **xrplfund.ddns.net**
   - Many more professional options
8. Enter subdomain: **xrplfund**
9. Select domain from dropdown
10. Type: A
11. Destination: 3.111.22.56
12. Click "Save"

#### **Step 2-5: Same as DuckDNS Option**

Follow Steps 2-5 from Option 1, but replace **xrplfund.duckdns.org** with your chosen FreeDNS domain (e.g., **xrplfund.mooo.com**)

---

## 🎨 CLOUDFLARE ADDITIONAL FEATURES (FREE)

Once set up with Cloudflare, you get:

1. **SSL/TLS Encryption**
   - Go to SSL/TLS → Overview
   - Set to "Full" or "Full (strict)"
   - Universal SSL certificate auto-issued

2. **Always Use HTTPS**
   - Go to SSL/TLS → Edge Certificates
   - Enable "Always Use HTTPS"
   - All HTTP requests redirect to HTTPS

3. **Automatic HTTPS Rewrites**
   - Enable to fix mixed content issues

4. **DDoS Protection**
   - Automatic (always on)

5. **Web Application Firewall (WAF)**
   - Go to Security → WAF
   - Enable managed rules

6. **Caching**
   - Go to Caching → Configuration
   - Set caching level

7. **Page Rules** (3 free)
   - Create custom rules for performance

---

## ✅ FINAL RESULT

After setup, you'll have:

- **Domain:** xrplfund.duckdns.org (or xrplfund.mooo.com)
- **HTTPS:** ✅ Enabled with free SSL
- **Security:** ✅ DDoS protection, WAF
- **Performance:** ✅ CDN, caching
- **Cost:** ✅ $0.00 (completely free)
- **Professional:** ✅ Custom domain with HTTPS

---

## 🔧 TESTING

After setup, test your site:

```bash
# Test HTTP (should redirect to HTTPS)
curl -I http://xrplfund.duckdns.org

# Test HTTPS
curl -I https://xrplfund.duckdns.org

# Check SSL certificate
openssl s_client -connect xrplfund.duckdns.org:443 -servername xrplfund.duckdns.org
```

---

## 📊 COMPARISON

| Feature | DuckDNS | FreeDNS |
|---------|---------|---------|
| Setup Time | 5 min | 10 min |
| Domain Choices | 1 (.duckdns.org) | 27,000+ |
| Email Verification | No | Yes |
| Login Options | Google/GitHub/Twitter | Email only |
| Dynamic DNS | Yes | Yes |
| IPv6 Support | Yes | Yes |
| **Recommendation** | **Best for quick setup** | **Best for domain variety** |

---

## 🎯 RECOMMENDED CHOICE

**For XRPL Fund Management Protocol:**

**Use DuckDNS + Cloudflare**

**Domain:** https://xrplfund.duckdns.org

**Why:**
- ✅ Fastest setup (15 minutes)
- ✅ No email verification needed
- ✅ Professional appearance
- ✅ Free SSL from Cloudflare
- ✅ DDoS protection
- ✅ CDN for global performance
- ✅ Perfect for institutional platform

---

## 📝 NEXT STEPS

1. Choose your option (DuckDNS or FreeDNS)
2. Follow the step-by-step guide above
3. Test the domain and HTTPS
4. Update your project documentation with new URL
5. Update any hardcoded URLs in your code

**Total Cost:** $0.00  
**Total Time:** 15-25 minutes  
**Result:** Professional HTTPS domain for your XRPL platform! 🚀

