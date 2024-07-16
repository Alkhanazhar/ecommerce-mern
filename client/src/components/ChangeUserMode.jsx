import axios from "axios";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

export const ROLE = {
  Admin: "Admin",
  General: "General",
};

// eslint-disable-next-line react/prop-types
const ChangeUserMode = ({ onClose, name, email, _id, callfunc }) => {
  const [userRole, setUserRole] = useState("");
  const handleUpdate = async () => {
    try {
      const update = await axios.post(
        "/update-user",
        {
          role: userRole,
          userId: _id,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (update.data.success) {
        onClose();
        callfunc();
      } else {
        toast.error(update.data.message);
        console.log("Error updating user");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="w-screen h-screen bg-[#00000033] backdrop-blur fixed flex-center top-0 left-0 bottom-0 right-0">
      <div className="text-center p-4 shadow-2xl max-w-sm bg-slate-200 rounded-md ">
        <div className=" block ">
          <MdCancel
            className="ml-auto cursor-pointer text-2xl "
            onClick={() => onClose()}
          />
        </div>
        <div>Name : {name}</div>
        <div>Email : {email}</div>
        <div>
          Role :
          <select
            className="outline-none p-3 mx-4"
            value={userRole}
            onChange={(e) => {
              setUserRole(e.target.value);
              console.log(e.target.value);
            }}
          >
            {Object.values(ROLE).map((el, i) => {
              return (
                <option key={i} className="outline-none">
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button
            className="bg-dark px-4 py-2 my-2 w-full"
            onClick={handleUpdate}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserMode;
