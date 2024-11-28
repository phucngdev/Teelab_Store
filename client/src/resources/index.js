import {
  headerTextEN,
  loginTextEN,
  navigationLabelsEN,
  registerTextEN,
  sloganEN,
} from "./resourceEN";
import {
  headerTextVN,
  loginTextVN,
  navigationLabelsVN,
  registerTextVN,
  sloganVN,
} from "./resourceVN";

export const languageOptions = {
  vi: {
    language: "vi",
    navigate: navigationLabelsVN,
    slogan: sloganVN,
    login: loginTextVN,
    register: registerTextVN,
    header: headerTextVN,
  },
  en: {
    language: "en",
    navigate: navigationLabelsEN,
    slogan: sloganEN,
    login: loginTextEN,
    register: registerTextEN,
    header: headerTextEN,
  },
};
