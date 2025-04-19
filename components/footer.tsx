const awards = [
  {
    name: "Swiss Technology Award",
    description: "EXCELLENCE IN INNOVATION 2018",
  },
  {
    name: "PCB Design Excellence",
    description: "BEST MANUFACTURER 2020",
  },
  {
    name: "Sustainability Award",
    description: "GREEN MANUFACTURING 2022",
  },
  {
    name: "Quality Excellence",
    description: "ISO CERTIFICATION EXCELLENCE",
  },
]

export default function Footer() {
  return (
    <footer className="py-20 md:py-24 lg:py-28 bg-gray-50 text-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row mb-16 md:mb-20">
          <div className="w-full md:w-2/5 mb-12 md:mb-0 md:pr-12 lg:pr-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
              <span className="font-light italic text-gray-600">Awards &</span>
              <br />
              <span className="font-bold">Recognition</span>
            </h2>
          </div>

          <div className="w-full md:w-3/5">
            {awards.map((award, index) => (
              <div
                key={index}
                className="py-5 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="text-xl md:text-2xl font-medium mb-2 sm:mb-0">{award.name}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{award.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 pt-8 border-t border-gray-200">
          <p>&copy; 2025 Optiprint AG. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}
