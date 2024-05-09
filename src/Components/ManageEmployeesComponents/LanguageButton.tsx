import { useTranslation } from "react-i18next";


const LanguageButton=()=>{
   
    const { t, i18n } = useTranslation();
    const handleLanguageChange = () => {
        if (i18n.language === "en") i18n.changeLanguage("ar");
        else i18n.changeLanguage("en");
      };



    return(
        <div className="flex justify-center">
        <button
        className="text-[#FF4233] font-semibold p-4 hover:bg-[#ffe0e0] rounded-[30px] transform hover:scale-[120%] transition ease-in-out duration-700 delay-75"
        onClick={() => handleLanguageChange()}
      >
        {t("langSwitcherButton")}
      </button>
        </div>
    );
}


export default LanguageButton;