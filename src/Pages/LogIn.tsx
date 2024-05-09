import InputField from "../Components/InputField";
import Password from "../Components/Password";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import baseUrl from "./baseUrl";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import {
  setPassword,
  setUserName,
  setToken,
} from "../Redux/AuthSlice/AuthSlice";
import { useState } from "react";


type LogInValues = {
  userName: string;
  password: string;
};
const LogIn = () => {
  const { t, i18n } = useTranslation();

  const [showError, setShowError] = useState<boolean>(false);

  const logInValues: LogInValues = {
    userName: useAppSelector((state) => state.authenticate.userName),
    password: useAppSelector((state) => state.authenticate.password),
  };

  const dispatch = useAppDispatch();

  const handleLanguageChange = () => {
    if (i18n.language === "en") i18n.changeLanguage("ar");
    else i18n.changeLanguage("en");
  };

  const handleError = (field: string): string => {
    if (field === "") {
      return "fieldRequired";
    } else return "";
  };

  const handleSubmit = async (logInValues: LogInValues) => {
    await axios
      .post(baseUrl + "restaurantemployees/login", logInValues)
      .then((res) => { 
        dispatch(setToken(res.data.jwt));
      }).catch((error) => alert(error));
  };

  return (
    <div
      dir={i18n.dir()}
      className="flex items-center justify-center min-h-screen "
    >
      <div
        id="container"
        className="flex flex-col gap-2 w-full max-w-[460px] p-6 rounded-2xl shadow-xl shadow-red-400 border-[1px] bg-[#eeeeee9f]"
      >
        <div className="flex justify-end">
          <button
            className="text-[#FF4233] font-semibold p-4 hover:bg-[#ffe0e0] rounded-[30px] transform hover:scale-[120%] transition ease-in-out duration-700 delay-75"
            onClick={() => handleLanguageChange()}
          >
            {t("langSwitcherButton")}
          </button>
        </div>
        <div className="flex justify-center">
          <img src="./Documents/shanabLogo.svg" />
        </div>
        <div className="text-center text-3xl font-semibold">
          <p>{t("logIn")}</p>
        </div>
        <div className="text-center text-sm pt-2">
          <p>{t("enterEmailAddress")}</p>
        </div>
        <div className="pt-2 px-3 relative">
          <InputField
            value={logInValues.userName}
            type="text"
            id="logInEmail"
            placeholder={t("userName")}
            onChange={(e) => dispatch(setUserName(e))}
            error={showError ? t(handleError(logInValues.userName)) : ""}
            withIcon
          />
        </div>
        <div className="px-3 relative">
          <Password
            id="logInPassword"
            value={logInValues.password}
            placeholder={t("password")}
            onChange={(e) => dispatch(setPassword(e))}
            error={showError ? t(handleError(logInValues.password)) : undefined}
            withIcon
          />
        </div>
        <div className="text-sm text-center pt-[12px]">
          <p>
            {t("cantRememberPass") + " "}
            <Link to="/resetPassword">
              <span className="text-[#FF4233] underline cursor-pointer">
                {t("resetPass")}
              </span>
            </Link>
          </p>
        </div>
        <div className="pt-2 px-4">
          <button
            type="submit"
            onClick={() => {
              setShowError(true);
              handleSubmit(logInValues);
            }}
            className="h-[50px] w-full text-base font-bold tracking-wide text-white bg-[#FF4233] hover:bg-[#F5F5F5] hover:text-[#FF4233] border-[1px] border-[#FF4233] rounded-3xl transition ease-in-out duration-700 delay-75"
          >
            {t("joinShanap")}
          </button>
        </div>
        <div className="pt-2 px-4">
          <Link to="/restaurantRegistration">
            <button className="h-[50px] w-full text-base font-bold tracking-wide text-[#ff4233] bg-[#FAFAFA] hover:bg-[#fbf3f3] hover:border-[1px] rounded-3xl transition ease-in-out duration-700 delay-75">
              {t("dontHaveAccount") + " " + t("signUpInstead")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
