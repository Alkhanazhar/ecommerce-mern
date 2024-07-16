import { BsSearch } from "react-icons/bs";
import { BiCart, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import Context from "../context/Context";

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  // console.log(countCartItems);
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const { count } = useContext(Context);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserDetails(null));
    toast.success("User logged out successfully");
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    navigate("/search?q=" + value);
  };

  return (
    <header className="shadow-sm p-4 fixed top-0 left-0 w-full z-[9999] bg-white">
      <div className="flex justify-between mx-auto container  items-center">
        <div className="  text-xl  flex-center justify-center">
          <Logo />
        </div>

        <div className="md:flex w-2/4 border rounded-l-full rounded-r-full hidden ">
          <input
            type="text"
            placeholder="search your product here"
            className="outline-none px-4 flex-center text-lg  p-1 w-full mx rounded-l-full"
            onChange={(e) => handleSearch(e)}
          />
          <button className="px-4 bg-dark border-none rounded-r-full flex-center text-base font-bold ">
            <BsSearch />
          </button>
        </div>
        <div className="flex-center gap-5 text-3xl">
          <Link to={"/cart"} className="cursor-pointer relative">
            {user && user._id && (
              <>
                <BiCart className="text-4xl" />

                <div className="absolute -top-2 left-5 bg-dark h-5 w-5 flex-center font-bold rounded-full text-sm">
                  {count}
                </div>
              </>
            )}
          </Link>
          <div className="cursor-pointer">
            {user ? (
              <div
                className="flex-center relative w-9 h-9 rounded-full m-0 bg-primary  text-white"
                onClick={() => setMenuDisplay(!menuDisplay)}
              >
                <div className="flex capitalize text-xl font-bold">
                  {user && user?.username[0]}
                </div>
                {menuDisplay && (
                  <div className="absolute hidden lg:flex whitespace-nowrap  bg-white border text-primary font-bold top-11 ">
                    {user?.role == "admin" && (
                      <div
                        onClick={() => {
                          setMenuDisplay(!menuDisplay);
                          navigate("/admin-panel");
                        }}
                        className="text-xl hover:bg-slate-200 w-full p-2 "
                      >
                        Admin panel
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <BiUser />
              </div>
            )}
          </div>
          <div className="cursor-pointer flex-center">
            {!user ? (
              <Link
                to={"/login"}
                type="button"
                className="bg-dark px-5 py-2.5 me-2 mb-2 text-sm"
              >
                Login
              </Link>
            ) : (
              <button
                className="bg-dark text-sm px-5 py-2.5 me-2 mb-"
                onClick={handleLogout}
              >
                logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
