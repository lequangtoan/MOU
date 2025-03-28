import { LanguageService } from "../services/languageService";

export const getHrefs = (lang) => {
  return {
    // linkName: lang === "vi" ? "link_vn" : "link_en",
    // khi để # thì sẽ tự động bật components notify lên (chỉ dùng cho các button của banner và main page)

    // buttons for menu
    fanpage: lang === "vi" ? "https://www.facebook.com/womglobalyVN" : "https://www.facebook.com/womglobaly",
    discord: lang === "vi" ? "https://discord.gg/uHAzGnqdwU" : "https://discord.gg/uHAzGnqdwU",
    group: lang === "vi" ? "https://www.facebook.com/groups/worldofmu2025" : "https://www.facebook.com/groups/worldofmuglobal",

    // buttons for drawer
    code: lang === "vi" ? "https://www.facebook.com/worldofmuVN" : "https://www.facebook.com/womglobaly",
    download: lang === "vi" ? "#" : "#",
    community: lang === "vi" ? "#" : "#",
    support: lang === "vi" ? "#" : "#",

    // buttons for banner and main page
    ios: lang === "vi" ? "#" : "#",
    android: lang === "vi" ? "#" : "#",
    apk: lang === "vi" ? "#" : "#",
  };
};
