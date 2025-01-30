# PowerShell script to extract version from lerna.json

# Get the script's directory and construct the path to lerna.json
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$lernaFile = Join-Path (Split-Path -Parent $scriptPath) "lerna.json"

# Check if lerna.json exists
if (-not (Test-Path $lernaFile)) {
    Write-Error "Error: $lernaFile does not exist."
    exit 1
}

# Read and parse lerna.json
$lernaContent = Get-Content $lernaFile -Raw | ConvertFrom-Json

# Extract version
$version = $lernaContent.version

# Check if version was successfully extracted
if (-not $version) {
    Write-Error "Error: Unable to extract version from $lernaFile."
    exit 1
}

# Create the info.json content
$infoContent = @{
    version = $version
} | ConvertTo-Json

# Create the lib directory if it doesn't exist
$srcPath = Join-Path $scriptPath "src"
$libPath = Join-Path $srcPath "lib"
New-Item -ItemType Directory -Path $libPath -Force | Out-Null

# Create or overwrite info.json
$infoFile = Join-Path $libPath "info.json"
$infoContent | Set-Content $infoFile -Force

Write-Host "info.json created with version: $version"