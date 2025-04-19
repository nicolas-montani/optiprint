import Image from "next/image"
import ImageCarousel from "@/components/image-carousel"
import Timeline from "@/components/timeline"
import LinkedInFeed from "@/components/linkedin-feed"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row min-h-[90vh] w-full bg-white overflow-hidden">
        <div className="w-full md:w-1/2 flex items-center p-8 md:p-[5%] relative z-10">
          <div className="w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light italic leading-none mb-4 text-black">
              JUBILÄUM/
            </h1>
            <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] mb-8 text-black uppercase">
              OPTIPRINT
            </h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-normal italic text-black mt-8">40 JAHRE</h3>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[60vh] md:h-auto relative overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=600"
            alt="Optiprint PCB Technology"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-24 bg-gray-50">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-base font-semibold tracking-wide mb-4 text-left">FROM THE LEADERSHIP</h2>
            <div className="w-full h-px bg-black mb-10"></div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl leading-tight font-normal mb-10 text-left">
              "Seit 1985 entwickeln wir mit Leidenschaft und Expertise innovative Leiterplattenlösungen – eine
              Erfolgsgeschichte aus der Schweiz. Gemeinsam mit unseren Kunden und Partnern gestalten wir seit vier
              Jahrzehnten die Zukunft der Elektronik. Wir sind stolz auf das, was wir erreicht haben, und blicken mit
              Begeisterung auf die kommenden Herausforderungen."
            </blockquote>
            <p className="text-sm font-semibold tracking-wide text-left">HANS JÖRG, CEO AT OPTIPRINT AG</p>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <ImageCarousel />

      {/* Timeline Section */}
      <Timeline />

      {/* Video Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-200 rounded-lg overflow-hidden aspect-video">
            <Image
              src="/placeholder.svg?height=450&width=800"
              alt="Video placeholder"
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* LinkedIn Section */}
      <LinkedInFeed />

      {/* Footer */}
      <Footer />
    </main>
  )
}
