#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const PORTFOLIO_PATH = path.join(__dirname, 'lib', 'portfolio.ts');
const PUBLIC_PATH = path.join(__dirname, 'public', 'Towebsite');

// Colors for terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function showHeader() {
  console.clear();
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║         FULL SCOPE MEDIA - IMAGE MANAGER 📸               ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝\n', 'cyan');
}

function showMainMenu() {
  log('\n🎯 What would you like to do?\n', 'bright');
  log('1. 📤 Upload new image to Cloudinary', 'green');
  log('2. 📁 Add local image (already in /public)', 'green');
  log('3. 👀 View all portfolio images', 'blue');
  log('4. 🗑️  Remove an image from portfolio', 'yellow');
  log('5. ⚙️  Setup Cloudinary credentials', 'magenta');
  log('6. 🚪 Exit\n', 'red');
}

async function setupCloudinary() {
  showHeader();
  log('⚙️  CLOUDINARY SETUP\n', 'bright');
  log('Get your credentials from: https://cloudinary.com/console\n', 'cyan');

  const cloudName = await prompt('Enter your Cloud Name: ');
  const apiKey = await prompt('Enter your API Key: ');
  const apiSecret = await prompt('Enter your API Secret: ');

  const envPath = path.join(__dirname, '.env.local');
  let envContent = fs.readFileSync(envPath, 'utf8');

  // Update or add Cloudinary credentials
  const updates = {
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME': cloudName,
    'CLOUDINARY_API_KEY': apiKey,
    'CLOUDINARY_API_SECRET': apiSecret,
    'CLOUDINARY_URL': `cloudinary://${apiKey}:${apiSecret}@${cloudName}`
  };

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
  }

  fs.writeFileSync(envPath, envContent);
  log('\n✅ Cloudinary credentials saved!\n', 'green');
  await prompt('Press Enter to continue...');
}

async function uploadToCloudinary() {
  showHeader();
  log('📤 UPLOAD TO CLOUDINARY\n', 'bright');

  // Check if credentials exist
  const envPath = path.join(__dirname, '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');

  if (!envContent.includes('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=') ||
      envContent.match(/NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=\s*$/m)) {
    log('⚠️  Cloudinary credentials not set up!\n', 'red');
    const setup = await prompt('Would you like to set them up now? (y/n): ');
    if (setup.toLowerCase() === 'y') {
      await setupCloudinary();
      return;
    }
    return;
  }

  log('📋 Instructions:', 'cyan');
  log('1. Go to https://cloudinary.com/console', 'yellow');
  log('2. Click Media Library → Upload', 'yellow');
  log('3. Upload your image(s)', 'yellow');
  log('4. Note the Public ID (e.g., "portfolio/exterior/house-1")\n', 'yellow');

  const publicId = await prompt('Enter the Cloudinary Public ID: ');
  if (!publicId) {
    log('❌ No Public ID provided', 'red');
    await prompt('Press Enter to continue...');
    return;
  }

  const alt = await prompt('Enter image description/alt text: ');

  log('\n🏷️  Select category:', 'cyan');
  log('1. Exterior', 'green');
  log('2. Interior', 'green');
  log('3. Commercial', 'green');
  log('4. Detail', 'green');
  const tagChoice = await prompt('Choose (1-4): ');

  const tags = ['exterior', 'interior', 'commercial', 'detail'];
  const tag = tags[parseInt(tagChoice) - 1] || 'exterior';

  const width = await prompt('Image width (default 1600): ') || '1600';
  const height = await prompt('Image height (default 1067): ') || '1067';

  addToPortfolio({
    src: publicId,
    alt: alt || 'Full Scope Media project',
    tag,
    w: parseInt(width),
    h: parseInt(height),
    cloudinary: true
  });

  log('\n✅ Image added to portfolio!\n', 'green');
  await prompt('Press Enter to continue...');
}

async function addLocalImage() {
  showHeader();
  log('📁 ADD LOCAL IMAGE\n', 'bright');

  log('📋 Available categories:', 'cyan');
  log('• exterior/', 'yellow');
  log('• interior/', 'yellow');
  log('• commercial/', 'yellow');
  log('• detail/\n', 'yellow');

  log('Example: /Towebsite/exterior/MyPhoto.jpg\n', 'cyan');

  const srcPath = await prompt('Enter image path (starting with /Towebsite/): ');
  if (!srcPath || !srcPath.startsWith('/Towebsite/')) {
    log('❌ Invalid path. Must start with /Towebsite/', 'red');
    await prompt('Press Enter to continue...');
    return;
  }

  // Check if file exists
  const fullPath = path.join(__dirname, 'public', srcPath.replace('/Towebsite/', 'Towebsite/'));
  if (!fs.existsSync(fullPath)) {
    log(`⚠️  Warning: File not found at ${fullPath}`, 'yellow');
    const cont = await prompt('Continue anyway? (y/n): ');
    if (cont.toLowerCase() !== 'y') return;
  }

  const alt = await prompt('Enter image description/alt text: ');

  log('\n🏷️  Select category:', 'cyan');
  log('1. Exterior', 'green');
  log('2. Interior', 'green');
  log('3. Commercial', 'green');
  log('4. Detail', 'green');
  const tagChoice = await prompt('Choose (1-4): ');

  const tags = ['exterior', 'interior', 'commercial', 'detail'];
  const tag = tags[parseInt(tagChoice) - 1] || 'exterior';

  const width = await prompt('Image width (default 1600): ') || '1600';
  const height = await prompt('Image height (default 1067): ') || '1067';

  addToPortfolio({
    src: srcPath,
    alt: alt || 'Full Scope Media project',
    tag,
    w: parseInt(width),
    h: parseInt(height)
  });

  log('\n✅ Image added to portfolio!\n', 'green');
  await prompt('Press Enter to continue...');
}

