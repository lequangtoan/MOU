import { useEffect, useState } from "react";
import { LanguageService } from "../../services/languageService";
import { Paths } from "../../asset/paths";
import { getHrefs } from "../../asset/hrefs";
import ImageWithFallback from "../common/ImageWithFallback";
import VideoWithFallback from "../common/VideoWithFallback";
import LinkWithHandler from "../common/LinkWithHandler";
import Notify from "../common/Notify";
import "./banner.scss";

const Banner = () => {
  const [showIOSAlert, setShowIOSAlert] = useState(false); // Kiểm soát hiển thị thông báo iOS

  // Xử lý khi nhấn vào nút iOS
  const handleIOSClick = (e) => {
    e.preventDefault();
    setShowIOSAlert(true); // Hiển thị thông báo
  };

  const [translations, setTranslations] = useState({}); // Lưu trữ bản dịch
  const [links, setLinks] = useState({}); // Lưu trữ các đường dẫn
  const [imageSet, setImageSet] = useState({}); // Lưu trữ hình ảnh theo ngôn ngữ

  // Lấy ngôn ngữ, bản dịch, đường dẫn và hình ảnh khi component được mount
  useEffect(() => {
    const lang = LanguageService.detectLanguage();
    const langData = LanguageService.getTranslations();
    setTranslations(langData);
    setLinks(getHrefs(lang));

    setImageSet({
      code: lang === "vi" ? Paths.buttons.Code : Paths.buttons.Code_en,
      nvmoi: lang === "vi" ? Paths.text.NVmoi : Paths.text.NVmoi_en,
      text: lang === "vi" ? Paths.text.Text : Paths.text.Text_en,
      ios: lang === "vi" ? Paths.buttons.Ios : Paths.buttons.Ios_en,
      android: lang === "vi" ? Paths.buttons.Android : Paths.buttons.Android_en,
      apk: lang === "vi" ? Paths.buttons.Apk : Paths.buttons.Apk_en,
    });
  }, []);

  return (
    <div className="banner">
      {/* Video nền */}
      <VideoWithFallback
        src={Paths.videos.KV}
        autoPlay
        loop
        muted
        preload="auto"
      />
      <div className="content">
        {/* Menu điều hướng */}
        <div className="nav_menu">
          <div className="nav_menu__logo">
            <ImageWithFallback
              src={Paths.logo.logo}
              alt="Logo"
              loading="lazy"
            />
          </div>
          <div className="nav_menu__menu">
            <ul className="nav_menu__menu__bar">
              <a href="/">
                <li>
                  <ImageWithFallback
                    src={Paths.icons.HOME}
                    alt="Home"
                    loading="lazy"
                  />
                  {translations.home}
                </li>
              </a>
              <a href={links.fanpage} target="_blank" rel="noopener noreferrer">
                <li>
                  <ImageWithFallback
                    src={Paths.icons.FANPAGE}
                    alt="Fanpage"
                    loading="lazy"
                  />
                  {translations.fanpage}
                </li>
              </a>
              <a href={links.discord} target="_blank" rel="noopener noreferrer">
                <li>
                  <ImageWithFallback
                    src={Paths.icons.DISCORD}
                    alt="Discord"
                    loading="lazy"
                  />
                  {translations.discord}
                </li>
              </a>
              <a href={links.group} target="_blank" rel="noopener noreferrer">
                <li>
                  <ImageWithFallback
                    src={Paths.icons.COMMUNITY}
                    alt="Community"
                    loading="lazy"
                  />
                  {translations.group}
                </li>
              </a>
            </ul>
          </div>
        </div>

        {/* Nút Code */}
        <a
          className="code"
          href={links.code}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageWithFallback src={imageSet.code} alt="Code" loading="lazy" />
        </a>

        {/* Hình ảnh và văn bản */}
        <div className="text_icon">
          <ImageWithFallback src={imageSet.nvmoi} alt="NV Mới" loading="lazy" />
        </div>
        <div className="text_Text">
          <ImageWithFallback src={imageSet.text} alt="Text" loading="lazy" />
        </div>

        {/* Các nút tải xuống */}
        <div className="nav_menu__button">
          <ul className="nav_menu__button__bar">
            <LinkWithHandler
              className="ten__hover"
              href={links.ios}
              onClick={handleIOSClick}
              rel="noopener noreferrer"
            >
              <li>
                <ImageWithFallback
                  src={imageSet.ios}
                  alt="iOS"
                  loading="lazy"
                />
              </li>
            </LinkWithHandler>
            <LinkWithHandler
              className="ten__hover"
              href={links.android}
              onClick={handleIOSClick}
              rel="noopener noreferrer"
            >
              <li>
                <ImageWithFallback
                  src={imageSet.android}
                  alt="Android"
                  loading="lazy"
                />
              </li>
            </LinkWithHandler>
            <LinkWithHandler
              className="ten__hover"
              href={links.apk}
              onClick={handleIOSClick}
              rel="noopener noreferrer"
            >
              <li>
                <ImageWithFallback
                  src={imageSet.apk}
                  alt="APK"
                  loading="lazy"
                />
              </li>
            </LinkWithHandler>
          </ul>
        </div>
      </div>

      {/* Thông báo iOS */}
      <Notify
        show={showIOSAlert}
        message={translations.message}
        closeButtonText={translations.closeButton}
        onClose={() => setShowIOSAlert(false)}
      />
    </div>
  );
};

export default Banner;
