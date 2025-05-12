"use client"

import { useLanguage } from '@/lib/language-context'
import { translations } from '@/lib/translations'

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="py-20 md:py-24 lg:py-28 bg-gray-50 text-black">
      <div className="container mx-auto px-4">

        <div className="pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t.footer.contact}</h3>
              <div className="space-y-2">
                <p className="font-medium">Optiprint AG</p>
                <p>Auerstrasse 37</p>
                <p>CH-9442 Berneck</p>
                <p>Switzerland</p>
              </div>
            </div>

            {/* Contact & Inquiries column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t.footer.contactAndDirections}</h3>
              <div className="space-y-2">
                <p className="font-medium">{t.footer.customerInquiries}</p>
                <p>T +41 71 747 86 86</p>
                <p>
                  <a href="mailto:sales@optiprint.ch" className="text-blue-700 hover:underline">
                    sales@optiprint.ch
                  </a>
                </p>
                <p>
                  <a href="mailto:info@optiprint.ch" className="text-blue-700 hover:underline">
                    info@optiprint.ch
                  </a>
                </p>
              </div>
            </div>

            {/* Opening Hours column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t.footer.openingHours}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>{t.footer.mondayToThursday}</p>
                </div>
                <div className="flex justify-between pl-4">
                  <p>{t.footer.morningHours}</p>
                </div>
                <div className="flex justify-between pl-4">
                  <p>{t.footer.afternoonHoursRegular}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <p>{t.footer.friday}</p>
                </div>
                <div className="flex justify-between pl-4">
                  <p>{t.footer.morningHours}</p>
                </div>
                <div className="flex justify-between pl-4">
                  <p>{t.footer.afternoonHoursFriday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 pt-8 mt-8 border-t border-gray-200">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
