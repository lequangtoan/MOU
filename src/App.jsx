import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import "./App.scss";
import Banner from "./Components/banner/Banner";
import Main from "./Components/main/Main";
import Footer from "./Components/footer/Footer";
import Drawer from "./Components/drawer/Drawer";

function App() {
  return (
    <div>
      <Banner />
      <Main />
      <Footer />
      <Drawer />
    </div>
  );
}

export default App;
