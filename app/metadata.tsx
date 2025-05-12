"use client"

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { translations } from '@/lib/translations'

export function DynamicMetadata() {
  const { language } = useLanguage()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Update document title
    document.title = t.metadata.title

    // Update description meta tag
    const descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t.metadata.description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = t.metadata.description
      document.head.appendChild(meta)
    }

    // Update html lang attribute
    document.documentElement.lang = language
  }, [language, t.metadata, mounted])

  return null
}
