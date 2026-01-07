import Link from "next/link";
import Container from "@/components/_core/layout/Container";
import PerspectiveCarousel from "@/components/ui/PerspectiveCarousel";

export default function PreviewSection() {
  const allItems = [
    {
      title: "Flagship Event 1",
      desc: "Experience the thrill of competition with our headline event.",
      tag: "Technical",
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
    },
    {
      title: "Flagship Event 2",
      desc: "Battle the best minds in our elite challenge.",
      tag: "Innovation",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      title: "Flagship Event 3",
      desc: "Showcase innovation and problem-solving under pressure.",
      tag: "Analysis",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    },
    {
      title: "AI Workshop",
      desc: "Hands-on AI & ML workshop with real projects.",
      tag: "Tech",
      image: "https://images.unsplash.com/photo-1581091870627-3a9c8c5c9b6b",
    },
    {
      title: "Cyber Security Lab",
      desc: "Live hacking & defense techniques.",
      tag: "Security",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
    },
    {
      title: "Flagship Event 4",
      desc: "A high-intensity technical showdown for top performers.",
      tag: "System",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      title: "UI/UX Bootcamp",
      desc: "Design systems, Figma & prototyping.",
      tag: "Design",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    },
    {
      title: "Flagship Event 5",
      desc: "Compete, collaborate, and conquer cutting-edge challenges.",
      tag: "Future",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
    },
    {
      title: "Cloud Computing",
      desc: "Deploy, scale, and manage applications on modern cloud platforms.",
      tag: "Cloud",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
    },
    {
      title: "Blockchain & Web3",
      desc: "Build decentralized apps and understand smart contracts.",
      tag: "Web3",
      image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307",
    },
  ];

  return (
    <section className="relative py-28 bg-black overflow-hidden">
      {/* HEADER */}
      <Container>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              Events and <span className="text-red-600">Workshops</span>
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
          </div>

          <Link
            href="/events"
            className="text-sm font-semibold text-red-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            View All →
          </Link>
        </div>
      </Container>

      <PerspectiveCarousel items={allItems} />
    </section>
  );
}
