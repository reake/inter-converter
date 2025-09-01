const fs = require('fs');
const path = require('path');

// 获取所有需要修复的工具目录
const toolsDir = '/Users/reake/data/mywork/inter-converter/src/app/[locale]/(tools)';
const categories = ['media', 'time', 'unit']; // 剩余可能需要修复的类别

let totalFixedCount = 0;

categories.forEach(category => {
  const categoryDir = path.join(toolsDir, category);
  
  if (fs.existsSync(categoryDir)) {
    const files = fs.readdirSync(categoryDir);
    let categoryFixedCount = 0;
    
    files.forEach(file => {
      const filePath = path.join(categoryDir, file, 'page.tsx');
      
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 检查是否需要修复
        if (content.includes('const toolContent: ToolContent = l === \'zh\' ? zhTool : enTool;') && 
            !content.includes('normalizeToolContent')) {
          
          // 添加import
          content = content.replace(
            "import { ToolContent } from '@/types/tool-content';",
            "import { ToolContent } from '@/types/tool-content';\nimport { normalizeToolContent } from '@/utils/normalize-tool-content';"
          );
          
          // 替换工具内容加载逻辑
          content = content.replace(
            /const toolContent: ToolContent = l === 'zh' \? zhTool : enTool;\s*const fallbackContent: ToolContent = enTool;/g,
            "const rawContent = l === 'zh' ? zhTool : enTool;\n  const toolContent = normalizeToolContent(rawContent);\n  const fallbackContent = normalizeToolContent(enTool);"
          );
          
          // 如果没有fallbackContent，只替换toolContent
          if (!content.includes('fallbackContent')) {
            content = content.replace(
              /const toolContent: ToolContent = l === 'zh' \? zhTool : enTool;/g,
              "const rawContent = l === 'zh' ? zhTool : enTool;\n  const toolContent = normalizeToolContent(rawContent);"
            );
          }
          
          fs.writeFileSync(filePath, content);
          categoryFixedCount++;
          console.log(`Fixed: ${category}/${file}/page.tsx`);
        }
      }
    });
    
    console.log(`${category} category: ${categoryFixedCount} files fixed`);
    totalFixedCount += categoryFixedCount;
  }
});

console.log(`Total fixed: ${totalFixedCount} files`);
