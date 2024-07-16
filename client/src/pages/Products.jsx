import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { inrRupee } from "../helpers/hooks";
import VerticalCategory from "../components/VerticalCategory";
import { toast } from "react-toastify";
import Context from "../context/Context";

const Products = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { countCartItems } = useContext(Context);

  const imageList = new Array(4).fill(null);
  const [loading, setLoading] = useState(true);
  const [mouseEnterZoom, setMouseEnterZoom] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    category: "",
    price: 0,
    productImage: [],
    selling: 0,
    description: "",
  });

  //fetching all products
  const fetchAllProducts = (productId) => {
    setLoading(true);
    axios.post("/get-product-details", { _id: productId }).then((response) => {
      setProductData(response.data.data);
      setActiveImage(response?.data?.data?.productImage[0]);
      setLoading(false);
    });

    return;
  };

  const handleMouseEnter = (image) => {
    setActiveImage(image);
  };

  const handleMouseEnterZoom = (e) => {
    setMouseEnterZoom(true);
    const { left, top, height, width } = e.target.getBoundingClientRect();
    // console.log(left, top, height, width,e.clientX, e.clientY);
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    console.log(x, y);
    setPosition({ x, y });
  };

  useEffect(() => {
    fetchAllProducts(productId);
  }, [productId]);
  return (
    <div className="container mx-auto p-4 tracking-wide">
      <div className="min-h-[200px] flex gap-4">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 relative">
          <div
            className="w-[400px] bg-slate-200 rounded-lg shadow-md h-[400px] "
            onMouseMove={(e) => handleMouseEnterZoom(e)}
            onMouseLeave={() => setMouseEnterZoom(false)}
          >
            <img
              src={activeImage}
              alt={productData.brandName}
              className="mix-blend-multiply object-scale-down h-full w-full"
            />
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll h-full">
                {imageList.map((item, id) => {
                  return (
                    <div
                      key={id}
                      className="w-20 h-20 bg-slate-300 rounded animate-pulse"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div>
                {productData.productImage.map((item, id) => {
                  return (
                    <div
                      key={id}
                      className="w-20 h-20 cursor-pointer"
                      onMouseEnter={() => handleMouseEnter(item)}
                    >
                      <img
                        src={item}
                        alt={item}
                        className="mix-blend-multiply"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {mouseEnterZoom && (
            <div className="block absolute bg-slate-200 rounded-md -right-[430px] w-[420px] h-[400px] overflow-hidden">
              <div
                className="mix-blend-multiply w-full h-full scale-105"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: `${position.x * 100}% ${
                    position.y * 100
                  }%`,
                }}
              ></div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="rounded-full w-fit bg-primary bg-opacity-90 p-2 font-medium tracking-wider text-white">
            {productData?.brandName}
          </p>{" "}
          <p className="text-3xl bg-opacity-90 font-bold text-zinc-900 my-2">
            {productData?.productName}
          </p>{" "}
          <p className="text-xl capitalize bg-opacity-90 font-bold text-zinc-900">
            {productData?.category}
          </p>
          <div className="flex gap-4">
            <p className="text-xl capitalize bg-opacity-90 font-bold text-zinc-900">
              {inrRupee(productData?.price)}
            </p>{" "}
            <p className="text-xl line-through text-slate-400 capitalize bg-opacity-90  ">
              {inrRupee(productData?.selling)}
            </p>
          </div>
          <div className="flex gap-4 my-2 ">
            <button
              className="border-2 rounded-md px-6 py-2 border-red-600 text-red-600 hover:bg-red-600 font-medium transition-all duration-200 hover:text-white capitalize"
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                const { data } = await axios.post(
                  "/add-to-cart",
                  {
                    productId: productData?._id,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                toast.success(data.message);
                countCartItems();
                navigate("/cart");
              }}
            >
              buy
            </button>{" "}
            <button
              className="border-2 transition-all duration-200 border-red-600 hover:text-red-600 hover:bg-white rounded-md px-6 py-2 bg-red-600 font-medium text-white capitalize"
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                const { data } = await axios.post(
                  "/add-to-cart",
                  {
                    productId: productData?._id,
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
            >
              add to cart
            </button>
          </div>
          {/* descrihption */}
          <div className="my-2">
            <p className="font-bold">Description :</p>
            <p className="w-[26rem] line-clamp-5">{productData?.description}</p>
          </div>
        </div>
      </div>
      <div className="my-16">
        {productData?.category && (
          <VerticalCategory
            category={productData?.category}
            heading={"Recommend Products"}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
