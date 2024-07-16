/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Loading from "./Loading";
import { inrRupee } from "../helpers/hooks";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Context from "../context/Context";

const VerticalCategory = ({
  category,
  heading,
  hidebutton = false,
  className,
}) => {
  const [dataProduct, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { countCartItems } = useContext(Context);
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
      console.log(error);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  if (loading) return <Loading />;

  return (
    <div className={` container mx-auto relative `}>
      <h2 className="font-bold my-2 text-center text-2xl capitalize ">
        {heading}
      </h2>

      <div
        className={`gap-4 flex-center    overflow-scroll transition-all ${className}`}
        ref={scrollElement}
      >
        {hidebutton && (
          <button
            className="bg-white md:block hidden shadow-md p-1 rounded-full mb-8  absolute left-0 top-36 z-[999]"
            onClick={scrollLeft}
          >
            <BiLeftArrow className="" />
          </button>
        )}
        {hidebutton && (
          <button
            className="bg-white md:block hidden shadow-md p-1 rounded-full mr-4 mb-8 absolute right-0 top-36 z-[999]"
            onClick={scrollRight}
          >
            <BiRightArrow className="" />
          </button>
        )}
        {dataProduct?.map((product) => {
          return (
            <Link
              to={"/products/" + product?._id}
              key={product?._id}
              className="w-full flex flex-col md:min-w-[280px] p-2 border rounded-xl max-w-[280px] h-fit md:max-w-[320px] h-42 bg-white shadow-lg "
            >
              <div className="h-fit rounded-xl w-full my-4 ">
                <img
                  src={product?.productImage[0]}
                  className=" md:h-32 h-fit mx-auto hover-animate mix-blend-multiply w-36"
                />
              </div>
              <div className="bg-slate-200 rounded-xl text-center px-2">
                <h2 className="font-bold text-lg m-2 line-clamp-1">
                  {product?.productName}
                </h2>
                <p className="text-slate-500 capitalize px-1 ">
                  {product?.category}
                </p>
                <div className="flex text-[1.1rem] gap-2  font-bold mx-auto w-fit">
                  <p className="px-1 text-red-600">
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
                  className="bg-primary p-2 active:scale-105 duration-150 transition-all hover:bg-red-500 rounded-md text-white w-full mt-4 mb-2 "
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

export default VerticalCategory;
