import aboutImg from "../assets/team.jpg";
import team1 from "../assets/team2.jpg";
import team2 from "../assets/team3.jpg";
import team3 from "../assets/team4.jpg";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="bg-[#FFF8F0]">
      {/* Hero / Philosophy Section */}
      <div className="flex flex-col md:flex-row items-center py-20 px-6 md:px-20 gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6 text-[#C97C7C]">Our Philosophy</h2>
          <p className="text-[#2E2E2E] text-lg leading-relaxed mb-6">
            Stitch & Style isn’t just about clothes — it’s about confidence, creativity, and comfort.
            Each design reflects the elegance and individuality of every customer we serve.
          </p>
          <Link to="/Shop">
            <button className="bg-[#C97C7C] text-white px-8 py-3 rounded-full hover:bg-[#b05d5d] hover:text-lg transition">
              Explore Collection
            </button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src={aboutImg}
            alt="About Stitch & Style"
            className="rounded-2xl w-lg h-sm object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 px-6 md:px-20 bg-[#FAF7F2] text-center">
        <h2 className="text-4xl font-bold mb-6 text-[#C97C7C]">Our Story</h2>
        <p className="max-w-3xl mx-auto text-[#2E2E2E] text-lg leading-relaxed">
          Founded with love for fashion, Stitch & Style has been crafting bespoke and ready-made outfits
          for every occasion. We believe in personalizing style while ensuring comfort, quality, and
          timeless elegance. Every stitch tells a story — and every customer is a part of ours.
        </p>
      </div>

      {/* Team Section */}
      <div className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold mb-10 text-[#C97C7C]">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {[team1, team2, team3].map((member, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-[#e8afaf] hover:shadow-md transition">
              <img
                src={member}
                alt={`Team member ${idx + 1}`}
                className="rounded-xl w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-[#2E2E2E]">Member {idx + 1}</h3>
              <p className="text-[#6B6B6B] mt-1">Fashion Designer</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action / Visit Shop */}
      <div className="py-20 px-6 md:px-20 bg-[#FAF7F2] text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#C97C7C]">Ready to Style Your Look?</h2>
        <p className="text-[#2E2E2E] mb-6 max-w-2xl mx-auto">
          Browse our curated collections of ready-made outfits or create your own custom design.
          Your perfect style awaits.
        </p>
        <Link to="/Shop">
          <button className="bg-[#C97C7C] text-white px-8 py-3 rounded-full hover:bg-[#b05d5d] hover:text-lg transition">
            Visit Shop
          </button>
        </Link>
      </div>
    </section>
  );
}
