/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import { backend_url } from "../../../server";

const ProfileImage = ({ height, width, rounded, style }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <img
      src={`${backend_url}${user.avatar}`}
      className={`h-[${height}] w-[${width}] rounded-${rounded} ${style}`}
      alt="profile-pic"
    />
  );
};

export default ProfileImage;
