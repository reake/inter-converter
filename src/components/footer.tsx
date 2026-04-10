import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = await getLocale();
  const isZh = locale === 'zh';

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="InterConverter"
                width={28}
                height={28}
                className="h-7 w-auto"
              />
              <h3 className="font-bold text-lg">InterConverter</h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isZh
                ? '免费在线转换器和计算器，适用于日常查算与常见工作流。'
                : 'Free online converters and calculators for everyday checks and common workflows.'}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{isZh ? '热门工具' : 'Popular Tools'}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/time/timestamp-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '时间戳转换器' : 'Timestamp Converter'}</Link></li>
              <li><Link href="/time/timezone-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '时区转换器' : 'Time Zone Converter'}</Link></li>
              <li><Link href="/color/hex-to-rgb-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? 'HEX 转 RGB 转换器' : 'HEX to RGB Converter'}</Link></li>
              <li><Link href="/unit/temperature-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '温度转换器' : 'Temperature Converter'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{isZh ? '工具分类' : 'Tool Categories'}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/unit" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '单位' : 'Units'}</Link></li>
              <li><Link href="/time" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '时间' : 'Time'}</Link></li>
              <li><Link href="/color" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '颜色' : 'Color'}</Link></li>
              <li><Link href="/auto" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '汽车' : 'Automotive'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{isZh ? '站点说明' : 'Site Notes'}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isZh
                ? '公开站点优先展示当前重点维护的工具页面，并持续补充说明、示例与使用提示。'
                : 'The public site prioritizes actively maintained tool pages with clearer explanations, examples, and usage notes.'}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{isZh ? '站点信息' : 'Company'}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '关于' : 'About'}</Link></li>
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '隐私' : 'Privacy'}</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '条款' : 'Terms'}</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{isZh ? '联系' : 'Contact'}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} InterConverter. {isZh ? '保留所有权利。' : 'All rights reserved.'}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isZh ? '聚焦更清晰的公开工具页面' : 'Focused on clearer public tool pages'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
