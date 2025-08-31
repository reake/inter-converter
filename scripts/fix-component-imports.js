const fs = require('fs');
const path = require('path');

// Components that use default export (need to be imported without curly braces)
const defaultExportComponents = [
  'OnlineStopwatch',
  'TimezoneConverter',
  'CountdownTimer',
  'DateCalculator',
  'DateDifferenceCalculator',
  'WorkingDaysCalculator'
];

// Function to check if a component uses default export
function checkComponentExport(componentPath) {
  try {
    const content = fs.readFileSync(componentPath, 'utf8');
    return content.includes('export default function');
  } catch (error) {
    return false;
  }
}

// Function to fix import in a page file
function fixImportInPage(pagePath, componentName) {
  try {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Check if import needs to be fixed (has curly braces)
    const namedImportPattern = new RegExp(`import\\s*{\\s*${componentName}\\s*}\\s*from`, 'g');
    const defaultImportPattern = new RegExp(`import\\s+${componentName}\\s+from`, 'g');
    
    if (namedImportPattern.test(content)) {
      // Replace named import with default import
      content = content.replace(namedImportPattern, `import ${componentName} from`);
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`✅ Fixed import in: ${pagePath}`);
      return true;
    } else if (defaultImportPattern.test(content)) {
      console.log(`ℹ️  Already correct: ${pagePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error fixing ${pagePath}:`, error.message);
    return false;
  }
  return false;
}

// Main function to fix all component imports
function fixAllImports() {
  console.log('🔧 Fixing component imports...\n');
  
  const timeToolsDir = path.join(__dirname, '..', 'src', 'app', '[locale]', '(tools)', 'time');
  const unitToolsDir = path.join(__dirname, '..', 'src', 'app', '[locale]', '(tools)', 'unit');
  
  let fixedCount = 0;
  
  // Check time tools
  const timeTools = fs.readdirSync(timeToolsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const toolDir of timeTools) {
    const pagePath = path.join(timeToolsDir, toolDir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      const componentName = toolDir.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('');
      
      const componentPath = path.join(__dirname, '..', 'src', 'components', 'converters', 'time', `${componentName}.tsx`);
      
      if (fs.existsSync(componentPath) && checkComponentExport(componentPath)) {
        if (fixImportInPage(pagePath, componentName)) {
          fixedCount++;
        }
      }
    }
  }
  
  // Check unit tools
  const unitTools = fs.readdirSync(unitToolsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const toolDir of unitTools) {
    const pagePath = path.join(unitToolsDir, toolDir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      const componentName = toolDir.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('');
      
      const componentPath = path.join(__dirname, '..', 'src', 'components', 'converters', 'unit', `${componentName}.tsx`);
      
      if (fs.existsSync(componentPath) && checkComponentExport(componentPath)) {
        if (fixImportInPage(pagePath, componentName)) {
          fixedCount++;
        }
      }
    }
  }
  
  console.log(`\n✨ Import fixing completed!`);
  console.log(`📊 Total imports fixed: ${fixedCount}`);
}

fixAllImports();
