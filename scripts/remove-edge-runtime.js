#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 递归查找所有 .tsx 和 .ts 文件
function findFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // 跳过 node_modules 和 .next 目录
      if (!item.startsWith('.') && item !== 'node_modules') {
        findFiles(fullPath, files);
      }
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 移除 Edge Runtime 配置
function removeEdgeRuntime(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否有 runtime 配置
  if (!content.includes('export const runtime')) {
    return;
  }
  
  const lines = content.split('\n');
  const newLines = [];
  let skipNext = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 跳过 Edge Runtime 相关的行
    if (line.includes('// Cloudflare Pages Edge Runtime 配置') || 
        line.includes('export const runtime = \'edge\';')) {
      skipNext = true;
      continue;
    }
    
    // 跳过空行（如果前面是 runtime 配置）
    if (skipNext && line.trim() === '') {
      skipNext = false;
      continue;
    }
    
    skipNext = false;
    newLines.push(line);
  }
  
  const newContent = newLines.join('\n');
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✓ Removed Edge Runtime from ${filePath}`);
  }
}

// 主函数
function main() {
  const appDir = path.join(process.cwd(), 'src/app');
  
  if (!fs.existsSync(appDir)) {
    console.error('❌ src/app directory not found');
    process.exit(1);
  }
  
  console.log('🔍 Finding files...');
  const files = findFiles(appDir);
  
  console.log(`📄 Found ${files.length} files`);
  
  for (const file of files) {
    removeEdgeRuntime(file);
  }
  
  console.log('✅ Done!');
}

main();
