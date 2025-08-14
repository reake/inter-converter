#!/bin/bash

# Cloudflare Pages build script for Next.js
set -e

echo "🚀 Starting Cloudflare Pages build..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Set environment variables for production
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Build the application
echo "🔨 Building Next.js application..."
npm run build

# Create _headers file for Cloudflare Pages
echo "📝 Creating _headers file..."
cat > .next/_headers << 'EOF'
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/icons/*
  Cache-Control: public, max-age=31536000, immutable

/manifest.json
  Cache-Control: public, max-age=86400

/sitemap.xml
  Cache-Control: public, max-age=3600

/robots.txt
  Cache-Control: public, max-age=3600
EOF

# Create _redirects file for Cloudflare Pages
echo "🔄 Creating _redirects file..."
cat > .next/_redirects << 'EOF'
# Redirect old tool paths
/tools/* /:splat 301

# Handle 404s
/* /404.html 404
EOF

echo "✅ Build completed successfully!"
echo "📁 Output directory: .next"
