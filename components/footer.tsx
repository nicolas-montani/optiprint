export default function Footer() {
  return (
    <footer className="py-20 md:py-24 lg:py-28 bg-gray-50 text-black">
      <div className="container mx-auto px-4">

        <div className="pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kontakt column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Kontakt</h3>
              <div className="space-y-2">
                <p className="font-medium">Optiprint AG</p>
                <p>Auerstrasse 37</p>
                <p>CH-9442 Berneck</p>
                <p>Switzerland</p>
              </div>
            </div>

            {/* Contact & Inquiries column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Kontakt & Anfahrt</h3>
              <div className="space-y-2">
                <p className="font-medium">Kundenanfragen</p>
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
              <h3 className="text-xl font-semibold mb-4">Öffnungszeiten</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Montag – Donnerstag</p>
                </div>
                <div className="flex justify-between pl-4">
                  <p>07.30 – 12.00 Uhr</p>
                </div>
                <div className="flex justify-between pl-4">
                  <p>13.30 – 17.00 Uhr</p>
                </div>
                <div className="flex justify-between mt-4">
                  <p>Freitag</p>
                </div>
                <div className="flex justify-between pl-4">
                  <p>07.30 – 12.00 Uhr</p>
                </div>
                <div className="flex justify-between pl-4">
                  <p>13.30 – 16.30 Uhr</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 pt-8 mt-8 border-t border-gray-200">
          <p>&copy; 2020 Optiprint AG</p>
        </div>
      </div>
    </footer>
  )
}