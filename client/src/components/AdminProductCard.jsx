/* eslint-disable react/prop-types */

import { useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import EditProduct from "./EditProduct";
import { inrRupee } from "../helpers/hooks";

const AdminProductCard = ({ item, fetchAllProducts }) => {
  const [editPage, setEditPage] = useState(false);
  return (
    <div className="bg-white border p-2 px-4 w-64  shadow-sm hover:shadow-lg duration-100 transition-all relative">
      <img
        src={item?.productImage[0]}
        alt={item?.productName}
        className="aspect-square w-40 h-40 object-contain mx-auto"
      />
      <h1 className="text-slate-700 text-xl font-bold line-clamp-1  bg-slate-50 my-4">
        {item?.productName}
      </h1>{" "}
      <h1 className="text-slate-700  bg-slate-50 line-clamp-3 text-clip overflow-hidden">
        {item?.description}
      </h1>
      <h1 className="text-slate-700 font-semibold text-xl my-3 bg-slate-50 ">
        {inrRupee(item?.price)}
      </h1>
      <div>
        <BiSolidMessageSquareEdit
          className="hover:text-slate-400 absolute top-1 right-1 cursor-pointer text-2xl mr-auto"
          onClick={() => setEditPage(true)}
        />
      </div>
      {editPage && (
        <EditProduct
          item={item}
          onClose={() => setEditPage(false)}
          fetchAllProducts={fetchAllProducts}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
