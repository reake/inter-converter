#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 重新组织静态文件，将英文版文件移到根目录
 */
function reorganizeStaticFiles() {
  const outDir = path.join(process.cwd(), 'out');
  const enDir = path.join(outDir, 'en');
  
  if (!fs.existsSync(enDir)) {
    console.error('❌ English directory not found:', enDir);
    return;
  }
  
  console.log('🔄 Reorganizing static files...');
  
  // 递归复制英文文件到根目录
  function copyEnglishFiles(srcDir, destDir) {
    const items = fs.readdirSync(srcDir);
    
    for (const item of items) {
      const srcPath = path.join(srcDir, item);
      const destPath = path.join(destDir, item);
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        // 创建目标目录
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        // 递归复制子目录
        copyEnglishFiles(srcPath, destPath);
      } else {
        // 复制文件
        fs.copyFileSync(srcPath, destPath);
        console.log(`✓ Copied: ${path.relative(outDir, destPath)}`);
      }
    }
  }
  
  // 复制英文文件到根目录
  copyEnglishFiles(enDir, outDir);

  // 特殊处理：将 en.html 重命名为 index.html
  const enHtmlPath = path.join(outDir, 'en.html');
  const indexHtmlPath = path.join(outDir, 'index.html');

  if (fs.existsSync(enHtmlPath)) {
    fs.copyFileSync(enHtmlPath, indexHtmlPath);
    console.log('✓ Created: index.html (from en.html)');
  }

  // 清理不需要的目录和文件
  const zhDir = path.join(outDir, 'zh');

  // 删除中文目录
  if (fs.existsSync(zhDir)) {
    fs.rmSync(zhDir, { recursive: true, force: true });
    console.log('✓ Removed: zh/ directory');
  }

  // 删除 /en/ 备份目录
  if (fs.existsSync(enDir)) {
    fs.rmSync(enDir, { recursive: true, force: true });
    console.log('✓ Removed: en/ directory');
  }

  // 删除中文相关文件
  const zhHtmlPath = path.join(outDir, 'zh.html');
  if (fs.existsSync(zhHtmlPath)) {
    fs.unlinkSync(zhHtmlPath);
    console.log('✓ Removed: zh.html');
  }

  const zhTxtPath = path.join(outDir, 'zh.txt');
  if (fs.existsSync(zhTxtPath)) {
    fs.unlinkSync(zhTxtPath);
    console.log('✓ Removed: zh.txt');
  }

  // 删除 en.html 和 en.txt 文件（避免 /en/ URL）
  const enHtmlRootPath = path.join(outDir, 'en.html');
  if (fs.existsSync(enHtmlRootPath)) {
    fs.unlinkSync(enHtmlRootPath);
    console.log('✓ Removed: en.html');
  }

  const enTxtRootPath = path.join(outDir, 'en.txt');
  if (fs.existsSync(enTxtRootPath)) {
    fs.unlinkSync(enTxtRootPath);
    console.log('✓ Removed: en.txt');
  }

  console.log('✅ Static files reorganized successfully!');
  console.log('📁 File structure:');
  console.log('   / (root) - English version only');
}

// 运行脚本
reorganizeStaticFiles();
