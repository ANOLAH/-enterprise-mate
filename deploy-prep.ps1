# Build Enterprise Mate for cPanel static upload (Windows).
# Produces .\dist\ — upload its contents to public_html.
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "npm install..."
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "npm run build..."
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$dist = Join-Path $PSScriptRoot "dist"
Write-Host ""
Write-Host "Build OK. Upload the CONTENTS of:"
Write-Host "  $dist"
Write-Host "to cPanel public_html (or your subdomain folder)."
Write-Host "See DEPLOY-CPANEL.md for details."

if (Test-Path $dist) {
  Invoke-Item $dist
}
