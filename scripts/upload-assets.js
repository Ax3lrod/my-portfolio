#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Flexible Cloudinary Upload Script
 *
 * Usage:
 * node scripts/upload-assets.js single ./public/assets/hero/banner.jpg
 * node scripts/upload-assets.js multiple ./public/assets/hero/banner.jpg ./public/assets/ornaments/flower.png
 * node scripts/upload-assets.js folder ./public/assets/ornaments
 * node scripts/upload-assets.js folder ./public/assets/ornaments --subfolder ornaments
 * node scripts/upload-assets.js folder ./public/assets --recursive
 */

const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const path = require("path");
const { program } = require("commander");

// Load environment variables
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Supported formats
const SUPPORTED_FORMATS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".svg",
  ".gif",
  ".bmp",
  ".tiff",
  ".mp4",
  ".pdf",
];

/**
 * Check if file is supported format
 */
function isSupportedImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return SUPPORTED_FORMATS.includes(ext);
}

/**
 * Generate Cloudinary public_id from file path
 */
function generatePublicId(filePath, baseFolder = "", customFolder = "") {
  const filename = path.parse(filePath).name;
  const dirname = path.dirname(filePath);

  if (customFolder) {
    return `${customFolder}/${filename}`;
  }

  // Extract folder structure from path
  let folderStructure = "";
  if (baseFolder) {
    const relativePath = path.relative(baseFolder, dirname);
    folderStructure =
      relativePath !== "." ? relativePath.replace(/\\/g, "/") : "";
  } else {
    // Use parent directory as folder
    folderStructure = path.basename(dirname);
  }

  return folderStructure ? `${folderStructure}/${filename}` : filename;
}

/**
 * Upload single file to Cloudinary
 */
async function uploadFile(filePath, options = {}) {
  const {
    folder = "",
    quality = "auto",
    overwrite = true,
    baseFolder = "",
    customFolder = "",
  } = options;

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return null;
  }

  if (!isSupportedImage(filePath)) {
    console.warn(`⚠️  Skipping unsupported file: ${filePath}`);
    return null;
  }

  try {
    const publicId = generatePublicId(
      filePath,
      baseFolder,
      customFolder || folder
    );

    const ext = path.extname(filePath).toLowerCase();
    const isVideoOrPdf = ext === ".mp4" || ext === ".pdf";

    console.log(`⬆️  Uploading: ${path.basename(filePath)} -> ${publicId}`);

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite,
      // Setting resource_type to auto allows mp4, pdf, and images
      resource_type: "auto",
      // Only apply quality transformations to images (prevents errors on videos)
      ...(!isVideoOrPdf && {
        quality_analysis: true,
        transformation: [
          { quality: quality === "auto" ? "auto:good" : quality },
        ],
      }),
    });

    console.log(
      `✅ Success: ${result.public_id} (${Math.round(result.bytes / 1024)}KB)`
    );
    return result;
  } catch (error) {
    console.error(`❌ Upload failed for ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Get all supported files from directory
 */
function getImageFiles(dirPath, recursive = false) {
  const files = [];

  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Directory not found: ${dirPath}`);
    return files;
  }

  function scanDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && recursive) {
        scanDirectory(fullPath);
      } else if (stat.isFile() && isSupportedImage(fullPath)) {
        files.push(fullPath);
      }
    }
  }

  scanDirectory(dirPath);
  return files;
}

/**
 * Upload multiple files with progress tracking
 */
