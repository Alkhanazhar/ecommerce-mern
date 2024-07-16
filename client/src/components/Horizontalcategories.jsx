import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { inrRupee } from "../helpers/hooks";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Context from "../context/Context";

/* eslint-disable react/prop-types */
const HorizontalCategories = ({ category, heading }) => {
  const [dataProduct, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { countCartItems } = useContext(Context);

  const ArrayList = new Array(18).fill(null);
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/get-all-category-products", {
        category: category,
      });
      setData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  useEffect(() => {
    fetchCategoryProducts();
  }, []);
  if (loading)
    return (
      <div className="my-6 container mx-auto relative">
        <h2 className="font-bold text-xl mb-2 ">{heading}</h2>

        <div className="flex gap-4 overflow-scroll" ref={scrollElement}>
          <button
            className="bg-white md:block hidden shadow-md p-1 rounded-full mb-8  absolute left-0 top-24"
            onClick={scrollRight}
          >
            <BiLeftArrow className="" />
          </button>
          <button
            className="bg-white md:block hidden shadow-md p-1 rounded-full mr-4 mb-8 absolute right-0 top-24"
            onClick={scrollLeft}
          >
            <BiRightArrow className="" />
          </button>
          {ArrayList?.map((product) => {
            return (
              <div
                key={product?._id}
                className="w-full grid grid-cols-2 md:min-w-[280px] p-2 border rounded-xl max-w-[280px] md:max-w-[320px] h-42 bg-white shadow-lg "
              >
                <div className="rounded-xl w-full  md:h-36 h-fit hover-animate mix-blend-multiply">
                  {/* <img
                    src={product?.productImage[0]}
                    className=" md:h-36 h-fit hover-animate mix-blend-multiply"
                  /> */}
                </div>
                <div className="bg-slate-200 rounded-xl flex flex-col  justify-between">
                  <h2 className="font-bold text-lg m-2 line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="text-slate-500 capitalize px-1 ">
                    {product?.category}
                  </p>
                  <div className="flex text-xs gap-2 justify-around font-bold">
                    <p className="bg-slate-100 px-1 text-red-600">
                      {inrRupee(product?.price)}
                    </p>
                    <p className="text-slate-500 line-through px-1">
                      {inrRupee(product?.selling)}
                    </p>
                  </div>
                  <button className="bg-primary mx-2 my-2 px-2 active:scale-105 duration-150 transition-all hover:bg-red-500 rounded-md text-white">
                    Add to cart{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  return (
    <div className="my-6 container mx-auto relative">
      <h2 className="font-bold text-xl mb-2">{heading}</h2>

      <div className="flex gap-4 overflow-scroll" ref={scrollElement}>
        <button
          className="bg-white md:block hidden shadow-md p-1 rounded-full mb-8  absolute left-0 top-24"
          onClick={scrollRight}
        >
          <BiLeftArrow className="" />
        </button>
        <button
          className="bg-white md:block hidden shadow-md p-1 rounded-full mr-4 mb-8 absolute right-0 top-24"
          onClick={scrollLeft}
        >
          <BiRightArrow className="" />
        </button>
        {dataProduct?.map((product) => {
          return (
            <Link
              to={"/products/" + product._id}
              key={product?._id}
              className="w-full grid grid-cols-2 md:min-w-[280px] p-2 border rounded-xl max-w-[280px] md:max-w-[320px] h-42 bg-white shadow-md "
            >
              <div className="h-fit rounded-xl w-full ">
                <img
                  src={product?.productImage[0]}
                  className=" md:h-36 h-fit hover-animate mix-blend-multiply"
                />
              </div>
              <div className="bg-slate-200 rounded-xl flex flex-col  justify-between">
                <h2 className="font-bold text-lg m-2 line-clamp-1">
                  {product?.productName}
                </h2>
                <p className="text-slate-500 capitalize px-1 ">
                  {product?.category}
                </p>
                <div className="flex text-xs items-center justify-around font-bold">
                  <p className="text-base px-1 text-red-600">
                    {inrRupee(product?.price)}
                  </p>
                  <p className="text-slate-500 line-through px-1">
                    {inrRupee(product?.selling)}
                  </p>
                </div>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const { data } = await axios.post(
                      "/add-to-cart",
                      {
                        productId: product?._id,
                      },
                      {
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      }
                    );
                    toast.success(data.message);
                    countCartItems();
                  }}
                  className="bg-primary mx-2 my-2 px-2 active:scale-105 duration-150 transition-all hover:bg-red-500 rounded-md text-white"
                >
                  Add to cart{" "}
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCategories;
