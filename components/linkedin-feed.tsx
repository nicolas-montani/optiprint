const linkedInPosts = [
  {
    title: "Neue Technologien für die Elektronik von morgen",
    content:
      "Optiprint investiert in zukunftsweisende Fertigungstechnologien, um die steigenden Anforderungen in der Elektronikbranche zu erfüllen. Erfahren Sie mehr über unsere neuesten Innovationen.",
    date: "25. März 2025",
  },
  {
    title: "Optiprint auf der Swiss Medtech Expo 2025",
    content:
      "Besuchen Sie uns vom 9. bis 10. September auf der Swiss Medtech Expo in Luzern. Wir präsentieren unsere spezialisierten Lösungen für die Medizintechnik.",
    date: "09. Februar 2025",
  },
  {
    title: "40 Jahre Innovation und Qualität",
    content:
      "2025 feiert Optiprint sein 40-jähriges Jubiläum. Erfahren Sie mehr über unsere Erfolgsgeschichte und die Meilensteine, die uns zu dem gemacht haben, was wir heute sind.",
    date: "15. Januar 2025",
  },
]

export default function LinkedInFeed() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#002F63]">Optiprint auf LinkedIn</h2>
        <div className="max-w-4xl mx-auto">
          {linkedInPosts.map((post, index) => (
            <div
              key={index}
              className={`pb-8 mb-8 ${index < linkedInPosts.length - 1 ? "border-b border-gray-200" : ""}`}
            >
              <h3 className="text-xl md:text-2xl font-medium mb-4">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
