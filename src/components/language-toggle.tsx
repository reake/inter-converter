"use client"

import { Languages } from "lucide-react"
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'

import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const t = useTranslations('common')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en'
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      title={t('language')}
    >
      <Languages className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">{t('language')}</span>
    </Button>
  )
}
