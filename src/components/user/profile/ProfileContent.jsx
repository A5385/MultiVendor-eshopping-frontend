/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import ProfileImage from "./ProfileImage";

import { AiOutlineCamera, AiOutlineKey } from "react-icons/ai";
import { CiMail, CiMobile1, CiUser } from "react-icons/ci";

import InputField from "../../../components/items/InputField";
import {
  AllOrders,
  AllRefundOrders,
  TrackOrder,
  Address,
  PaymentMethod,
  ChangePassword,
} from "./content";

import { updateUserInformation } from "../../../redux/actions/user";
import { updateUserAddress } from "../../../redux/actions/user";
import { server } from "../../../server";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);

  const [password, setPassword] = useState(user && user.password);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phone);
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full">
      {/* profile page */}
      {active === 0 && (
        <>
          <div className="flex justify-center  w-full">
            <div className="relative ">
              <ProfileImage
                height="80px"
                width="80px"
                rounded="full"
                style={`object-cover border-[3px] border-[#3ad132]`}
              />

              <div className="w-8 h-8 bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute -bottom-1 -right-1 hover:shadow-md hover:scale-125 duration-200">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera size={20} />
                </label>
              </div>
            </div>
            <br />
            <br />
          </div>
          {/* edit info block */}
          <div className="w-[90%] mx-auto mt-5  bg-white shadow  rounded-md p-8 ">
            {/* form */}
            <form onSubmit={handleSubmit}>
              {/* personal info */}
              <div className="w-full pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <InputField
                  label="Full Name"
                  type="text"
                  id="name"
                  require={true}
                  icon={<CiUser />}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {/* Email */}
                <InputField
                  label="Email address"
                  type="email"
                  id="email"
                  require={true}
                  icon={<CiMail />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Phone */}
                <InputField
                  label="Phone Number"
                  type="number"
                  id="phone"
                  require={true}
                  icon={<CiMobile1 />}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

                {/* Phone */}
                <InputField
                  isPassword={true}
                  label="Password"
                  type="password"
                  id="password"
                  require={true}
                  icon={<AiOutlineKey />}
                  value={password}
                  visible={visible}
                  setVisible={setVisible}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Update"
                required
                className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-md mt-8 cursor-pointer"
              />
            </form>
          </div>
        </>
      )}
      {active === 1 && (
        <div>
          <AllOrders />
        </div>
      )}

      {active === 2 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {active === 4 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {active === 5 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {active === 6 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
