import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="py-16 text-center border-amber-50 border-y-8  ">
      <h2 className="text-3xl font-semibold mb-4 text-[#C97C7C]">
        Ready to design your dream outfit?
      </h2>
      <p className="text-gray-600 mb-8">
        Start customizing your look today and express your personal style.
      </p>
      <Link to='/Customize'><button className="bg-[#C97C7C] text-amber-100 px-10 py-3 rounded-full hover:bg-[#C38D94] transition">
        Customize Now
      </button></Link>
    </section>
  );
}
