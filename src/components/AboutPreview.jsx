import about from "../assets/download.webp";
import { Link } from "react-router-dom";

export default function AboutPreview() {
  return (
    <section className="py-20 bg-[#F1E3D3] border-y-8 border-amber-50">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE - TEXT */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-6 text-[#8B4B62]">
            Our Philosophy
          </h2>

          <p className="max-w-3xl mx-auto lg:mx-0 text-[#2E2E2E] text-lg leading-relaxed">
            Stitch & Style isn’t just about clothes — it’s about confidence,
            creativity, and comfort. Each design reflects the elegance and
            individuality of every customer we serve.
          </p>

          <Link to="/About">
            <button className="mt-10 bg-[#C97C7C] text-white px-8 py-3 rounded-full hover:bg-[#E8AEB7] transition">
              Learn More
            </button>
          </Link>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="flex justify-center">
          <img
            src={about}
            alt="About Stitch & Style"
            className="rounded-2xl shadow-lg w-full max-w-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
