const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

describe('reorganize-static-files', () => {
  it('keeps zh static output while copying english output to the root', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'interconverter-static-'));
    const outDir = path.join(tempRoot, 'out');
    const enDir = path.join(outDir, 'en');
    const zhDir = path.join(outDir, 'zh');

    fs.mkdirSync(path.join(enDir, 'tools'), { recursive: true });
    fs.mkdirSync(path.join(zhDir, 'tools'), { recursive: true });

    fs.writeFileSync(path.join(enDir, 'index.html'), '<html>en home</html>');
    fs.writeFileSync(path.join(enDir, 'tools', 'index.html'), '<html>en tools</html>');
    fs.writeFileSync(path.join(zhDir, 'index.html'), '<html>zh home</html>');
    fs.writeFileSync(path.join(zhDir, 'tools', 'index.html'), '<html>zh tools</html>');

    execFileSync('node', [path.join(process.cwd(), 'scripts/reorganize-static-files.js')], {
      cwd: tempRoot,
      stdio: 'pipe',
    });

    expect(fs.existsSync(path.join(outDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'tools', 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'zh', 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'zh', 'tools', 'index.html'))).toBe(true);
  });
});
