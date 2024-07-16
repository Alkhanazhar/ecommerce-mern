import { useEffect, useState } from "react";
import images1 from "../assets/Untitled design.png";
import images2 from "../assets/Untitled design.webp";
import images3 from "../assets/Untitled design (1).png";
import images4 from "../assets/Beats-Studio-Buds-LE_Amazon_6M_Desktop_1_05._CB594546795_.jpg";
import images5 from "../assets/Untitled design.png";
import images6 from "../assets/Untitled design.webp";
import images7 from "../assets/Untitled design (1).png";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
const HomeCourosel = () => {
  const [imageChange, setImageChange] = useState(1);
  const images = [
    images1,
    images2,
    images3,
    images4,
    images5,
    images6,
    images7,
  ];

  const handleNextImage = () => {
    if (images.length - 1 > imageChange) {
      setImageChange(imageChange + 1);
    } else {
      setImageChange(0);
    }
  };
  const handlePrevImage = () => {
    if (imageChange != 0) {
      setImageChange(imageChange - 1);
    } else {
      setImageChange(images.length - 1);
    }
  };
  useEffect(() => {
    const interval=setInterval(()=>{
        handleNextImage()
    },5000)
    
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageChange]);
  return (
    <div className="container overflow-hidden  w-full h-full relative py-4">
      <div className="md:h-[20rem] w-full bg-slate-200">
        <div className="w-full flex z-[999] justify-between mx-auto items-center md:text-2xl text-xs absolute h-full p-1 md:p-10">
          <button
            className="bg-white shadow-md p-1 rounded-full"
            onClick={handlePrevImage}
          >
            <BiLeftArrow className="" />
          </button>
          <button
            className="bg-white shadow-md p-1 rounded-full mr-4"
            onClick={handleNextImage}
          >
            <BiRightArrow className="" />
          </button>
        </div>
        <div className="flex h-full w-full ">
          {images?.map((image, i) => {
            return (
              <div
                key={i}
                className="w-full h-full min-w-full translate transition-all duration-150"
              >
                <img
                  src={image}
                  className=" w-full h-full  object-cover"
                  style={{ transform: `translateX(-${imageChange * 100}%)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeCourosel;
