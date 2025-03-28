import React, { useState, useEffect } from "react";
import { LanguageService } from "../../services/languageService";
import { Paths } from "../../asset/paths";
import { getHrefs } from "../../asset/hrefs";
import ImageWithFallback from "../common/ImageWithFallback";
import "./drawer.scss";

const Drawer = () => {
  // State lưu trữ hình ảnh theo ngôn ngữ
  const [imageSet, setImageSet] = useState({});
  // State lưu trữ các đường dẫn
  const [links, setLinks] = useState({});
  // State kiểm soát hiển thị của Drawer
  const [visible, setVisible] = useState(false);

  // Xác định ngôn ngữ và thiết lập hình ảnh tương ứng
  useEffect(() => {
    const lang = LanguageService.detectLanguage();
    setImageSet({
      btn1: lang === "vi" ? Paths.buttons.Btn1 : Paths.buttons.Btn1_en,
      btn2: lang === "vi" ? Paths.buttons.Btn2 : Paths.buttons.Btn2_en,
      btn3: lang === "vi" ? Paths.buttons.Btn3 : Paths.buttons.Btn3_en,
      btn4: lang === "vi" ? Paths.buttons.Btn4 : Paths.buttons.Btn4_en,
    });
    setLinks(LanguageService.getLinks());
  }, []);

  // Quan sát phần tử chính để kiểm soát hiển thị của Drawer
  useEffect(() => {
    const mainElement = document.querySelector(".Main");
    if (!mainElement) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(mainElement);
    return () => observer.unobserve(mainElement);
  }, []);

  // Hàm cuộn lên đầu trang
  const handleScrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Lấy các đường dẫn
  const hrefs = getHrefs();
  const navButtons = [
    { href: hrefs.code, img: imageSet.btn1, alt: "code" },
    { href: hrefs.download, img: imageSet.btn2, alt: "download" },
    { href: hrefs.community, img: imageSet.btn3, alt: "community" },
    { href: hrefs.support, img: imageSet.btn4, alt: "support" },
  ];

  return (
    <div className={`drawer ${visible ? "visible" : ""}`}>
      {/* Hình nền Drawer */}
      <div className="bg_drawer">
        <ImageWithFallback src={Paths.drawer.drawer} alt="drawer" />
      </div>
      {/* Hình ảnh nổi */}
      <div className={`img ${visible ? "visible" : "hidden"}`}>
        <ImageWithFallback src={Paths.drawer.float_role} alt="float_role" />
      </div>
      {/* Các nút điều hướng */}
      <div className="nav__button">
        <ul className="nav__button__bar">
          {navButtons.map((btn, index) => (
            <a
              key={index}
              className="btn ten__hover"
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>
                <ImageWithFallback src={btn.img} alt={btn.alt} />
              </li>
            </a>
          ))}
        </ul>
      </div>
      {/* Nút cuộn lên đầu trang */}
      <div className="btn__top" onClick={handleScrollToTop}>
        <ImageWithFallback src={Paths.drawer.Top} alt="top" />
      </div>
    </div>
  );
};

export default Drawer;