async function uploadMultiple(files, options = {}) {
  const results = {
    success: [],
    failed: [],
    skipped: [],
  };

  console.log(`\n📦 Starting upload of ${files.length} files...\n`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(`[${i + 1}/${files.length}]`);

    const result = await uploadFile(file, options);

    if (result) {
      results.success.push({ file, result });
    } else if (isSupportedImage(file)) {
      results.failed.push(file);
    } else {
      results.skipped.push(file);
    }

    // Add small delay to avoid rate limiting
    if (i < files.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  // Summary
  console.log("\n📊 Upload Summary:");
  console.log(`✅ Success: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⚠️  Skipped: ${results.skipped.length}`);

  if (results.failed.length > 0) {
    console.log("\n❌ Failed files:");
    results.failed.forEach((file) => console.log(`   ${file}`));
  }

  return results;
}

/**
 * Command handlers
 */
async function handleSingle(filePath, options) {
  console.log(`📤 Uploading single file: ${filePath}`);
  await uploadFile(filePath, options);
}

async function handleMultiple(files, options) {
  console.log(`📤 Uploading ${files.length} files`);
  await uploadMultiple(files, options);
}

async function handleFolder(folderPath, options) {
  const { recursive = false } = options;
  console.log(
    `📂 Scanning folder: ${folderPath}${recursive ? " (recursive)" : ""}`
  );

  const files = getImageFiles(folderPath, recursive);

  if (files.length === 0) {
    console.log("No supported image/video files found.");
    return;
  }

  await uploadMultiple(files, {
    ...options,
    baseFolder: folderPath,
  });
}

/**
 * CLI Setup
 */
program
  .name("upload-assets")
  .description("Upload assets to Cloudinary with flexible input options")
  .version("1.0.0");

// Single file command
program
  .command("single <file>")
  .description("Upload a single file")
  .option("-f, --folder <folder>", "Cloudinary folder name")
  .option(
    "-q, --quality <quality>",
    "Image quality (auto, 100, 80, etc.)",
    "auto"
  )
  .option("--no-overwrite", "Don't overwrite existing files")
  .action(async (file, options) => {
    await handleSingle(file, options);
  });

// Multiple files command
program
  .command("multiple <files...>")
  .description("Upload multiple files")
  .option("-f, --folder <folder>", "Cloudinary folder name")
  .option(
    "-q, --quality <quality>",
    "Image quality (auto, 100, 80, etc.)",
    "auto"
  )
  .option("--no-overwrite", "Don't overwrite existing files")
  .action(async (files, options) => {
    await handleMultiple(files, options);
  });

// Folder command
program
  .command("folder <path>")
  .description("Upload all images/videos in a folder")
  .option(
    "-f, --folder <folder>",
    "Custom Cloudinary folder name (default: use directory structure)"
  )
  .option(
    "-q, --quality <quality>",
    "Image quality (auto, 100, 80, etc.)",
    "auto"
  )
  .option("-r, --recursive", "Include subdirectories")
  .option("--no-overwrite", "Don't overwrite existing files")
  .action(async (folderPath, options) => {
    await handleFolder(folderPath, options);
  });

// Batch command for common use cases
program
  .command("batch")
  .description("Upload common asset folders with predefined structure")
  .option("--assets-path <path>", "Base assets path", "./public/assets")
  .option(
    "-q, --quality <quality>",
    "Image quality (auto, 100, 80, etc.)",
    "auto"
  )
  .option("--no-overwrite", "Don't overwrite existing files")
  .action(async (options) => {
    const { assetsPath } = options;
    const commonFolders = [
      { path: path.join(assetsPath, "hero"), folder: "hero" },
      { path: path.join(assetsPath, "ornaments"), folder: "ornaments" },
      { path: path.join(assetsPath, "backgrounds"), folder: "backgrounds" },
      { path: path.join(assetsPath, "icons"), folder: "icons" },
    ];

    for (const { path: folderPath, folder } of commonFolders) {
      if (fs.existsSync(folderPath)) {
        console.log(`\n🎯 Processing ${folder} folder...`);
        await handleFolder(folderPath, { ...options, folder });
      } else {
        console.log(`⚠️  Folder not found, skipping: ${folderPath}`);
      }
    }
  });

// Help command
program
  .command("help")
  .description("Show usage examples")
  .action(() => {
    console.log(`
🚀 Cloudinary Upload Script - Usage Examples:

📄 Single file:
   node scripts/upload-assets.js single ./public/assets/hero/banner.jpg
   node scripts/upload-assets.js single ./public/logo.png --folder branding

📄 Multiple files:
   node scripts/upload-assets.js multiple ./public/assets/hero/banner.jpg ./public/assets/ornaments/flower.png
   node scripts/upload-assets.js multiple ./public/assets/hero/* --folder hero

📂 Folder (non-recursive):
   node scripts/upload-assets.js folder ./public/assets/ornaments
   node scripts/upload-assets.js folder ./public/assets/ornaments --folder decorations

📂 Folder (recursive):
   node scripts/upload-assets.js folder ./public/assets --recursive
   node scripts/upload-assets.js folder ./public/assets --recursive --quality 80

🎯 Batch upload (common folders):
   node scripts/upload-assets.js batch
   node scripts/upload-assets.js batch --assets-path ./src/assets

⚙️  Options:
   -f, --folder <name>     Custom Cloudinary folder
   -q, --quality <value>   Image quality (auto, 100, 80, 60)
   -r, --recursive         Include subdirectories  
   --no-overwrite          Don't overwrite existing files

📋 Requirements:
   - Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local
   - Install dependencies: npm install cloudinary dotenv commander
`);
  });

// Default to help if no command
if (process.argv.length <= 2) {
  program.outputHelp();
  process.exit(0);
}

program.parse();
