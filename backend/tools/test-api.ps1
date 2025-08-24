<#
  COMPREHENSIVE E-COMMERCE API TESTING (PowerShell)
  -------------------------------------------------
  Requirements:
  - PowerShell 5.1+ or PowerShell 7+
  - API running locally at http://localhost:8000/api/v1 (change $BaseUrl if needed)
#>

param(
  [string]$BaseUrl = "http://localhost:8000/api/v1"
)

# ---- Helpers ---------------------------------------------------------------

function Write-Section($text) {
  Write-Host ""
  Write-Host $text -ForegroundColor Cyan
}

function Write-Info($text) {
  Write-Host $text -ForegroundColor Gray
}

function Show-Json($obj) {
  if ($null -ne $obj) { $obj | ConvertTo-Json -Depth 20 }
}

function Invoke-Api {
  param(
    [Parameter(Mandatory=$true)][string]$Uri,
    [ValidateSet('GET','POST','PUT','PATCH','DELETE')][string]$Method = 'GET',
    [hashtable]$Headers,
    $Body
  )
  try {
    $args = @{
      Uri     = $Uri
      Method  = $Method
    }
    if ($Headers)     { $args.Headers     = $Headers }
    if ($null -ne $Body) {
      if ($Body -is [string]) { $args.Body = $Body } else { $args.Body = ($Body | ConvertTo-Json -Depth 20) }
      $args.ContentType = 'application/json'
    }
    return Invoke-RestMethod @args
  } catch {
    Write-Host "❌ HTTP error: $($_.Exception.Message)" -ForegroundColor Red
    # Try to print server response body if available
    $resp = $_.Exception.Response
    if ($resp -and $resp.GetResponseStream) {
      try {
        $reader = New-Object IO.StreamReader($resp.GetResponseStream())
        $text = $reader.ReadToEnd()
        if ($text) { Write-Host $text }
      } catch {}
    }
    return $null
  }
}

# ----------------------------------------------------------------------------

Write-Host "🚀 Starting comprehensive API testing..." -ForegroundColor Green

# 1. BASIC HEALTH CHECKS
Write-Section "📊 1. Testing basic endpoints..."

Write-Info "Testing API status..."
$r = Invoke-Api -Uri "$BaseUrl/status"
Show-Json $r

Write-Info "Testing health check..."
$r = Invoke-Api -Uri "$BaseUrl/health"
Show-Json $r

# 2. AUTHENTICATION FLOW
Write-Section "🔐 2. Testing authentication..."

Write-Info "Testing user registration..."
$registerBody = @{
  name                  = "Test User"
  email                 = "test@example.com"
  password              = "password123"
  password_confirmation = "password123"
  phone                 = "08123456789"
}
$registerResponse = Invoke-Api -Method POST -Uri "$BaseUrl/auth/register" -Body $registerBody
Show-Json $registerResponse

$Token = $registerResponse.access_token
Write-Info ("Token: {0}" -f ($Token ?? "<null>"))

# Fallback: if registration failed (e.g., email already taken), try login for the same user
if (-not $Token) {
  Write-Info "Registration didn't return a token. Trying login for test@example.com..."
  $loginTest = Invoke-Api -Method POST -Uri "$BaseUrl/auth/login" -Body @{ email="test@example.com"; password="password123" }
  $Token = $loginTest.access_token
  Write-Info ("Token (login): {0}" -f ($Token ?? "<null>"))
}

Write-Info "Testing login with seeded admin..."
$loginAdmin = Invoke-Api -Method POST -Uri "$BaseUrl/auth/login" -Body @{ email="admin@toko.com"; password="password" }
$AdminToken = $loginAdmin.access_token
Write-Info ("Admin Token: {0}" -f ($AdminToken ?? "<null>"))

Write-Info "Testing get profile..."
if ($Token) {
  $me = Invoke-Api -Uri "$BaseUrl/auth/me" -Headers @{ Authorization = "Bearer $Token" }
  Show-Json $me
} else {
  Write-Host "⚠️  Skipped /auth/me because no user token." -ForegroundColor Yellow
}

