import Multiselect from "multiselect-react-dropdown";
import { useTranslation } from "react-i18next";

type Iprops={
    getStatus:(status:string)=> void
}
const InvitationStatus = ({getStatus}:Iprops) => {
  const { t } = useTranslation();

  return (
    <div id="c" className="w-full cursor-pointer">
      <Multiselect
        options={[t("accepted"), t("pending")]}
        isObject={false}
        singleSelect={true}
        displayValue=""
        closeOnSelect={true}
        showArrow={true}
        placeholder={t("invitationStatus")}
        className="w-2/6 max-w-[250px] border-solid border-2 rounded-xl bg-[#FAFAFA] text-white focus:outline-none focus:border-[#FF4B3C]"
        style={{
          chips: {
            background: "#FF4B3C",
          },
          optionContainer: {
            // To change css for option container
            background: "#FAFAFA",
          },
          option: {
            // To change css for dropdown options
            color: "black",
            background: "#fffafa",
          },
        }}
        onSelect={ (selectedStatus: string[]) => {
            getStatus(selectedStatus[0])       
        }}
         onRemove={()=>
            getStatus("")
         }
      />
    </div>
  );
};

export default InvitationStatus;
