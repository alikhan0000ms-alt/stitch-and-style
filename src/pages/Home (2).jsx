import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import AboutPreview from "../components/AboutPreview";
import Collection from "../components/Collection"
import CallToAction from "../components/CallToAction";
function Home() {
  return (
    <div className=" bg-[#F2E6DA]  ">
      <HeroSection />
      <FeaturedProducts />
      <AboutPreview />
      <Collection/>
      <CallToAction />
    </div>
   
  );
}
export default Home

