import React from "react";
import { Link } from "react-router-dom";

import wed_men from "../assets/wed2.webp"
import party_women from "../assets/women_p.webp"
import handbag from "../assets/ha_bag.jpg"



export default function FashionSection() {
  return (
    <div className="w-full bg-white py-12 px-6 flex flex-col lg:flex-row gap-6">
      {/* Left Large Section */}
      <div className="flex-1 relative rounded-2xl overflow-hidden shadow-lg bg-[#F2E6DA] p-8 flex items-center">
        <img
          src={party_women}
          alt="Model"
          className="absolute right-0 bottom-0 h-full object-cover opacity-90"
        />
        <div className="relative z-10 max-w-sm">
          <p className="text-sm tracking-wider text-gray-600 uppercase">Latest Collection</p>
          <h1 className="text-4xl font-bold mt-2 text-[#893654] ">Party Wear.</h1>
          <p className="text-gray-500 mt-3 text-sm">
            Comfortable, stylish, and modern outfits designed with street fashion inspiration.
          </p>
          <button className="mt-4 px-5 py-2 bg-[#C97C7C] text-white rounded-xl text-sm">Shop Collection →</button>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Shoes Card */}
        <div className="rounded-2xl shadow-lg bg-[#F2E6DA] p-8 flex items-center justify-between relative overflow-hidden">
          <div>
            <p className="text-sm uppercase text-gray-600 tracking-wide">Latest Collection</p>
            <h2 className="text-3xl font-bold mt-2 text-[#893654]">Wedding Wear.</h2>
            <button className="mt-4 px-4 py-2 bg-[#C97C7C] text-white rounded-xl text-sm">Shop Collection →</button>
          </div>
          <img
            src={wed_men}
            alt="men's wedding "
            className="w-50 h-full object-cover absolute right-0 top-0"
          />
        </div>

        {/* Woolen Hat Card */}
        <div className="rounded-2xl shadow-lg bg-[#F2E6DA] p-8 flex items-center justify-between relative overflow-hidden">
          <div>
            <p className="text-sm uppercase text-gray-600 tracking-wide">Winter Essentials</p>
            <h2 className="text-3xl font-bold mt-2 text-[#893654]">Embroided Handbag</h2>
            <Link to="/Cart"><button className="mt-4 px-4 py-2 bg-[#C97C7C] text-white rounded-xl text-sm">Shop Now →</button></Link>
          </div>
          <img
            src={handbag}
            alt="handbag"
            className="w-50 object-cover  absolute right-0 top-0 h-full"
          />
        </div>
      </div>
    </div>
  );
}