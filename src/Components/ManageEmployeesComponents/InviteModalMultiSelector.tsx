import Multiselect from "multiselect-react-dropdown";
import { option } from "./InviteModal";

type Iprops = {
  options: option[];
  valueToDisplay: string;
  label: string;
  showCheckBox?: boolean;
  isSingleSelect?:boolean;
  placeHolder: string;
  setFormikOnSelect:(selectedOptions:option[])=>void
  setFormikOnRemove:(selectedOptions:option[])=>void
  error?: string;
  selectedValues?: option[] | undefined
};

const InviteModalMultiSelector = ({
  options,
  valueToDisplay,
  label,
  showCheckBox,
  isSingleSelect,
  placeHolder,
  setFormikOnSelect,
  setFormikOnRemove,
  error,
  selectedValues
}: Iprops) => {
  return (
    <>
      <label htmlFor="Types" className="text-gray-900 font-bold text-md">
        {label}
      </label>
      <br />
      <Multiselect
        options={options}
        selectedValues={selectedValues ?? []}
        displayValue={valueToDisplay}
        showCheckbox={showCheckBox}
        singleSelect={isSingleSelect}
        showArrow={true}
        placeholder={placeHolder}
        className=" border-solid border-2 rounded-xl bg-[#FAFAFA] focus:outline-none focus:border-[#FF4B3C] cursor-pointer"
        style={{
          chips: {
            background: "#FF4B3C",
            color: "white",
          },
          optionContainer: {
            // To change css for option container
            background: "#FAFAFA",
          },
          option: {
            // To change css for dropdown options
            color: "black",
          },
        }}
        onSelect={(selectedOptions: option[])=>{
            setFormikOnSelect(selectedOptions);
        }}
        onRemove={(selectedOptions: option[])=>{
            setFormikOnRemove(selectedOptions);
        }}
      />
      <div
        className={
          error
            ? "visible text-[13px] text-[#fd4747]"
            : "invisible text-[13px] text-[#fd4747]"
        }
      >
        {error ? error : "this string to maintain the div place"}
      </div>
    </>
  );
};

export default InviteModalMultiSelector;
