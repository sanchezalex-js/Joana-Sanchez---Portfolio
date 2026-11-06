$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Media.Editing.MediaClip, Windows.Media.Editing, ContentType = WindowsRuntime]
$null = [Windows.Media.Editing.MediaComposition, Windows.Media.Editing, ContentType = WindowsRuntime]
$null = [Windows.Media.Editing.VideoFramePrecision, Windows.Media.Editing, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.IRandomAccessStreamWithContentType, Windows.Storage.Streams, ContentType = WindowsRuntime]
$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethodDefinition -and $_.GetParameters().Count -eq 1 -and $_.GetGenericArguments().Count -eq 1 } | Select-Object -First 1

function Get-AsyncResult($operation, $type) {
    $task = $asTask.MakeGenericMethod($type).Invoke($null, @($operation))
    return $task.GetAwaiter().GetResult()
}

$video = Get-AsyncResult ([Windows.Storage.StorageFile]::GetFileFromPathAsync((Join-Path $PSScriptRoot 'royals-source.mp4'))) ([Windows.Storage.StorageFile])
$clip = Get-AsyncResult ([Windows.Media.Editing.MediaClip]::CreateFromFileAsync($video)) ([Windows.Media.Editing.MediaClip])
$composition = [Windows.Media.Editing.MediaComposition]::new()
$composition.Clips.Add($clip)
$composition.Duration
$frameDir = Join-Path $PSScriptRoot 'royals-frames'
$null = New-Item -ItemType Directory -Path $frameDir -Force
for ($seconds = 0; $seconds -lt $composition.Duration.TotalSeconds; $seconds += 7) {
    $operation = $composition.GetThumbnailAsync([TimeSpan]::FromSeconds($seconds), 0, 0, [Windows.Media.Editing.VideoFramePrecision]::NearestFrame)
    $result = Get-AsyncResult $operation ([Windows.Storage.Streams.IRandomAccessStreamWithContentType])
    $stream = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($result)
    $file = [System.IO.File]::Create((Join-Path $frameDir ('frame-{0:000}.jpg' -f $seconds)))
    try { $stream.CopyTo($file) } finally { $file.Dispose(); $stream.Dispose(); $result.Dispose() }
}
