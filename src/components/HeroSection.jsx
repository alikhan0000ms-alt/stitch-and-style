import img from "../assets/homebanner.avif";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className=" py-20  bg-[#F2E6DA] ">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6">
        
        {/* LEFT TEXT SECTION */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-6xl text-[#C97C7C] font-extrabold mb-4 tracking-wide">
            Stitch & Style
          </h1>

          <p className="text-lg  text-black ">
            Where every stitch tells your story. Discover elegant fashion,
            handcrafted for you.
          </p>

          <Link to="/Shop"><button className="mt-10 bg-[#C97C7C] text-white text-lg px-8 py-3 rounded-full shadow hover:bg-[#e5adb4] hover:text-black transition">
            Explore Collection
          </button></Link>


        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center ">
      <img 
  src={img} 
  alt="Fashion"
  className="rounded-2xl w-full lg:w-[700px] h-full object-cover shadow-2xl shadow-[#C97C7C]"
/>

    <input type="color" />
        </div>

      </div>
    </section>
  );
}
export default HeroSection;
