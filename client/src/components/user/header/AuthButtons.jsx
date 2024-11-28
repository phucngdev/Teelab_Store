import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../providers/LanguageProvider";

const AuthButtons = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <>
      <div className="flex items-center gap-3 ms-3">
        <button
          className="hover:underline hover:underline-offset-8 dark:text-white"
          onClick={() => navigate("/dang-nhap")}
        >
          {language.header.login}
        </button>
        <button
          onClick={() => navigate("/dang-ky")}
          className="hover:text-black hover:bg-transparent px-3 py-1 rounded-full bg-stone-700 text-white border dark:hover:text-white dark:hover:bg-slate-500 border-black"
        >
          {language.header.register}
        </button>
      </div>
    </>
  );
};

export default AuthButtons;
