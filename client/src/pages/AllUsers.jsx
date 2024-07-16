import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserMode from "../components/ChangeUserMode";

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    role: "",
    _id: "",
  });
  const [changeUserMode, setChangeUserMode] = useState(false);
  const fetchDetails = () => {
    axios
      .get("get-alluser", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const { data } = response;
        setData(data.data);
      });
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div>
      <table className="w-[82vw]">
        <thead className="bg-[#070404] text-white">
          <tr>
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="p-4">
          {data.map((el, i) => {
            return (
              <tr key={el._id} className="border text-center">
                <td>{i + 1}</td>
                <td>{el.username}</td>
                <td>{el.email}</td>
                <td>{el.role}</td>
                <td>{moment(el.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="bg-dark px-4 py-2 "
                    onClick={() => {
                      setEditData(el);
                      setChangeUserMode(true);
                    }}
                  >
                    <MdEdit className="text-xl" />
                  </button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {changeUserMode && (
        <ChangeUserMode
          onClose={() => setChangeUserMode(false)}
          name={editData.username}
          email={editData.email}
          _id={editData._id}
          role={editData.role}
          callfunc={fetchDetails}
        />
      )}
    </div>
  );
};

export default AllUsers;
