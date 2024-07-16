/* eslint-disable react/prop-types */
import { MdCancel } from "react-icons/md";
import { LabelledInput } from "../pages/Login";
import { categories } from "../helpers/Categories";
import { toast } from "react-toastify";
import axios from "axios";
import uploadImageCloudinary from "../helpers/ImageUpload";
import { useState } from "react";
import { BiCloudUpload } from "react-icons/bi";

const EditProduct = ({ onClose, item, fetchAllProducts }) => {
  const [productName, setProductName] = useState(item?.productName);
  const [brandName, setBrandName] = useState(item?.brandName);
  const [category, setCategory] = useState(item?.category);
  const [price, setPrice] = useState(item?.price);
  const [productImage, setProductImage] = useState(item?.productImage);
  const [selling, setSelling] = useState(item?.selling);
  const [description, setDescription] = useState(item?.description);
  // eslint-disable-next-line no-unused-vars
  const [uploadImage, setUploadImage] = useState(item?.uploadImage);

  //handle image upload
  const handleImageUpload = async (e) => {
    const files = e.target.files[0];
    setUploadImage(files.name);
    const upload = await uploadImageCloudinary(files);
    setProductImage((prev) => [...prev, upload.url]);
  };
  const handleSubmit = async () => {
    try {
      if (
        !productName ||
        !brandName ||
        !category ||
        !price ||
        !productImage ||
        !selling ||
        !description
      ) {
        toast.error("Please enter all the fields");
      }
      const { data } = await axios.post(
        "/edit-product",
        {
          _id: item._id,
          productName,
          brandName,
          category,
          price,
          productImage,
          selling,
          description,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      
      console.log(data);
      if (data.status) {
        toast.success(data.message);
        fetchAllProducts();
        onClose();
      }
      console.log(data);
      if (data.error) {
        toast.success(data.message);
        onClose();

        // console.log(isAdmin);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-screen h-screen rounded-2xl z-[999] bg-[#00000033] backdrop-blur fixed flex-center top-0 left-0 bottom-0 right-0 ">
      <div className="text-center p-4 shadow-2xl overflow-y-auto bg-slate-200 rounded-md max-w-3xl min-w-[50rem] min-h-[80%] max-h-[80%]">
        <div className=" block ">
          <MdCancel
            className="ml-auto cursor-pointer text-2xl "
            onClick={() => onClose()}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Edit Your product</h1>
        </div>
        <div className="p-2">
          <LabelledInput
            label={"ProductName"}
            placeholder={"Product Name"}
            type={"text"}
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <LabelledInput
            label={"brandName"}
            placeholder={"brand Name"}
            type={"text"}
            value={brandName}
            onChange={(e) => {
              setBrandName(e.target.value);
            }}
          />{" "}
          <label className="font-bold my-1 block">Category</label>
          <select
            className="w-full p-2 font-bold"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={""}>{""}</option>
            {categories.map((category, i) => {
              return (
                <option key={i} value={category.value}>
                  {category.label}
                </option>
              );
            })}
          </select>
          <LabelledInput
            label={"selling"}
            placeholder={"selling"}
            type={"number"}
            value={selling}
            onChange={(e) => {
              setSelling(e.target.value);
            }}
          />{" "}
          <label className="font-bold my-2 block">Description</label>
          <textarea
            className="text-xl font-bold w-full outline-none p-2"
            rows={4}
            value={description}
            placeholder="Enter description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <LabelledInput
            label={"price"}
            placeholder={"price"}
            type={"number"}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />{" "}
          <div className="flex gap-2 my-4">
            {productImage?.length > 0 &&
              productImage.map((image, i) => {
                return (
                  <div key={i} className="relative">
                    <img
                      src={image}
                      alt={image}
                      className="w-44 h-3/4 rounded-lg object-cover aspect-square"
                    />
                    <div className=" block absolute top-2 right-2 text-white">
                      <MdCancel
                        className="ml-auto cursor-pointer text-2xl "
                        onClick={(i) => {
                          const newArr = [...productImage];
                          newArr.splice(i, 1);
                          setProductImage([...newArr]);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="h-44 bg-slate-400 my-2 rounded-lg flex-center">
            <label
              htmlFor="image"
              className="my-2 block font-bold text-3xl text-center flex-center gap-2 "
            >
              <span>
                <BiCloudUpload className="text-5xl" />
              </span>
              product images{" "}
              <input
                type="file"
                name="image"
                id="image"
                className="hidden"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>
          </div>
          <button className="bg-dark p-4 w-full" onClick={handleSubmit}>
            Edit Product{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
