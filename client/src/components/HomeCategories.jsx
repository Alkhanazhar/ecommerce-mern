import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const HomeCategories = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState([]);
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/get-all-category");
      setCategory(data.data);
      setLoading(false);
    } catch (error) {
      toast.error("Server error");
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto flex overflow-x-scroll gap-3 ">
      {category?.map((category) => {
        return (
          <Link
            to={"/category/" + category?.category}
            key={category._id}
            className="mx-auto border my-2 px-3"
          >
            <img
              src={category.productImage[0]}
              className="object-contain md:w-32 md:h-32 w-12 h-12 mx-auto hover:scale-110 duration-300"
            />
            <h2 className="text-center my-2 text-xs md:text-lg">{category.category}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default HomeCategories;
