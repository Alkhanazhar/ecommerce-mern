import axios from "axios";
import { useEffect, useState } from "react";
import { inrRupee } from "../helpers/hooks";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dummyArr = new Array(8).fill(null);
  const cartItems = () => {
    setLoading(true);
    axios
      .get("/cart-user", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setData(res.data.data);
      });
    setLoading(false);
  };

  //increase qty
  const increaseQty = async (id, qty) => {
    try {
      const { data } = await axios.post(
        "/edit-cart-user",
        { _id: id, quantity: qty + 1 },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (data.success) {
        cartItems();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.post(
        "/delete-cart-user",
        { _id: id },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (data.success) {
        cartItems();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    cartItems();
  }, []);
  const quantity = data?.reduce((a, c) => a + c.quantity, 0);
  return (
    <main className="my-20">
      <div className="container mx-auto">
        <div className="text-center text-lg ">
          {data.length == 0 && !loading && (
            <div className="bg-slate-300 py-5">no data</div>
          )}
        </div>
        <div className="grid grid-cols-12 justify-between gap-4">
          <div className="w-full max-w-4xl col-span-8">
            {loading ? (
              dummyArr.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="bg-slate-200 animate-pulse h-32 my-2 border border-slate-200 "
                  ></div>
                );
              })
            ) : (
              <div>
                {data && data?.length > 0 && (
                  <div className="relative">
                    {data?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="bg-slate-100 flex my-3  relative"
                        >
                          <div className="w-28 h-full bg-slate-200 p-2">
                            <img
                              src={item?.productId?.productImage[0]}
                              alt=""
                              className="object-contain mix-blend-multiply h-36"
                            />
                          </div>
                          <div className="p-3">
                            <h2 className="text-xl font-bold">
                              {item?.productId?.productName}
                            </h2>{" "}
                            <h3 className="text-base text-slate-500 font-medium">
                              {item?.productId?.category}
                            </h3>{" "}
                            <h3 className="text-xl text-slate-800 font-medium">
                              {inrRupee(item?.productId?.price)}
                            </h3>
                            <div className="flex items-center gap-2">
                              <button className="flex-center w-4 h-4 bg-dark ">
                                -
                              </button>
                              <div> {item?.quantity}</div>
                              <button
                                className="flex-center w-4 h-4 bg-dark "
                                onClick={() =>
                                  increaseQty(item._id, item?.quantity)
                                }
                              >
                                +
                              </button>
                              <button
                                className="absolute top-2 right-2 text-primary "
                                onClick={() => deleteProduct(item?._id)}
                              >
                                <MdDelete className="text-2xl" />
                                {/* delete */}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="col-span-4 my-4 bg-slate-300 h-fit border">
            {loading ? (
              <div className="bg-slate-200 animate-pulse h-32 my-2 border border-slate-200 max-w-sm">
                <div>total</div>
              </div>
            ) : (
              <div>
                <p className="bg-primary text-white p-2 text-xl font-bold ">
                  Summary
                </p>
                <p className="font-medium flex justify-between px-4 items-center my-2 text-xl text-slate-600">
                  quantity : <div>{quantity}</div>
                </p>
                <p className="font-medium text-slate-700 text-xl flex justify-between px-4 items-center">
                  Total :{" "}
                  <div>
                    {inrRupee(
                      data?.reduce(
                        (a, c) => a + c?.quantity * c?.productId?.price,
                        0
                      )
                    )}
                  </div>
                </p>
                <div className="bg-blue-600 p-2 w-full text-xl mt-4 text-white text-center hover:bg-blue-500 duration-150 transition-all cursor-pointer">
                  Payment
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
