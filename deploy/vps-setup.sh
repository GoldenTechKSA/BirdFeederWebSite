#!/usr/bin/env bash
#
# One-time VPS setup for the Nectar Haven site.
# Run this ONCE on the Hostinger VPS as a sudo-capable user.
# It is idempotent-ish: safe to re-run, but review each step.
#
# Assumes: Ubuntu/Debian + Apache2 already installed and serving
# other VirtualHosts. This only ADDS a new site; it does not touch
# the existing ones.
#
# Usage:
#   1. Copy this file (and nectarhaven.conf) to the VPS.
#   2. Edit the CONFIG values below if your paths/domain differ.
#   3. chmod +x vps-setup.sh && ./vps-setup.sh
#   4. Paste your GitHub Actions SSH PUBLIC key when prompted.

set -euo pipefail

# ---- CONFIG (adjust to match your other sites) -----------------------
SITE_USER="nectarhaven"
DOC_ROOT="/var/www/nectarhaven"
DOMAIN="nectarhavenfeeders.com"
WWW_DOMAIN="www.nectarhavenfeeders.com"
VHOST_CONF="nectarhaven.conf"          # expected next to this script
# ---------------------------------------------------------------------

echo "==> 1. Creating document root: $DOC_ROOT"
sudo mkdir -p "$DOC_ROOT"

echo "==> 2. Creating deploy user: $SITE_USER (no password, key-only login)"
if id "$SITE_USER" >/dev/null 2>&1; then
    echo "    user already exists, skipping"
else
    sudo adduser --disabled-password --gecos "" "$SITE_USER"
fi
sudo usermod -aG www-data "$SITE_USER"

echo "==> 3. Setting ownership: owner=$SITE_USER (CI writes), group=www-data (Apache reads)"
sudo chown -R "$SITE_USER":www-data "$DOC_ROOT"
sudo chmod -R 775 "$DOC_ROOT"

echo "==> 4. Installing GitHub Actions SSH public key for $SITE_USER"
echo "    Paste the PUBLIC key (the contents of nectarhaven_deploy.pub), then press Enter:"
read -r PUBKEY
SSH_DIR="/home/$SITE_USER/.ssh"
sudo mkdir -p "$SSH_DIR"
echo "$PUBKEY" | sudo tee -a "$SSH_DIR/authorized_keys" >/dev/null
sudo chmod 700 "$SSH_DIR"
sudo chmod 600 "$SSH_DIR/authorized_keys"
sudo chown -R "$SITE_USER":"$SITE_USER" "$SSH_DIR"

echo "==> 5. Installing Apache VirtualHost"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
sudo cp "$SCRIPT_DIR/$VHOST_CONF" /etc/apache2/sites-available/"$VHOST_CONF"
sudo a2enmod rewrite
sudo a2ensite "$VHOST_CONF"

echo "==> 6. Testing Apache config (does NOT affect other sites unless it passes)"
sudo apache2ctl configtest
sudo systemctl reload apache2

echo ""
echo "======================================================================"
echo " Base setup done. REMAINING MANUAL STEPS:"
echo "======================================================================"
echo " a) Point DNS A records for $DOMAIN and $WWW_DOMAIN at this VPS's IP."
echo "    Verify with:  dig $DOMAIN +short"
echo ""
echo " b) ONLY AFTER DNS resolves to this server, enable HTTPS:"
echo "      sudo apt install certbot python3-certbot-apache"
echo "      sudo certbot --apache -d $DOMAIN -d $WWW_DOMAIN"
echo "    Certbot adds the :443 block and sets up auto-renewal."
echo ""
echo " c) In GitHub, add repo secrets:"
echo "      VPS_HOST     = this VPS's IP"
echo "      VPS_USER     = $SITE_USER"
echo "      VPS_SSH_KEY  = contents of the PRIVATE key nectarhaven_deploy"
echo "======================================================================"
