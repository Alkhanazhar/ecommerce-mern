import { useEffect, useState } from "react";

import AdminProductCard from "../components/AdminProductCard";
import axios from "axios";
import UploadProductt from "../components/UploadProductt";

const AllProducts = () => {
  const [UploadProduct, setUpload] = useState(false);

  const [products, setProduct] = useState([]);
  //fetching all products
  const fetchAllProducts = () => {
    axios
      .get("/get-all-products", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        setProduct(response.data.data);
      });
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="bg-secondary  w-[82vw] p-2 py-4 shadow-sm">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-bold text-3xl whitespace-nowrap mx-4">
          All products
        </h2>
        <button
          className="bg-dark px-5 py-2 "
          onClick={() => {
            setUpload(true);
          }}
        >
          add product
        </button>
      </div>
      {UploadProduct && (
        <UploadProductt
          onClose={() => setUpload(false)}
          fetchAllProducts={fetchAllProducts}
        />
      )}
      <div className="flex flex-wrap py-5 gap-4 mx-10 overflow-y-scroll max-h-[calc(100vh-140px)]">
        {products?.length > 0 &&
          products?.map((item, i) => {
            return (
              <AdminProductCard
                item={item}
                key={i + item?.selling}
                i={i}
                fetchAllProducts={fetchAllProducts}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AllProducts;
