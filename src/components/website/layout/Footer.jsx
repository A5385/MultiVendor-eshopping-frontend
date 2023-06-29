import logo from "../../../assets/Ebtkar 2022 V3.0-01.png";
import SocialMediaIconSection from "../socialMediaIcons/SocialMediaIconSection";
import FooterLinkColumn from "../../../components/website/footerLinkColumn/FooterLinkColumn";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../../static/data";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white ">
      {/* subscribe section */}
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-blue-700 py-7">
        {/* Subscribe */}
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-teal-300">Subscribe</span> us for get news
          <br /> events and offers
        </h1>
        {/* enter your email */}
        <div>
          {/* input email */}
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-blue-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          {/* button */}
          <button className="bg-teal-300  hover:bg-black duration-300 px-5 py-2.5 rounded-md text-black hover:text-white md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
      {/* footer section */}
      <div className="grid grid-col-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        {/* logo column */}
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          {/* logo */}
          <img
            src={logo}
            alt="logo"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <br />
          {/* Slogan */}
          <p>The home and elements needed to create beautiful </p>
          {/* social media icons */}
          <SocialMediaIconSection />
        </ul>
        {/* company column */}
        <FooterLinkColumn title="Company" links={footerProductLinks} />
        {/* shop column */}
        <FooterLinkColumn title="Shop" links={footercompanyLinks} />
        {/* Support column */}
        <FooterLinkColumn title="Support" links={footerSupportLinks} />
      </div>
      {/*  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2020 Ebtkar.Net . All rights reserved.</span>
        <span>Terms - Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
