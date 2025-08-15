#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 递归查找所有 page.tsx 文件
function findPageFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // 跳过 node_modules 和 .next 目录
      if (!item.startsWith('.') && item !== 'node_modules') {
        findPageFiles(fullPath, files);
      }
    } else if (item === 'page.tsx') {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 添加 force-static 配置到文件
function addForceStatic(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否已经有 dynamic 配置
  if (content.includes('export const dynamic')) {
    console.log(`✓ ${filePath} already has dynamic config`);
    return;
  }
  
  // 查找第一个 export 语句的位置
  const lines = content.split('\n');
  let insertIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('export ') && !line.includes('import')) {
      insertIndex = i;
      break;
    }
  }
  
  if (insertIndex === -1) {
    console.log(`⚠ Could not find export statement in ${filePath}`);
    return;
  }
  
  // 插入 force-static 配置
  lines.splice(insertIndex, 0, '', '// Force static generation', 'export const dynamic = \'force-static\';');
  
  const newContent = lines.join('\n');
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✓ Added force-static to ${filePath}`);
}

// 主函数
function main() {
  const appDir = path.join(process.cwd(), 'src/app');
  
  if (!fs.existsSync(appDir)) {
    console.error('❌ src/app directory not found');
    process.exit(1);
  }
  
  console.log('🔍 Finding page files...');
  const pageFiles = findPageFiles(appDir);
  
  console.log(`📄 Found ${pageFiles.length} page files`);
  
  for (const file of pageFiles) {
    addForceStatic(file);
  }
  
  console.log('✅ Done!');
}

main();
