const {chromium} = require('C:/Users/carlm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const {pathToFileURL} = require('node:url');

async function main() {
  const frameDir = path.join(__dirname, process.env.ROYALS_FRAME_DIR ?? 'royals-frames');
  await fs.mkdir(frameDir, {recursive: true});
  const player = path.join(__dirname, 'royals-player.html');
  const videoPath = process.env.ROYALS_VIDEO_PATH ?? './royals-source.mp4';
  await fs.writeFile(player, `<video src="${videoPath}" muted preload="auto"></video>`);
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--allow-file-access-from-files']
  });
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(player).href);
    await page.waitForFunction(() => document.querySelector('video').readyState >= 2);
    const metadata = await page.locator('video').evaluate(video => ({
      duration: video.duration,
      width: video.videoWidth,
      height: video.videoHeight
    }));
    console.log(metadata);

    const requested = process.argv.slice(2).map(Number);
    const timestamps = requested.length
      ? requested
      : Array.from({length: Math.ceil(metadata.duration / 7)}, (_, index) => index * 7);
    for (const seconds of timestamps) {
      const jpeg = await page.locator('video').evaluate(async (video, seconds) => {
        if (seconds !== video.currentTime) {
          const seeked = new Promise(resolve => video.addEventListener('seeked', resolve, {once: true}));
          video.currentTime = seconds;
          await seeked;
        }
        const frame = document.createElement('canvas');
        frame.width = video.videoWidth;
        frame.height = video.videoHeight;
        frame.getContext('2d').drawImage(video, 0, 0);
        return frame.toDataURL('image/jpeg', .94).split(',')[1];
      }, seconds);
      await fs.writeFile(path.join(frameDir, `frame-${String(seconds).padStart(3, '0')}.jpg`), Buffer.from(jpeg, 'base64'));
    }
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
