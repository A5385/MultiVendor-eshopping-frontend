import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import LoginRegistrationTitle from "../user/titles/LoginRegistrationTitle";
import InputField from "../items/InputField";

import UploadAvatar from "../items/UploadAvatar";
import SubmitBtn from "../items/SubmitBtn";
import { AiOutlineKey } from "react-icons/ai";
import { BsMailbox } from "react-icons/bs";
import { CiLocationOn, CiMail, CiMobile1, CiUser } from "react-icons/ci";

const CreateShop = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();

  const [visible, setVisible] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const shopData = {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      zipCode: zipCode,
      email: email,
      password: password,
      file: avatar,
    };

    axios
      .post(`${server}/shop/create-shop`, shopData, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setPhoneNumber();
        setAddress("");
        setZipCode();
        setEmail("");
        setPassword("");
        setAvatar();

        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen w-full md:w-[40%] mx-auto bg-white   p-10  ">
      {/* Header */}
      <div className=" w-full mx-auto sm:max-w-md">
        <LoginRegistrationTitle title="ٌRegister as a seller" />
      </div>

      {/* Form section*/}
      <div className="w-full grid grid-col-1 md:grid-col-2 ">
        {/* Form */}
        <form className="w-full " onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 pt-5 ">
            {/* Shop Name */}
            <InputField
              label="Full Name"
              type="text"
              id="name"
              require={true}
              icon={<CiUser />}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Phone Number */}
            <InputField
              label="Phone Number"
              type="number"
              id="phone"
              require={true}
              icon={<CiMobile1 />}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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

            {/* Address */}
            <InputField
              label="Address"
              type="address"
              id="address"
              require={true}
              icon={<CiLocationOn />}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {/* ZipCode */}
            <InputField
              label="Zip Code"
              type="number"
              id="zipCOde"
              require={true}
              icon={<BsMailbox />}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />

            {/* Password */}
            <InputField
              isPassword={true}
              label="Password"
              id="phone"
              icon={<AiOutlineKey />}
              value={password}
              visible={visible}
              setVisible={setVisible}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <UploadAvatar avatar={avatar} onChange={handleFileInputChange} />
          <SubmitBtn title="Register" />

          <div className={` w-full flex justify-center mt-3`}>
            <h4>Already have an account?</h4>
            <Link to="/login-shop" className="text-blue-600 pl-2">
              Log to your shop
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;
