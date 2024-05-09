import { useEffect, useState } from "react";
import InvitationStatus from "../Components/ManageEmployeesComponents/InvitationStatus";
import InviteButton from "../Components/ManageEmployeesComponents/InviteButton";
import LogOutButton from "../Components/ManageEmployeesComponents/LogOutButton";
import TableOfContent from "../Components/ManageEmployeesComponents/TableOfContent";
import { useEmployees } from "../data/Employee";
import { useTranslation } from "react-i18next";
import LanguageButton from "../Components/ManageEmployeesComponents/LanguageButton";


export type params = {
  locale: string;
  limit: number;
  offset: number;
  accepted: boolean | undefined;
};

const ManageEmployees = () => {
  const { i18n } = useTranslation();

  const [params, setParams] = useState<params>({
    locale: i18n.language,
    limit: 10,
    offset: 0,
    accepted: undefined,
  });

  // make the api call using the custom hook useEmployees
  const { get } = useEmployees();

  const configureUrl = (status: string | undefined) => {
    if (status === "Accepted") {
      setParams({
        ...params,
        accepted: true,
      });
    } else if (status === "Pending")
      setParams({
        ...params,
        accepted: false,
      });
    else
      setParams({
        ...params,
        accepted: undefined,
      });
  };

  useEffect(() => {
    get(params);
  }, [params]);

  return (
    <div dir={i18n.dir()} className="flex flex-col gap-4 m-2">
      <div id="header" className="flex justify-between p-2">
        <div>
          <img src="./Documents/shanabLogo.svg" />
        </div>
        <div className="flex flex-col justify-between">
          <LanguageButton />
          <LogOutButton />
        </div>
      </div>
      <div className="flex justify-between items-center p-1 border-2 rounded-xl">
        <InvitationStatus getStatus={(status) => configureUrl(status)} />
        <InviteButton />
      </div>
      <div id="table of content">
        <TableOfContent />
      </div>
    </div>
  );
};

export default ManageEmployees;
