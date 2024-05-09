import { CgProfile } from "react-icons/cg";
import { useTranslation } from "react-i18next";

export type InputProps = {
  value: string;
  type: string;
  id: string;
  label?: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
  withIcon?: boolean;
};
const InputField = ({
  onChange,
  value,
  label,
  type,
  id,
  placeholder,
  error,
  withIcon,
}: InputProps) => {
  // define props for the input field , we're gonna pass
  // the formik values and onchange handler from the useFormik  
  
  const { i18n } = useTranslation();
  return (
    <div>
      {!withIcon && (
        <>
          <label className="text-gray-900 font-bold text-md">{label}</label>
          <br />
        </>
      )}
      <input
        className={
          withIcon
            ? "bg-[#FAFAFA] indent-10  w-full p-2 border-solid border-2 rounded-xl focus:outline-none focus:border-[#FF4B3C]"
            : "bg-[#FAFAFA] w-full p-2 border-solid border-2 rounded-xl focus:outline-none focus:border-[#FF4B3C]"
        }
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {withIcon && (
        <CgProfile className={`w-[25px] h-[25px] absolute top-[16px] ${ i18n.dir() === "ltr" ? 'left-[27px]' : 'right-[27px]'}`} />
      )}
      <div
        className={
          error
            ? "visible text-[13px] text-[#fd4747]"
            : "invisible text-[13px] text-[#fd4747]"
        }
      >
        {error ? error : "this string to maintain the div place"}
      </div>
    </div>
  );
};

export default InputField;