# 3. PRODUCT CATALOG
Write-Section "🛍️ 3. Testing product catalog..."

Write-Info "Testing get all products..."
$allProducts = Invoke-Api -Uri "$BaseUrl/products"
Write-Host ("Count: {0}" -f ($allProducts.data.Count)) -ForegroundColor Magenta

Write-Info "Testing featured products..."
$featured = Invoke-Api -Uri "$BaseUrl/products/featured"
Show-Json $featured

Write-Info "Testing product search (q=kaos)..."
$search = Invoke-Api -Uri "$BaseUrl/products/search?q=kaos"
Show-Json $search

Write-Info "Testing get product by slug..."
$slugDetail = Invoke-Api -Uri "$BaseUrl/products/kaos-oversize-cotton-combed"
if ($slugDetail -and $slugDetail.data) {
  Write-Host ("Name: {0}" -f $slugDetail.data.name) -ForegroundColor Magenta
} else {
  Show-Json $slugDetail
}

Write-Info "Testing product variants..."
$variants = Invoke-Api -Uri "$BaseUrl/products/kaos-oversize-cotton-combed/variants"
Show-Json $variants

# 4. CATEGORIES
Write-Section "📂 4. Testing categories..."

Write-Info "Testing get categories..."
$cats = Invoke-Api -Uri "$BaseUrl/categories"
Write-Host ("Count: {0}" -f ($cats.data.Count)) -ForegroundColor Magenta

Write-Info "Testing category products (fashion)..."
$catProducts = Invoke-Api -Uri "$BaseUrl/categories/fashion/products"
Write-Host ("Count: {0}" -f ($catProducts.data.Count)) -ForegroundColor Magenta

# 5. CART FUNCTIONALITY
Write-Section "🛒 5. Testing cart functionality..."

if ($Token) {
  $authHeader = @{ Authorization = "Bearer $Token" }

  Write-Info "Testing get cart..."
  $cart0 = Invoke-Api -Uri "$BaseUrl/cart" -Headers $authHeader
  Show-Json $cart0

  Write-Info "Testing add item to cart..."
  $addCart = Invoke-Api -Method POST -Uri "$BaseUrl/cart/items" -Headers $authHeader -Body @{
    product_id          = 1
    product_variant_id  = 1
    quantity            = 2
  }
  Show-Json $addCart

  Write-Info "Testing get cart after adding..."
  $cart1 = Invoke-Api -Uri "$BaseUrl/cart" -Headers $authHeader
  if ($cart1 -and $cart1.data) {
    Write-Host ("Total Quantity: {0}" -f $cart1.data.total_quantity) -ForegroundColor Magenta
  } else {
    Show-Json $cart1
  }

  Write-Info "Testing cart summary..."
  $cartSummary = Invoke-Api -Uri "$BaseUrl/cart/summary" -Headers $authHeader
  Show-Json $cartSummary
} else {
  Write-Host "⚠️  Skipped cart tests because no user token." -ForegroundColor Yellow
}

# 6. GUEST CART
Write-Section "👤 6. Testing guest cart..."

$SessionId = "test-session-$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"

Write-Info "Testing guest cart add..."
$guestAdd = Invoke-Api -Method POST -Uri "$BaseUrl/guest/cart/items" -Headers @{ "X-Session-ID" = $SessionId } -Body @{
  product_id = 3
  quantity   = 1
}
Show-Json $guestAdd

Write-Info "Testing get guest cart..."
$guestCart = Invoke-Api -Uri "$BaseUrl/guest/cart" -Headers @{ "X-Session-ID" = $SessionId }
Show-Json $guestCart

# 7. USER ADDRESSES
Write-Section "📍 7. Testing user addresses..."

