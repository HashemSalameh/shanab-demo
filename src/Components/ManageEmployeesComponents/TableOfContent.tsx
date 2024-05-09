import { BiCaretDown } from "react-icons/bi";
import { useAppSelector } from "../../Redux/hook";
import { useState } from "react";
import InviteModal from "./InviteModal";
import PaginationIcons from "./PaginationIcons";
import { useTranslation } from "react-i18next";

const TableOfContent = () => {
  const { t } = useTranslation();

  const [id, setId] = useState<number | undefined>();

  const handleClick = (id?: number) => {
    setId(id);
  };

  const employees = useAppSelector((state) => state.Employees.data);
  return (
    <>
      <table className="w-full">
        <th className="flex justify-around items-center flex-wrap text-[#a5a5a5] min-h-[50px] border-2 rounded-xl mb-2">
          <td className="w-[15%]">{t("Name")}</td>
          <td className="w-[30%]">{t("Email")}</td>
          <td className="w-[25%]">{t("Roles")}</td>
          <td className="w-[10%]">{t("Status")}</td>
          <td className="w-[10%]">{t("Action")}</td>
        </th>
        {
        employees?.map((element,index) => (
          <tr key={index} className="flex justify-around items-center flex-wrap font-bold min-h-[50px] border-2 rounded-xl mb-2">
            <td className="flex justify-center w-[15%]">
              {element.fullNameEn}
            </td>
            <td className="flex justify-center w-[30%]">{element.email}</td>
            <td className="flex justify-center w-[25%]">
              {element.roles.map((role) => role.name).join(", ")}
            </td>
            <td
              className={`flex justify-center w-[10%] ${
                element.accepted === true ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {element.accepted ? t("accepted") : t("pending")}
            </td>
            <td className="flex justify-center items-center w-[10%]">
              <div className="text-center pr-1 rounded-2xl hover:bg-slate-100 transition ease-in-out duration-700 delay-75 transform hover:scale-[115%]">
                {t("update")}
              </div>
              <button
                onClick={() => handleClick(element.id)}
                className="flex justify-center items-center w-[30px] h-[30px] rounded-2xl hover:bg-slate-300 cursor-pointer transform hover:scale-[120%] transition ease-in-out duration-700 delay-75"
              >
                <BiCaretDown />
              </button>
            </td>
          </tr>
        ))
        }

        {id && (
          <InviteModal
            onClose={() => handleClick()}
            employeeToUpdate={employees.find((x) => x.id === id)}
          />
        )}
        <div className="flex justify-center w-full">
          <PaginationIcons />
        </div>
      </table>
    </>
  );
};

export default TableOfContent;
