import { getHrefs } from "../asset/hrefs";

export const LanguageService = {
  translations: {
    en: {
      home: "HOME",
      fanpage: "FANPAGE",
      discord: "DISCORD",
      group: "COMMUNITY",
      message:
        "The link will be updated soon. Please follow our Fanpage for updates.",
      closeButton: "Close",
    },
    vi: {
      home: "TRANG CHỦ",
      fanpage: "FANPAGE",
      discord: "DISCORD",
      group: "HỘI NHÓM",
      message: "Link sẽ được cập nhật sau, vui lòng theo dõi Fanpage.",
      closeButton: "Đóng",
    },
  },

  detectLanguage() {
    const browserLang = navigator.language.split("-")[0];
    return browserLang === "vi" ? "vi" : "en";
  },

  getTranslations() {
    return this.translations[this.detectLanguage()];
  },

  getLinks() {
    const lang = this.detectLanguage();
    return getHrefs(lang);
  },
};
