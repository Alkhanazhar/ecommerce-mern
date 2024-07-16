import axios from "axios";
const url = "https://api.cloudinary.com/v1_1/dhbz08p8u/image/upload";

const ImageUploadCloudinary = async (image) => {
  const formData = new FormData();
  const instance = axios.create();
  formData.append("file", image);
  formData.append("upload_preset", "mern-ecommerce");
  const { data } = await instance.post(url, formData);
  return data;
};

export default ImageUploadCloudinary;
