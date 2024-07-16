/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useState } from "react";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Context from "../context/Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleSubmit = async () => {
    try {
      if (!email || !password) return;
      const { data } = await axios.post("/signin", {
        email,
        password,
      });
      toast.success(data?.message);

      localStorage.setItem("token", data.data);
      await fetchUserDetails();

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <section id="login ">
      <div className="container mx-auto flex-center lg:h-[80vh]">
        <div className="max-w-screen-md min-w-80 mx-auto bg-white border p-4 ">
          <div>
            <BiUser className="bg-dark text-white text-8xl  mx-auto" />
          </div>
          <div>
            <LabelledInput
              label="Email"
              type="text"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <LabelledInput
              label="Password"
              type="password"
              placeholder="Password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-end">
              <Link
                to={"/forgo-password"}
                className="text-sm my-4 cursor-pointer hover:underline transition-all duration-100"
              >
                forgot password
              </Link>
            </div>
            <button
              className="bg-dark p-2 text-sm w-full"
              onClick={handleSubmit}
            >
              Log in
            </button>
          </div>
          <p className="text-sm my-2">
            dont have an account{" "}
            <Link
              to={"/signup"}
              className="text-sm my-4 cursor-pointer underline transition-all duration-100"
            >
              signup
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

export const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
  value,
}) => {
  return (
    <div >
      <label className="px-2 text-lg font-bold my-1 block">{label}</label>
      <div className="bg-slate-100 p-2 flex-center ">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          required
          onChange={onChange}
          className="w-full h-full text-lg outline-none bg-transparent"
        />
      </div>
    </div>
  );
};
