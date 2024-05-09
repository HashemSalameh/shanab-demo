import { useState } from "react";
import InviteModal from "./InviteModal";
import { useTranslation } from "react-i18next";


const InviteButton = () => {
  const { t } = useTranslation();

  const [isClicked, setIsClicked ]=useState<boolean>(false);

  const handleClick=()=>{
    setIsClicked(!isClicked)
  }
  
  return (
    <>
    <div>
      <button className="min-h-[50px] min-w-[100px] text-base font-bold tracking-wide text-white bg-[#FF4233] hover:bg-[#F5F5F5] hover:text-[#FF4233] border-[1px] border-[#FF4233] rounded-3xl transition ease-in-out duration-700 delay-75"
          onClick={handleClick}
      >
        {t("invite")}
      </button>
    </div>
    {
      isClicked && <InviteModal onClose={handleClick}/>
    }
    </>
  );
};

export default InviteButton;
