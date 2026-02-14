import aboutImg from "../assets/2.jpg";
import team1 from "../assets/team2.jpg";
import team2 from "../assets/team3.jpg";
import team3 from "../assets/team4.jpg";
import team4 from "../assets/team.jpg";

import { Link } from "react-router-dom";

export default function About() {
  const teamMembers = [
    {
      name: "Group leader",
      role: "Frontend Developer",
      img: team1,
    },
    {
      name: "Group Member 2",
      role: "Backend & API Developer",
      img: team3,
    },
    {
      name: "Group Member 3",
      role: "UI / UX Designer",
      img: team2,
    },
    
    {
      name: "Group Member 4",
      role: "UI/UX Desiner & Thesis Writer",
      img: team4,
    },
  ];

  return (
    <section className="bg-[#FFF8F0]">
      {/* Hero / Philosophy Section */}
      <div className="flex flex-col md:flex-row items-center py-20 px-6 md:px-20 gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6 text-[#C97C7C]">
            Our Philosophy
          </h2>
          <p className="text-[#2E2E2E] text-lg leading-relaxed mb-6">
            Stitch & Style isn’t just about clothes — it’s about confidence,
            creativity, and comfort. Each design reflects the elegance and
            individuality of every customer we serve.
          </p>
          <Link to="/shop">
            <button className="bg-[#C97C7C] text-white px-8 py-3 rounded-full hover:bg-[#b05d5d] transition">
              Explore Collection
            </button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src={aboutImg}
            alt="About Stitch & Style"
            className="rounded-2xl w-full object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 px-6 md:px-20 bg-[#FAF7F2] text-center">
        <h2 className="text-4xl font-bold mb-6 text-[#C97C7C]">Our Story</h2>
        <p className="max-w-3xl mx-auto text-[#2E2E2E] text-lg leading-relaxed">
          Founded with love for fashion, Stitch & Style has been crafting bespoke
          and ready-made outfits for every occasion. Every stitch tells a story —
          and every customer is part of ours.
        </p>
      </div>

      {/* Team Section */}
      <div className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold mb-10 text-[#C97C7C]">
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <img
                src={member.img}
                alt={member.name}
                className="rounded-xl w-full h-90 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-[#2E2E2E]">
                {member.name}
              </h3>
              <p className="text-[#6B6B6B] mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="py-20 px-6 md:px-20 bg-[#FAF7F2] text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#C97C7C]">
          Ready to Style Your Look?
        </h2>
        <p className="text-[#2E2E2E] mb-6 max-w-2xl mx-auto">
          Browse our curated collections or create your own custom design.
          Your perfect style awaits.
        </p>
        <Link to="/shop">
          <button className="bg-[#C97C7C] text-white px-8 py-3 rounded-full hover:bg-[#b05d5d] transition">
            Visit Shop
          </button>
        </Link>
      </div>
    </section>
  );
}
