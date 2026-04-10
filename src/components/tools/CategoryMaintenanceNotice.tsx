import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryMaintenanceNoticeProps {
  locale: string;
  title: string;
  description: string;
  note: string;
  reason: string;
}

export function CategoryMaintenanceNotice({
  locale,
  title,
  description,
  note,
  reason,
}: CategoryMaintenanceNoticeProps) {
  const isZh = locale === 'zh';

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-slate-700 to-slate-900 text-white">
          <span className="text-lg font-semibold">{isZh ? '整理中' : 'Review'}</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{title}</h1>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">{description}</p>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '当前状态' : 'Current status'}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">{note}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '为什么会这样' : 'Why it looks this way'}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">{reason}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '当前重点维护范围' : 'Current maintenance focus'}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-gray-600">
            {isZh
              ? '当前公开维护重点放在单位、时间、颜色与汽车参考页面，这些页面会持续补充说明、示例与 FAQ。'
              : 'The public site currently focuses on unit, time, color, and automotive reference pages. Those pages are the ones being actively tightened and reviewed.'}
          </CardContent>
        </Card>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 px-8 py-10 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          {isZh ? '查看当前精选工具，或申请恢复这个分类' : 'Browse the featured tools or request a category review'}
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-gray-600">
          {isZh
            ? '如果这个分类中的某个工具值得重新公开展示，请通过联系页说明你的使用场景、需要的结果形式，以及目前哪里不够清楚。'
            : 'If a tool in this category should return to the featured public surface, use the contact page and describe the workflow, expected output, and where the current guidance falls short.'}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/tools">{isZh ? '查看当前精选工具' : 'View featured tools'}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">{isZh ? '联系支持' : 'Contact support'}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
