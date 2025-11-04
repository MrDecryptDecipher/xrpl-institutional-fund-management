#!/bin/bash

# Free Domain & HTTPS Setup Script for XRPL Fund Management
# Date: October 17, 2025
# Purpose: Automate setup of free domain with HTTPS

set -e

echo "=================================================="
echo "XRPL Fund Management - Free Domain & HTTPS Setup"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_PORT=5002
SERVER_IP="3.111.22.56"

echo -e "${BLUE}Choose your free domain option:${NC}"
echo "1. DuckDNS (xrplfund.duckdns.org) - Fastest, no email verification"
echo "2. FreeDNS (xrplfund.mooo.com or others) - More domain choices"
echo ""
read -p "Enter your choice (1 or 2): " DOMAIN_CHOICE

if [ "$DOMAIN_CHOICE" == "1" ]; then
    DOMAIN="xrplfund.duckdns.org"
    echo -e "${GREEN}Selected: DuckDNS${NC}"
    echo ""
    echo -e "${YELLOW}MANUAL STEPS REQUIRED:${NC}"
    echo "1. Go to https://www.duckdns.org"
    echo "2. Login with Google/GitHub/Twitter"
    echo "3. Add domain: xrplfund"
    echo "4. Set IP to: $SERVER_IP"
    echo "5. Copy your DuckDNS token"
    echo ""
    read -p "Have you completed these steps? (y/n): " DUCKDNS_DONE
    
    if [ "$DUCKDNS_DONE" != "y" ]; then
        echo -e "${RED}Please complete DuckDNS setup first, then run this script again.${NC}"
        exit 1
    fi
    
    read -p "Enter your DuckDNS token: " DUCKDNS_TOKEN
    
elif [ "$DOMAIN_CHOICE" == "2" ]; then
    echo -e "${GREEN}Selected: FreeDNS${NC}"
    echo ""
    echo -e "${YELLOW}MANUAL STEPS REQUIRED:${NC}"
    echo "1. Go to https://freedns.afraid.org"
    echo "2. Sign up and verify email"
    echo "3. Add subdomain (e.g., xrplfund.mooo.com)"
    echo "4. Set Type: A, Destination: $SERVER_IP"
    echo ""
    read -p "Enter your full domain (e.g., xrplfund.mooo.com): " DOMAIN
    
    read -p "Have you completed FreeDNS setup? (y/n): " FREEDNS_DONE
    
    if [ "$FREEDNS_DONE" != "y" ]; then
        echo -e "${RED}Please complete FreeDNS setup first, then run this script again.${NC}"
        exit 1
    fi
else
    echo -e "${RED}Invalid choice. Exiting.${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Domain selected: ${GREEN}$DOMAIN${NC}"
echo ""

# Check if Nginx is installed
echo -e "${BLUE}Checking Nginx installation...${NC}"
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Nginx not found. Installing...${NC}"
    sudo apt update
    sudo apt install nginx -y
    echo -e "${GREEN}✓ Nginx installed${NC}"
else
    echo -e "${GREEN}✓ Nginx already installed${NC}"
fi

# Create Nginx configuration
echo ""
echo -e "${BLUE}Creating Nginx configuration...${NC}"

NGINX_CONF="/etc/nginx/sites-available/xrplfund"

sudo tee $NGINX_CONF > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/xrplfund_access.log;
    error_log /var/log/nginx/xrplfund_error.log;

    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        
        # WebSocket support
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        
        # Standard proxy headers
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Cache bypass
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

echo -e "${GREEN}✓ Nginx configuration created${NC}"

# Enable the site
echo ""
echo -e "${BLUE}Enabling site...${NC}"

if [ -L "/etc/nginx/sites-enabled/xrplfund" ]; then
    sudo rm /etc/nginx/sites-enabled/xrplfund
fi

sudo ln -s /etc/nginx/sites-available/xrplfund /etc/nginx/sites-enabled/

# Test Nginx configuration
echo ""
echo -e "${BLUE}Testing Nginx configuration...${NC}"
if sudo nginx -t; then
    echo -e "${GREEN}✓ Nginx configuration is valid${NC}"
else
    echo -e "${RED}✗ Nginx configuration has errors${NC}"
    exit 1
fi

# Restart Nginx
echo ""
echo -e "${BLUE}Restarting Nginx...${NC}"
sudo systemctl restart nginx
echo -e "${GREEN}✓ Nginx restarted${NC}"

# SSL Setup
echo ""
echo -e "${BLUE}Choose SSL option:${NC}"
echo "1. Let's Encrypt (Certbot) - Direct SSL on server"
echo "2. Cloudflare - SSL via Cloudflare proxy (recommended)"
echo "3. Skip SSL for now"
echo ""
read -p "Enter your choice (1, 2, or 3): " SSL_CHOICE

