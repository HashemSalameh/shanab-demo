import { useTranslation } from "react-i18next";
import { removeToken } from "../../Redux/AuthSlice/AuthSlice";
import { useAppDispatch } from "../../Redux/hook";

const LogOutButton = () => {
  const dispatch = useAppDispatch();
  const { t} = useTranslation();

  return (
    <div>
      <button
        className="min-h-[50px] min-w-[100px] text-base font-bold tracking-wide text-white bg-[#FF4233] hover:bg-[#F5F5F5] hover:text-[#FF4233] border-[1px] border-[#FF4233] rounded-3xl transition ease-in-out duration-700 delay-75"
        onClick={() => dispatch(removeToken())}
      >
        {t("logOut")}
      </button>
    </div>
  );
};

export default LogOutButton;
