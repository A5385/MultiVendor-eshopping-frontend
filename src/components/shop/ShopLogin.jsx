import { React, useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import LoginRegistrationTitle from "../user/titles/LoginRegistrationTitle";
import InputField from "../items/InputField";
import SubmitBtn from "../items/SubmitBtn";
import { AiOutlineKey, AiOutlineMail } from "react-icons/ai";

const ShopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/shop/login-shop`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/dashboard");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen  bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <LoginRegistrationTitle title="Login to your Shop" />
      </div>
      <div className="mt-8  w-[80%] md:w-full mx-auto sm:max-w-md">
        <div className="gb-white py-8 mx-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
            <SubmitBtn title="Login" />

            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have an shop account?</h4>
              <Link to="/create-shop" className="text-blue-600 pl-2">
                Create Shop
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;
