import Header from "../../components/website/layout/Header";
import Footer from "../../components/website/layout/Footer";

import Hero from "../../components/website/hero/Hero";
import Categories from "../../components/website/categories/Categories";
import BestDeals from "../../components/website/bestDeals/BestDeals";
import FeaturedProduct from "../../components/website/featuredProduct/FeaturedProduct";
import Events from "../../components/website/events/Events";
import Sponsored from "../../components/website/Sponsored";

const HomePage = () => {
  return (
    <div className="w-full">
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <FeaturedProduct />
      <Events />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
