import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { inrRupee } from "../helpers/hooks";
import { toast } from "react-toastify";
import Context from "../context/Context";

const Search = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const { countCartItems } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const fetchSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/search" + query.search);
      setData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchSearch();
  }, [query]);
  return (
    <div className="container mx-auto my-20">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-4 text-xl">Search results : {data?.length}</div>

          <div className="flex flex-wrap gap-2">
            {data.map((product) => {
              return (
                <Link
                  to={"/products/" + product?._id}
                  key={product?._id}
                  className="w-full flex flex-col md:min-w-[280px] p-2 border rounded-xl max-w-[280px] md:max-w-[320px] h-42 bg-white shadow-lg "
                  onClick={() => window.scroll({ top: 0, scroll: "smooth" })}
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
        </>
      )}
    </div>
  );
};

export default Search;
