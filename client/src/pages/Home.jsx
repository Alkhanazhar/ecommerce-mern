import HomeCategories from "../components/HomeCategories";
import HomeCourosel from "../components/HomeCourosel";

import VerticalCategory from "../components/VerticalCategory";
import Horizontalcategories from "../components/Horizontalcategories";

const Home = () => {
  return (
    <div className="container mx-auto">
      <HomeCategories />
      <HomeCourosel />
      <Horizontalcategories category={"watches"} heading={"Top watches"} />
      <Horizontalcategories category={"trimmers"} heading={"Top trimmers"} />
      <Horizontalcategories category={"mouse"} heading={"Mouse"} />

      <VerticalCategory
        category={"mobiles"}
        heading={"Popular mobiles"}
        hidebutton={true}
      />
      <VerticalCategory
        category={"camera"}
        heading={"Save on Cameras"}
        hidebutton={true}
      />
      <VerticalCategory
        category={"televisions"}
        heading={"televisions"}
        hidebutton={true}
      />
    </div>
  );
};

export default Home;
