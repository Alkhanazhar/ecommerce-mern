import { Link, useLocation, useParams } from "react-router-dom";
import { categories } from "../helpers/Categories";
// import VerticalCategory from "../components/VerticalCategory";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import VerticalCategory from "../components/VerticalCategory";
import { toast } from "react-toastify";
import { inrRupee } from "../helpers/hooks";
import Context from "../context/Context";

const Category = () => {
  const { categoryName } = useParams();
  const [data, setData] = useState([]);
  const [sortBy, setSortby] = useState("");
  const [selectCategory, setSelectCategory] = useState({});
  const [filterCategory, setFilterCategory] = useState([]);
  const location = useLocation();
  console.log(location);
  const urlSearch = new URLSearchParams(location.search);
  const urlArray = urlSearch.getAll("category");
  console.log(urlArray);
  const { countCartItems } = useContext(Context);

  const handleCheck = (e) => {
    const { value, checked } = e.target;
    setSortby(value);
    setSelectCategory((category) => {
      return {
        ...category,
        [value]: checked,
      };
    });
  };

  const handleChangeSortBy = (e) => {
    const { value } = e.target;
    setSortby(value);
    if (value == "asc") {
      setData((prev) => prev.sort((a, b) => a.price - b.price));
    }
    if (value == "dsc") {
      setData((prev) => prev.sort((a, b) => b.price - a.price));
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.post("/filter-category", {
        category: filterCategory,
      });
      setData(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const arr = Object.keys(selectCategory)
      .map((cat) => {
        // console.log(cat);
        if (selectCategory[cat]) {
          return cat;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategory(arr);
  }, [selectCategory]);

  useEffect(() => {}, [sortBy]);

  useEffect(() => {
    fetchData();
  }, [filterCategory]);
  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-12">
        <div className="lg:col-span-2 shadow-xl md:col-span-3 ">
          {/* {left side} */}
          <div className="p-4  w-full bg-slate-300 h-[calc(100vh-40px)] ">
            <form className=" text-sm font-bold flex flex-col gap-2 py-2">
              <h2 className="w-full text-slate-600 font-bold text-xl">
                Sort By
              </h2>
              <hr />
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  checked={sortBy == "asc"}
                  onChange={handleChangeSortBy}
                />
                <label>Price - low to high</label>
              </div>{" "}
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="sortBy"
                  value={"dsc"}
                  checked={sortBy == "dsc"}
                  onChange={handleChangeSortBy}
                />
                <label>Price - high to low </label>
              </div>
              <h2 className="w-full text-slate-600 font-bold text-xl">
                Category By
              </h2>
              <hr />
              {categories.map((category, i) => {
                return (
                  <div className="flex items-center gap-4" key={i}>
                    <input
                      type="checkbox"
                      id={category?.value}
                      name={category.label}
                      value={category.value}
                      onChange={(e) => handleCheck(e)}
                    />
                    <label htmlFor={category?.value}>{category?.label}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        <div className="p-4 lg:col-span-10 md:col-span-9 bg-slate-200">
          {/* {main} */}
          <div className="flex flex-wrap ">
            {!filterCategory.length > 0 ? (
              <VerticalCategory
                className={"flex flex-wrap "}
                category={categoryName}
                heading={categoryName}
              />
            ) : (
              <div className="overflow-scroll min-h-[90vh] max-h-96 mt-8">
                <p className="text-center mb-4 font-medium text-xl">
                  search result : {data.length}
                </p>

                <div className="flex flex-wrap mx-auto gap-4 ">
                  {data &&
                    data?.map((product) => {
                      return (
                        <Link
                          to={"/products/" + product?._id}
                          key={product?._id}
                          className="min-w-[450px]  flex flex-col md:flex-row mx-auto lg:mx-auto  gap-2 p-2 border rounded-xl m max-w-[300px] h-fit md:max-w-[350px] h-42 bg-white shadow-lg  "
                        >
                          <div className="h-fit rounded-xl w-full my-4 ">
                            <img
                              src={product?.productImage[0]}
                              className=" md:h-32 h-fit mx-auto hover-animate mix-blend-multiply min-w-36 w-36 aspect-square"
                            />
                          </div>
                          <div className="bg-slate-200 rounded-xl text-center px-2">
                            <h2 className="font-bold text-lg m-2 line-clamp-1">
                              {product?.productName}
                            </h2>
                            <p className="text-slate-500 capitalize px-1 ">
                              {product?.category}
                            </p>
                            <div className="flex text-[1.1rem] gap-2 font-bold mx-auto w-fit">
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
                                      Authorization:
                                        localStorage.getItem("token"),
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