function addToPortfolio(imageData) {
  let content = fs.readFileSync(PORTFOLIO_PATH, 'utf8');

  // Find the PHOTOS array
  const photosArrayRegex = /export const PHOTOS: PhotoItem\[\] = \[([\s\S]*?)\];/;
  const match = content.match(photosArrayRegex);

  if (!match) {
    log('❌ Could not find PHOTOS array in portfolio.ts', 'red');
    return;
  }

  const newEntry = `  {
    src: '${imageData.src}',
    alt: '${imageData.alt}',
    tag: '${imageData.tag}',
    w: ${imageData.w},
    h: ${imageData.h}
  },`;

  // Insert before the closing bracket
  const arrayContent = match[1];
  const updatedArray = arrayContent.trimEnd() + '\n' + newEntry + '\n';
  const updatedContent = content.replace(photosArrayRegex, `export const PHOTOS: PhotoItem[] = [${updatedArray}];`);

  fs.writeFileSync(PORTFOLIO_PATH, updatedContent);
}

async function viewAllImages() {
  showHeader();
  log('👀 CURRENT PORTFOLIO IMAGES\n', 'bright');

  const content = fs.readFileSync(PORTFOLIO_PATH, 'utf8');
  const photosArrayRegex = /export const PHOTOS: PhotoItem\[\] = \[([\s\S]*?)\];/;
  const match = content.match(photosArrayRegex);

  if (!match) {
    log('❌ Could not find PHOTOS array', 'red');
    await prompt('Press Enter to continue...');
    return;
  }

  // Parse images (simple regex)
  const imageRegex = /src:\s*['"]([^'"]+)['"]/g;
  const images = [];
  let imgMatch;

  while ((imgMatch = imageRegex.exec(match[1])) !== null) {
    images.push(imgMatch[1]);
  }

  if (images.length === 0) {
    log('📭 No images found', 'yellow');
  } else {
    images.forEach((img, i) => {
      const isCloudinary = !img.startsWith('/');
      const icon = isCloudinary ? '☁️ ' : '📁';
      log(`${i + 1}. ${icon} ${img}`, isCloudinary ? 'cyan' : 'green');
    });
  }

  log(`\n📊 Total: ${images.length} images\n`, 'bright');
  await prompt('Press Enter to continue...');
}

async function removeImage() {
  showHeader();
  log('🗑️  REMOVE IMAGE\n', 'bright');

  const content = fs.readFileSync(PORTFOLIO_PATH, 'utf8');
  const photosArrayRegex = /export const PHOTOS: PhotoItem\[\] = \[([\s\S]*?)\];/;
  const match = content.match(photosArrayRegex);

  if (!match) {
    log('❌ Could not find PHOTOS array', 'red');
    await prompt('Press Enter to continue...');
    return;
  }

  // Parse images
  const imageRegex = /\{[^}]*src:\s*['"]([^'"]+)['"][^}]*\}/g;
  const images = [];
  let imgMatch;

  while ((imgMatch = imageRegex.exec(match[1])) !== null) {
    images.push({
      src: imgMatch[1],
      fullMatch: imgMatch[0]
    });
  }

  if (images.length === 0) {
    log('📭 No images to remove', 'yellow');
    await prompt('Press Enter to continue...');
    return;
  }

  images.forEach((img, i) => {
    const isCloudinary = !img.src.startsWith('/');
    const icon = isCloudinary ? '☁️ ' : '📁';
    log(`${i + 1}. ${icon} ${img.src}`, isCloudinary ? 'cyan' : 'green');
  });

  const choice = await prompt('\nEnter number to remove (or 0 to cancel): ');
  const index = parseInt(choice) - 1;

  if (index < 0 || index >= images.length) {
    log('❌ Cancelled', 'yellow');
    await prompt('Press Enter to continue...');
    return;
  }

  const confirm = await prompt(`Remove "${images[index].src}"? (y/n): `);
  if (confirm.toLowerCase() !== 'y') {
    log('❌ Cancelled', 'yellow');
    await prompt('Press Enter to continue...');
    return;
  }

  // Remove the image entry
  const entryRegex = new RegExp(`\\s*\\{[^}]*src:\\s*['"]` + images[index].src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + `['"][^}]*\\},?`, 'g');
  const updatedContent = content.replace(entryRegex, '');

  fs.writeFileSync(PORTFOLIO_PATH, updatedContent);
  log('\n✅ Image removed!\n', 'green');
  await prompt('Press Enter to continue...');
}

async function main() {
  while (true) {
    showHeader();
    showMainMenu();

    const choice = await prompt('Choose an option (1-6): ');

    switch (choice) {
      case '1':
        await uploadToCloudinary();
        break;
      case '2':
        await addLocalImage();
        break;
      case '3':
        await viewAllImages();
        break;
      case '4':
        await removeImage();
        break;
      case '5':
        await setupCloudinary();
        break;
      case '6':
        log('\n👋 Goodbye!\n', 'cyan');
        rl.close();
        process.exit(0);
      default:
        log('\n❌ Invalid option\n', 'red');
        await prompt('Press Enter to continue...');
    }
  }
}

// Start the CLI
main().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
