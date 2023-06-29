import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

const SocialMediaIconSection = () => {
  return (
    <div className="flex items-center mt-[15px]">
      <AiFillFacebook
        size={25}
        style={{ marginLeft: "15px", cursor: "pointer" }}
      />
      <AiOutlineTwitter
        size={25}
        style={{ marginLeft: "15px", cursor: "pointer" }}
      />
      <AiFillInstagram
        size={25}
        style={{ marginLeft: "15px", cursor: "pointer" }}
      />
      <AiFillYoutube
        size={25}
        style={{ marginLeft: "15px", cursor: "pointer" }}
      />
    </div>
  );
};

export default SocialMediaIconSection;
