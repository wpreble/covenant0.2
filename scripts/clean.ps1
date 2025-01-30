# Function to remove directory with rimraf
function Remove-DirectoryVerbose {
    param (
        [string]$Path
    )
    Write-Host "Attempting to remove: $Path"
    if (Test-Path $Path) {
        Write-Host "Found $Path - removing..."
        rimraf $Path
        if (-not (Test-Path $Path)) {
            Write-Host "Successfully removed $Path"
        } else {
            Write-Host "Warning: Could not fully remove $Path"
        }
    } else {
        Write-Host "$Path does not exist - skipping"
    }
}

# Clean each directory
Remove-DirectoryVerbose "node_modules"
Remove-DirectoryVerbose "dist"
Remove-DirectoryVerbose ".turbo"
Remove-DirectoryVerbose "agent/node_modules"
Remove-DirectoryVerbose "agent/dist"
Remove-DirectoryVerbose "client/node_modules"
Remove-DirectoryVerbose "client/dist"
Remove-DirectoryVerbose "docs/node_modules"
Remove-DirectoryVerbose "docs/dist"

Write-Host "Clean operation completed."