if ($Token) {
  $authHeader = @{ Authorization = "Bearer $Token" }

  Write-Info "Testing get addresses..."
  $addresses = Invoke-Api -Uri "$BaseUrl/addresses" -Headers $authHeader
  Show-Json $addresses

  Write-Info "Testing add address..."
  $addrAdd = Invoke-Api -Method POST -Uri "$BaseUrl/addresses" -Headers $authHeader -Body @{
    label         = "kantor"
    name          = "Test User"
    phone         = "08123456789"
    address       = "Jl. Test No. 123"
    province      = "DKI Jakarta"
    city          = "Jakarta Selatan"
    subdistrict   = "Kebayoran Baru"
    postal_code   = "12180"
    province_id   = 6
    city_id       = 151
  }
  Show-Json $addrAdd
} else {
  Write-Host "⚠️  Skipped address tests because no user token." -ForegroundColor Yellow
}

# 8. SHIPPING CALCULATOR
Write-Section "🚚 8. Testing shipping calculator..."

Write-Info "Testing get provinces..."
$provinces = Invoke-Api -Uri "$BaseUrl/shipping/provinces"
if ($provinces) { Write-Host ("Count: {0}" -f $provinces.Count) -ForegroundColor Magenta } else { Show-Json $provinces }

Write-Info "Testing get cities (province_id=6)..."
$cities = Invoke-Api -Uri "$BaseUrl/shipping/cities?province_id=6"
if ($cities) { Write-Host ("Count: {0}" -f $cities.Count) -ForegroundColor Magenta } else { Show-Json $cities }

Write-Info "Testing shipping cost calculation..."
$shipCost = Invoke-Api -Method POST -Uri "$BaseUrl/shipping/cost" -Body @{
  destination_city_id = 151
  weight              = 1000
  courier             = "jne"
}
Show-Json $shipCost

# 9. VOUCHERS
Write-Section "🎫 9. Testing vouchers..."

if ($Token) {
  $authHeader = @{ Authorization = "Bearer $Token" }

  Write-Info "Testing available vouchers..."
  $vouchers = Invoke-Api -Uri "$BaseUrl/vouchers/available" -Headers $authHeader
  Show-Json $vouchers
} else {
  Write-Host "⚠️  Skipped /vouchers/available because no user token." -ForegroundColor Yellow
}

Write-Info "Testing voucher validation..."
$voucherValidate = Invoke-Api -Method POST -Uri "$BaseUrl/vouchers/validate" -Body @{
  code         = "WELCOME10"
  cart_total   = 200000
  shipping_cost= 15000
}
Show-Json $voucherValidate

# 10. WISHLIST
Write-Section "❤️ 10. Testing wishlist..."

if ($Token) {
  $authHeader = @{ Authorization = "Bearer $Token" }

  Write-Info "Testing get wishlist..."
  $wishlist = Invoke-Api -Uri "$BaseUrl/wishlist" -Headers $authHeader
  Show-Json $wishlist

  Write-Info "Testing add to wishlist..."
  $wishAdd = Invoke-Api -Method POST -Uri "$BaseUrl/wishlist" -Headers $authHeader -Body @{ product_id = 2 }
  Show-Json $wishAdd
} else {
  Write-Host "⚠️  Skipped wishlist tests because no user token." -ForegroundColor Yellow
}

# 11. CHECKOUT VALIDATION
Write-Section "💳 11. Testing checkout validation..."

if ($Token) {
  $authHeader = @{ Authorization = "Bearer $Token" }
  $checkoutValidate = Invoke-Api -Method POST -Uri "$BaseUrl/checkout/validate" -Headers $authHeader -Body @{
    address_id   = 1
    courier      = "jne"
    service      = "REG"
    voucher_code = "WELCOME10"
  }
  Show-Json $checkoutValidate
} else {
  Write-Host "⚠️  Skipped checkout validation because no user token." -ForegroundColor Yellow
}

# 12. ORDERS
Write-Section "📋 12. Testing orders..."

if ($Token) {
  $authHeader = @{ Authorization = "Bearer $Token" }
  $orders = Invoke-Api -Uri "$BaseUrl/orders" -Headers $authHeader
  Show-Json $orders
} else {
  Write-Host "⚠️  Skipped /orders because no user token." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Testing completed! Check results above." -ForegroundColor Green
