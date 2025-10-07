#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PORTFOLIO_PATH = path.join(__dirname, 'lib', 'portfolio.ts');
const HERO_STRIPS_PATH = path.join(__dirname, 'components', 'HeroStrips.tsx');

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
  log('║       FULL SCOPE MEDIA - COMPLETE MEDIA MANAGER 🎬        ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝\n', 'cyan');
}

function showMainMenu() {
  log('\n🎯 What would you like to do?\n', 'bright');
  log('━━━━━━━━━━━ HERO CAROUSEL ━━━━━━━━━━━', 'cyan');
  log('1. 🎞️  Manage Hero Carousel Strips', 'green');
  log('\n━━━━━━━━━━━ PORTFOLIO GALLERY ━━━━━━━━━━━', 'cyan');
  log('2. 📤 Add new image to Portfolio', 'green');
  log('3. 👀 View all Portfolio images', 'blue');
  log('4. 🗑️  Remove Portfolio image', 'yellow');
  log('\n━━━━━━━━━━━ SETTINGS ━━━━━━━━━━━', 'cyan');
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

// ============= HERO CAROUSEL MANAGEMENT =============

async function manageHeroCarousel() {
  while (true) {
    showHeader();
    log('🎞️  HERO CAROUSEL MANAGER\n', 'bright');
    log('Current 5 strips:\n', 'cyan');

    const content = fs.readFileSync(HERO_STRIPS_PATH, 'utf8');
    const stripsMatch = content.match(/const DEFAULT_STRIPS: StripItem\[\] = \[([\s\S]*?)\];/);

    if (!stripsMatch) {
      log('❌ Could not find carousel strips', 'red');
      await prompt('Press Enter to continue...');
      return;
    }

    // Parse current strips
    const strips = parseStrips(stripsMatch[1]);
    strips.forEach((strip, i) => {
      const icon = strip.type === 'video' ? '🎥' : '📷';
      log(`${i + 1}. ${icon} ${strip.title} - ${strip.src}`, strip.type === 'video' ? 'magenta' : 'green');
      if (strip.poster) log(`   └─ Poster: ${strip.poster}`, 'yellow');
    });

    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
    log('\n1. Edit a strip', 'green');
    log('2. Back to main menu\n', 'red');

    const choice = await prompt('Choose (1-2): ');

    if (choice === '1') {
      const stripNum = await prompt('Which strip to edit (1-5)? ');
      const idx = parseInt(stripNum) - 1;

      if (idx >= 0 && idx < strips.length) {
        await editCarouselStrip(strips[idx], idx);
      } else {
        log('❌ Invalid strip number', 'red');
        await prompt('Press Enter to continue...');
      }
    } else if (choice === '2') {
      return;
    }
  }
}

function parseStrips(stripsContent) {
  const strips = [];
  const stripRegex = /\{[\s\S]*?id:\s*(\d+)[\s\S]*?type:\s*['"](\w+)['"][\s\S]*?src:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?(?:text:\s*['"]([^'"]+)['"])?[\s\S]*?(?:poster:\s*['"]([^'"]+)['"])?[\s\S]*?\}/g;

  let match;
  while ((match = stripRegex.exec(stripsContent)) !== null) {
    strips.push({
      id: parseInt(match[1]),
      type: match[2],
      src: match[3],
      title: match[4],
      text: match[5] || '',
      poster: match[6] || ''
    });
  }

  return strips;
}

async function editCarouselStrip(strip, index) {
  showHeader();
  log(`✏️  EDITING STRIP ${index + 1}: ${strip.title}\n`, 'bright');

  log('What do you want to change?\n', 'cyan');
  log('1. Change to Image', 'green');
  log('2. Change to Video', 'green');
  log('3. Update Title/Text', 'blue');
  log('4. Cancel\n', 'red');

  const choice = await prompt('Choose (1-4): ');

  if (choice === '1') {
    await updateStripToImage(strip, index);
  } else if (choice === '2') {
    await updateStripToVideo(strip, index);
  } else if (choice === '3') {
    await updateStripText(strip, index);
  }
}

async function updateStripToImage(strip, index) {
  log('\n📷 UPDATE TO IMAGE\n', 'bright');

  log('Enter Cloudinary Public ID or local path (/Towebsite/...)', 'cyan');
  const src = await prompt('Image source: ');
  if (!src) return;

  const title = await prompt(`Title (current: ${strip.title}): `) || strip.title;
  const text = await prompt(`Text (current: ${strip.text}): `) || strip.text;

  updateCarouselStrip(index, {
    ...strip,
    type: 'image',
    src,
    title,
    text,
    poster: undefined
  });

  log('\n✅ Strip updated to image!\n', 'green');
  await prompt('Press Enter to continue...');
}

async function updateStripToVideo(strip, index) {
  log('\n🎥 UPDATE TO VIDEO\n', 'bright');

  log('Enter Cloudinary video Public ID (e.g., videos/my-video)', 'cyan');
  const src = await prompt('Video source: ');
  if (!src) return;

  log('\nEnter poster/thumbnail image:', 'cyan');
  const poster = await prompt('Poster (Cloudinary ID or /Towebsite/...): ');

  const title = await prompt(`Title (current: ${strip.title}): `) || strip.title;
  const text = await prompt(`Text (current: ${strip.text}): `) || strip.text;

  updateCarouselStrip(index, {
    ...strip,
    type: 'video',
    src,
    title,
    text,
    poster: poster || strip.poster
  });

  log('\n✅ Strip updated to video!\n', 'green');
  await prompt('Press Enter to continue...');
}

async function updateStripText(strip, index) {
  log('\n✏️  UPDATE TEXT\n', 'bright');

  const title = await prompt(`Title (current: ${strip.title}): `) || strip.title;
  const text = await prompt(`Text (current: ${strip.text}): `) || strip.text;

  updateCarouselStrip(index, {
    ...strip,
    title,
    text
  });

  log('\n✅ Text updated!\n', 'green');
  await prompt('Press Enter to continue...');
}

function updateCarouselStrip(index, updatedStrip) {
  let content = fs.readFileSync(HERO_STRIPS_PATH, 'utf8');

  const stripsMatch = content.match(/const DEFAULT_STRIPS: StripItem\[\] = \[([\s\S]*?)\];/);
  if (!stripsMatch) {
    log('❌ Could not find carousel strips', 'red');
    return;
  }

  const strips = parseStrips(stripsMatch[1]);
  strips[index] = updatedStrip;

  // Rebuild the strips array
  const newStripsContent = strips.map(s => {
    const poster = s.poster ? `\n    poster: '${s.poster}',` : '';
    return `  {
    id: ${s.id},
    type: '${s.type}',
    src: '${s.src}',
    title: '${s.title}',
    text: '${s.text}',${poster}
  }`;
  }).join(',\n');

  const newContent = content.replace(
    /const DEFAULT_STRIPS: StripItem\[\] = \[[\s\S]*?\];/,
    `const DEFAULT_STRIPS: StripItem[] = [\n${newStripsContent}\n];`
  );

  fs.writeFileSync(HERO_STRIPS_PATH, newContent);
}

// ============= PORTFOLIO MANAGEMENT =============

async function addToPortfolio() {
  showHeader();
  log('📤 ADD TO PORTFOLIO\n', 'bright');

  log('📋 Image source options:', 'cyan');
  log('1. Cloudinary (recommended)', 'green');
  log('2. Local file (/Towebsite/...)\n', 'green');

  const sourceChoice = await prompt('Choose (1-2): ');

  let src;
  if (sourceChoice === '1') {
    log('\n📋 Upload your image to Cloudinary first:', 'yellow');
    log('   → https://cloudinary.com/console', 'yellow');
    src = await prompt('\nEnter Cloudinary Public ID: ');
  } else {
    log('\nExample: /Towebsite/exterior/MyPhoto.jpg\n', 'cyan');
    src = await prompt('Enter local path: ');
  }

  if (!src) {
    log('❌ No source provided', 'red');
    await prompt('Press Enter to continue...');
    return;
  }

  const alt = await prompt('Image description/alt text: ');

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

  addImageToPortfolio({
    src,
    alt: alt || 'Full Scope Media project',
    tag,
    w: parseInt(width),
    h: parseInt(height)
  });

  log('\n✅ Image added to portfolio!\n', 'green');
  await prompt('Press Enter to continue...');
}

function addImageToPortfolio(imageData) {
  let content = fs.readFileSync(PORTFOLIO_PATH, 'utf8');

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

  const entryRegex = new RegExp(`\\s*\\{[^}]*src:\\s*['"]` + images[index].src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + `['"][^}]*\\},?`, 'g');
  const updatedContent = content.replace(entryRegex, '');

  fs.writeFileSync(PORTFOLIO_PATH, updatedContent);
  log('\n✅ Image removed!\n', 'green');
  await prompt('Press Enter to continue...');
}

// ============= MAIN LOOP =============

async function main() {
  while (true) {
    showHeader();
    showMainMenu();

    const choice = await prompt('Choose an option (1-6): ');

    switch (choice) {
      case '1':
        await manageHeroCarousel();
        break;
      case '2':
        await addToPortfolio();
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

main().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
