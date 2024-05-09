import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { PiLockKeyDuotone } from "react-icons/pi";
import { useTranslation } from "react-i18next";

type passwordProps = {
  id: string;
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  withIcon?: boolean;
};

const Password = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  withIcon,
}: passwordProps) => {

  const { i18n } = useTranslation();
  const [showPass, setShowPass] = useState(false);

  return (
    <div>
      {!withIcon && (
        <>
          <label className="text-gray-900 font-bold text-md">{label}</label>
          <br />
        </>
      )}
      <div className="relative">
        <input
          className={
            withIcon
              ? "bg-[#FAFAFA] indent-10 w-full p-2 border-solid border-2 rounded-xl focus:outline-none focus:border-[#FF4B3C]"
              : "bg-[#FAFAFA]  w-full p-2 border-solid border-2 rounded-xl focus:outline-none focus:border-[#FF4B3C]"
          }
          type={showPass ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {withIcon && (
          <PiLockKeyDuotone className={`w-[25px] h-[25px] absolute top-[9px] ${i18n.dir() === "ltr" ? 'left-[15px]' : 'right-[15px]'}`} />
        )}
        {showPass ? (
          <IoMdEye
            onClick={() => setShowPass(!showPass)}
            className= {`w-[25px] h-[25px] absolute top-[10px] ${i18n.dir() === "ltr" ? 'right-[14px]' : 'left-[14px]'} cursor-pointer`}
          />
        ) : (
          <IoMdEyeOff
            onClick={() => setShowPass(!showPass)}
            className={`w-[25px] h-[25px] absolute top-[10px] ${i18n.dir() === "ltr" ? 'right-[14px]' : 'left-[14px]'} cursor-pointer`}
          />
        )}
      </div>
      {error && <div className="text-[13px] text-[#fd4747]">{error}</div>}
    </div>
  );
};

export default Password;
