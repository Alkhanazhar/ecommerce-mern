import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="grid grid-cols-12 bg-secondary ">
      <aside className="col-span-2 shadow-sm bg-secondary  min-h-[calc(100vh-140px)] border-r hidden lg:block">
        <div className="bg-primary rounded-none text-white text-center py-5 flex-center flex-col gap-2">
          <BiUser className="text-5xl" />
          <div className="font-semibold capitalize text-2xl">
            {" "}
            hello ! {user?.username}
          </div>
          <p className="font-semibold capitalize text-xl">({user?.role})</p>
        </div>
        <div className="flex flex-col font-bold ">
          <Link
            to={"admin-panel/all-users"}
            className="p-4 hover:bg-zinc-800 w-full hover:text-white"
          >
            All users
          </Link>
          <Link
            to={"admin-panel/all-products"}
            className="p-4 hover:bg-zinc-800 w-full hover:text-white "
          >
            All products
          </Link>
        </div>
      </aside>
      <div className="container mx-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
