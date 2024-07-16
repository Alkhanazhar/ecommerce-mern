import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchAllProducts = async () => {
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
  return products;
};

export function inrRupee(num) {
  const format = new Intl.NumberFormat("en-In", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
  return format.format(num);
}
