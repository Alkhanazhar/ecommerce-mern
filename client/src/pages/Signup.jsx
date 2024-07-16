import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./Login";
import axios from "axios";
import { toast } from "react-toastify";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      if (password == confirmPassword) {
        const { data } = await axios.post("/signup", {
          username,
          email,
          password,
        });
        toast.success(data.message);
        setEmail("");
        setPassword("");
        navigate("/login");
      } else {
        toast.error("password not equal to confirm password");
        return;
      }
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
              label="Username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
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
            />{" "}
            <LabelledInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Sign Up
            </button>
          </div>
          <p className="text-sm my-2">
            dont have an account{" "}
            <Link
              to={"/login"}
              className="text-sm my-4 cursor-pointer underline transition-all duration-100"
            >
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
