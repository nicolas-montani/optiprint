import Image from "next/image";
import ThreeJsHero from "@/components/ThreeJsHero";
import ImageCarousel from "@/components/image-carousel";
import Timeline from "@/components/timeline";
import LinkedInFeed from "@/components/linkedin-feed";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Three.js */}
      <ThreeJsHero />

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
  );
}