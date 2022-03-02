[CmdletBinding()]
param(
	[string] $repository = "springcomp/scratch",
	[string] $specVersion = $null
)

BEGIN {
	$LATEST_SPEC_VERSION = "2016-09-05-9e8d0e3"

	if (-not $specVersion ) {
		$specVersion = $LATEST_SPEC_VERSION
	}

	## download jp.exe from https://github.com/jmespath/jp/releases
	## rename raw file to .exe

	$linux = (($PSVersionTable.Platform -ne "Win32NT") -and ($PSVersionTable.OS.StartsWith("Linux")))
	$jp_release_url = "https://github.com/jmespath/jp/releases/download/0.2.1/jp-windows-amd64"
	if ($linux) { $jp_release_url = "https://github.com/jmespath/jp/releases/download/0.2.1/jp-linux-amd64" }
	$jp_exe = ".\jp.exe" 
	if ($linux) { $jp_exe = "./jp" }

	if (-not (Test-Path -Path $jp_exe)) {
		Invoke-RestMethod `
			-Method Get `
			-Uri $jp_release_url `
			-OutFile $jp_exe | Out-Null
	}

	if ($linux) { iex "chmod +x $($jp_exe)" }

	Function Get-GitHubReleases {
		[CmdletBinding()]
		param(
			[string] $repo
		)

		(
			Invoke-WebRequest `
				-Method GET `
				-Uri "https://api.github.com/repos/$repo/releases" `
				-Header @{
				"User-Agent" = "pwsh-core/7.2";
				"Accept"     = "application/vnd.github.v3+json";
			}
		).Content
	}

	Function Get-ComplianceAssetUrl {
		[CmdletBinding()]
		param(
			[Parameter(Position = 0, ValueFromPipeline = $true)]
			[string] $releases,
			[Parameter(Position = 1, Mandatory = $true)]
			[string] $specVersion
		)

		Write-Verbose "Extracting $specVersion compliance report url."

		$complianceAssetName = "compliance-$($specVersion).json"

		## Repository with a single release will return an object instead of an array
		$expression = "{url:assets[?name == '$($complianceAssetName)']|[0].browser_download_url}"
		if ($releases.StartsWith("[")) {
			$expression = "[].$($expression)[?url != `null`]|[0]"
		}

		Write-Verbose "Applying JMESPath expression: $expression"
		$json = $releases | . $jp_exe $expression | ConvertFrom-JSON
		if ($json) {
			return $json.url
		}
	}
}

PROCESS {

	$url = Get-GitHubReleases -Repo $repository | `
		Get-ComplianceAssetUrl -specVersion $specVersion

	if ($url) {
		$response = Invoke-WebRequest `
			-Method GET `
			-Uri $url

		if ($response.StatusCode -ne 200) {
			Write-Host "Failed to retrieve compliance information for $($repository). Ignoring." -ForegroundColor Yellow
			return;
		}

		$content = $response.Content

		## remove UTF-8 BOM

		$bom = $content | Select-Object -First 3
		if (($bom[0] -eq 0xef) -and ($bom[1] -eq 0xbb) -and ($bom[2] -eq 0xbf)) {
			$content = $content | Select-Object -Skip 3
		}

		## retrieve compliance report in JSON format
		
		$json = [Text.Encoding]::UTF8.GetString($content) | ConvertFrom-JSON

		## output sphinx code

		$compliance = $json.compliance
		$version = $specVersion.Replace("-", "--")
		$version = "$($version)-$($compliance)%25"
		$color = "brightgreen"

		if ($compliance -lt 100) {
			$color = "orange"
		}

		".. image:: https://img.shields.io/badge/$($version)-$($color).svg`r`n`t:target: https://jmespath-unofficial.github.io/jmespath.site/specification.html`r`n"
	}
}