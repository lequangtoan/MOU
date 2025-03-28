import React from "react";
import { LanguageService } from "../../services/languageService";
import { Paths } from "../../asset/paths";
import ImageWithFallback from "../common/ImageWithFallback";
import "./footer.scss";

const Footer = () => {
  // Detect the current language
  const lang = LanguageService.detectLanguage();
  const isVi = lang === "vi"; // Check if the language is Vietnamese

  return (
    <div className="footer">
      {/* Footer image for PC */}
      <div className="pc">
        <ImageWithFallback
          src={isVi ? Paths.footer.footer : Paths.footer.footer_en}
          alt="Footer"
          loading="lazy"
        />
      </div>
      {/* Footer image for Mobile */}
      <div className="mobile">
        <ImageWithFallback
          src={isVi ? Paths.footer.footer_mb : Paths.footer.footer_mb_en}
          alt="Footer Mobile"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Footer;
