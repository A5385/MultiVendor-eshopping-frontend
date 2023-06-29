import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import styles from "../../styles/styles";
import { server } from "../../server";

import LoginRegistrationTitle from "./titles/LoginRegistrationTitle";
import InputField from "../items/InputField";
import UploadAvatar from "../items/UploadAvatar";
import SubmitBtn from "../items/SubmitBtn";

import {
  AiOutlineKey,
  AiOutlineMail,
  AiOutlineMobile,
  AiOutlineUser,
} from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const userData = {
      file: avatar,
      name: name,
      email: email,
      phone: phone,
      password: password,
    };

    axios
      .post(`${server}/user/reg`, userData, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPhone();
        setPassword("");
        setAvatar();
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-1 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Title */}
        <LoginRegistrationTitle title="Register a new user" />
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="gb-white py-8 mx-4 shadow sm:rounded-lg sm:px-10">
          {/* Registration Form */}
          <form className="space-y-6 " onSubmit={handleSubmit}>
            {/* Full Name */}
            <InputField
              label="Full Name"
              type="text"
              id="name"
              require={true}
              icon={<AiOutlineUser />}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}
            <InputField
              label="Email address"
              type="email"
              id="email"
              require={true}
              icon={<AiOutlineMail />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/*  Phone Number */}
            <InputField
              label="Phone Number"
              type="number"
              id="phone"
              require={true}
              icon={<AiOutlineMobile />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

            {/* avatar */}
            <div className={`${styles.noramlFlex} justify-between `}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password ?
                </a>
              </div>
            </div>

            <UploadAvatar avatar={avatar} onChange={handleFileInputChange} />
            {/*  Registration button*/}
            <SubmitBtn title="Register" />
            {/* Already have an account? */}
            <div className={`${styles.noramlFlex} w-full `}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
