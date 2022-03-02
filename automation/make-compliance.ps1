[CmdletBinding()]
param(
	[Alias("RootFolder")]
	[string] $path = "$($PSScriptRoot)/../documentation/compliance"
)

BEGIN {
	$getCompliance = Join-Path $PSScriptRoot -ChildPath "get-compliance.ps1"

}
PROCESS {
	Get-ChildItem `
		-Path $path `
		-Filter "*.inc" `
		-Recurse | % {

		$fullPath = $_.FullName
		$name_ext = Split-Path -Path $fullPath -Leaf
		$name = [IO.Path]::GetFileNameWithoutExtension($name_ext)

		$folder = Split-Path -Path (Split-Path -Path $fullPath -Parent) -Leaf

		$repository = "$($folder)/$($name)"

		Write-Host "Retrieving compliance report for project $($repository)..." -ForegroundColor DarkGray
		$output = . $getCompliance -Repository $repository 
		if ($output.Length -gt 0)
		{
			Write-Host $output -ForegroundColor DarkYellow
			Set-Content `
				-Path $fullPath `
				-Value $output `
				-Encoding UTF8
		}
	}
}