#!/bin/bash

# 提取所有财务工具路径并检查状态
echo "检查所有财务工具页面状态..."
echo "================================"

# 从finance.json提取所有路径
paths=$(grep '"path"' src/data/tools/finance.json | cut -d'"' -f4)

# 计数器
total=0
success=0
failed=0
failed_urls=()

for path in $paths; do
    total=$((total + 1))
    url="http://localhost:3002$path"
    
    # 使用curl检查状态码
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status_code" = "200" ]; then
        echo "✅ $path (200)"
        success=$((success + 1))
    else
        echo "❌ $path ($status_code)"
        failed=$((failed + 1))
        failed_urls+=("$path")
    fi
done

echo "================================"
echo "总计: $total"
echo "成功: $success"
echo "失败: $failed"

if [ $failed -gt 0 ]; then
    echo ""
    echo "失败的页面:"
    for url in "${failed_urls[@]}"; do
        echo "  - $url"
    done
fi