if [ "$SSL_CHOICE" == "1" ]; then
    echo ""
    echo -e "${BLUE}Installing Certbot...${NC}"
    
    if ! command -v certbot &> /dev/null; then
        sudo apt install certbot python3-certbot-nginx -y
        echo -e "${GREEN}✓ Certbot installed${NC}"
    else
        echo -e "${GREEN}✓ Certbot already installed${NC}"
    fi
    
    echo ""
    echo -e "${BLUE}Obtaining SSL certificate...${NC}"
    echo -e "${YELLOW}You will be prompted for:${NC}"
    echo "  - Email address"
    echo "  - Agreement to terms"
    echo "  - Redirect HTTP to HTTPS (choose Yes)"
    echo ""
    
    sudo certbot --nginx -d $DOMAIN
    
    echo ""
    echo -e "${GREEN}✓ SSL certificate installed${NC}"
    echo -e "${BLUE}Auto-renewal is configured${NC}"
    
elif [ "$SSL_CHOICE" == "2" ]; then
    echo ""
    echo -e "${YELLOW}CLOUDFLARE SETUP REQUIRED:${NC}"
    echo ""
    echo "1. Go to https://www.cloudflare.com/plans/free/"
    echo "2. Sign up for free account"
    echo "3. Add site: $DOMAIN"
    echo "4. Select Free plan"
    echo "5. Add A record:"
    echo "   - Type: A"
    echo "   - Name: @"
    echo "   - IPv4: $SERVER_IP"
    echo "   - Proxy: ON (orange cloud)"
    echo "6. Go to SSL/TLS → Overview → Set to 'Full'"
    echo "7. Go to SSL/TLS → Edge Certificates → Enable 'Always Use HTTPS'"
    echo ""
    echo -e "${GREEN}Your site will have HTTPS via Cloudflare!${NC}"
    
elif [ "$SSL_CHOICE" == "3" ]; then
    echo -e "${YELLOW}Skipping SSL setup${NC}"
else
    echo -e "${RED}Invalid choice${NC}"
fi

# DuckDNS Dynamic DNS setup
if [ "$DOMAIN_CHOICE" == "1" ] && [ ! -z "$DUCKDNS_TOKEN" ]; then
    echo ""
    echo -e "${BLUE}Setting up DuckDNS Dynamic DNS...${NC}"
    
    mkdir -p ~/duckdns
    
    cat > ~/duckdns/duck.sh <<EOF
#!/bin/bash
echo url="https://www.duckdns.org/update?domains=xrplfund&token=$DUCKDNS_TOKEN&ip=" | curl -k -o ~/duckdns/duck.log -K -
EOF
    
    chmod +x ~/duckdns/duck.sh
    
    # Add to crontab
    (crontab -l 2>/dev/null | grep -v "duck.sh"; echo "*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1") | crontab -
    
    echo -e "${GREEN}✓ DuckDNS Dynamic DNS configured (updates every 5 minutes)${NC}"
fi

# Final summary
echo ""
echo "=================================================="
echo -e "${GREEN}✓ SETUP COMPLETE!${NC}"
echo "=================================================="
echo ""
echo -e "${BLUE}Your XRPL Fund Management Platform is now accessible at:${NC}"
echo ""

if [ "$SSL_CHOICE" == "1" ]; then
    echo -e "${GREEN}https://$DOMAIN${NC}"
elif [ "$SSL_CHOICE" == "2" ]; then
    echo -e "${YELLOW}http://$DOMAIN${NC} (will be https:// after Cloudflare setup)"
else
    echo -e "${YELLOW}http://$DOMAIN${NC}"
fi

echo ""
echo -e "${BLUE}Next Steps:${NC}"

if [ "$SSL_CHOICE" == "2" ]; then
    echo "1. Complete Cloudflare setup (see instructions above)"
    echo "2. Wait 5-10 minutes for DNS propagation"
    echo "3. Visit https://$DOMAIN"
elif [ "$SSL_CHOICE" == "1" ]; then
    echo "1. Wait 2-5 minutes for DNS propagation"
    echo "2. Visit https://$DOMAIN"
else
    echo "1. Wait 2-5 minutes for DNS propagation"
    echo "2. Visit http://$DOMAIN"
    echo "3. Set up SSL later for HTTPS"
fi

echo ""
echo -e "${BLUE}Testing:${NC}"
echo "  curl -I http://$DOMAIN"

if [ "$SSL_CHOICE" == "1" ]; then
    echo "  curl -I https://$DOMAIN"
fi

echo ""
echo -e "${GREEN}Enjoy your free professional domain with HTTPS! 🚀${NC}"
echo ""

