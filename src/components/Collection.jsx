import React from "react";
import { Link } from "react-router-dom";

import wed_men from "../assets/wed_men.webp";
import party_women from "../assets/party_women.webp";
import handbag from "../assets/ha_bag.jpg";

export default function FashionSection() {
  return (
    <div className="w-full bg-white py-12 px-6 flex flex-col lg:flex-row gap-6">
      {/* Left Large Section (Hero Image) */}
      <div className="flex-1 relative rounded-2xl overflow-hidden shadow-lg bg-[#F2E6DA] p-6 lg:p-8 flex items-center">
        {/* Background Image */}
        <img
          src={party_women}
          alt="Party Wear Model"
          className="absolute inset-0 w-full h-full object-cover opacity-90 lg:opacity-100"
        />
        {/* Text Content */}
        <div className="relative z-10 max-w-sm lg:max-w-md">
          <p className="text-sm tracking-wider text-black uppercase">
            Latest Collection
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#aa2f5c]">
            Party Wear.
          </h1>
         
          <Link to="/Shop">
            <button className="mt-4 px-5 py-2 bg-[#C97C7C] text-white rounded-xl text-sm md:text-base">
              Shop Collection →
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side (Two Cards) */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Wedding Wear Card */}
        <div className="rounded-2xl shadow-lg bg-[#F2E6DA] p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden">
          <div className="z-10 flex-1">
            <p className="text-sm uppercase text-gray-600 tracking-wide">Latest Collection</p>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 text-[#893654]">Wedding Wear.</h2>
            <Link to="/Shop">
              <button className="mt-4 px-4 py-2 bg-[#C97C7C] text-white rounded-xl text-sm md:text-base">
                Shop Collection →
              </button>
            </Link>
          </div>
          <img
            src={wed_men}
            alt="Men's Wedding"
            className="w-full lg:w-52 h-48 lg:h-full object-cover mt-4 lg:mt-0 rounded-lg"
          />
        </div>

        {/* Handbag Card */}
        <div className="rounded-2xl shadow-lg bg-[#F2E6DA] p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden">
          <div className="z-10 flex-1">
            <p className="text-sm uppercase text-gray-600 tracking-wide">Winter Essentials</p>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 text-[#893654]">Embroidered Handbag</h2>
            <Link to="/Shop">
              <button className="mt-4 px-4 py-2 bg-[#C97C7C] text-white rounded-xl text-sm md:text-base">
                Shop Now →
              </button>
            </Link>
          </div>
          <img
            src={handbag}
            alt="Handbag"
            className="w-full lg:w-52 h-48 lg:h-full object-cover mt-4 lg:mt-0 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
