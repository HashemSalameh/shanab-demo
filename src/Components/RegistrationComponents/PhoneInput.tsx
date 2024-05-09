import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

 type InputProps = {
  value: string;
  id: string;
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
};

const PhoneNumField = ({
  label,
  value,
  onChange,
  error,
}: InputProps) => {
  // const [_value, setValue] = useState<string>("+966");

  return (
    <div>
      <label className="text-gray-900 font-bold text-md">{label}</label>
      <br />

        <div className="flex flex-col bg-[#FAFAFA] p-2 border-solid border-[2px] rounded-xl">
          <PhoneInput
            international={true}
            countryCallingCodeEditable={false}
            defaultCountry="SA"
            value={value}
            onChange={(e) => {
              onChange(e?.toString()?? '');
            }}
            className="bg-[#FAFAFA] w-full h-full rounded-xl text-lg border-none" 
          />
          
        </div>
      
      {error ? (
        <div className="text-[13px] text-[#fd4747] ">{error}</div>
      ) : null}
    </div>
  );
};

export default PhoneNumField;
