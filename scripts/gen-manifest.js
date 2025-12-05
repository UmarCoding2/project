const fs = require('fs');
const path = require('path');

// Usage: node scripts/gen-manifest.js
// Scans the songs1 folder, writes per-folder manifest.json and a top-level songs1/manifest.json

const songsDir = path.join(__dirname, '..', 'songs1');

function isAudioFile(name) {
  return /\.(mp3|wav|ogg)$/i.test(name);
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Wrote', filePath, data.length, 'entries');
}

function scan() {
  if (!fs.existsSync(songsDir)) {
    console.error('songs1 directory not found:', songsDir);
    process.exit(1);
  }

  const entries = fs.readdirSync(songsDir, { withFileTypes: true });
  const topLevelFiles = [];
  const folders = [];

  for (const e of entries) {
    if (e.isDirectory()) folders.push(e.name);
    else if (e.isFile() && isAudioFile(e.name)) topLevelFiles.push(e.name);
  }

  // Write per-folder manifests
  for (const folder of folders) {
    const folderPath = path.join(songsDir, folder);
    const files = fs.readdirSync(folderPath).filter(isAudioFile).sort();
    const manifestPath = path.join(folderPath, 'manifest.json');
    writeJson(manifestPath, files);
  }

  // Top-level manifest includes top-level audio files plus optionally all folder files
  const allFiles = [...topLevelFiles];
  // Optionally include folder files in top-level manifest — comment out if undesired
  for (const folder of folders) {
    const folderPath = path.join(songsDir, folder);
    const files = fs.readdirSync(folderPath).filter(isAudioFile).sort();
    for (const f of files) allFiles.push(f);
  }

  const topManifest = path.join(songsDir, 'manifest.json');
  writeJson(topManifest, allFiles);
}

scan();
