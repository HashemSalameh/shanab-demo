import { useEffect, useState } from "react";
import InputField from "../InputField";
import Button from "../RegistrationComponents/ModalButton";
import PhoneNumField from "../RegistrationComponents/PhoneInput";
import InviteModalMultiSelector from "./InviteModalMultiSelector";
import { useFormik } from "formik";
import axios from "axios";
import baseUrl from "../../Pages/baseUrl";
import validationSchemaOfInviteEmployee from "../../Types/validationSchemaOfInviteEmployee";
import { useTranslation } from "react-i18next";
import { useEmployees } from "../../data/Employee";
import { EmployeeState } from "../../Redux/EmployeeSlice/EmployeeSlice";

type Iprops = {
  onClose: () => void;
  employeeToUpdate?: EmployeeState;
};

export type InviteEmployeeRequest = {
  fullNameAr: string;
  fullNameEn: string;
  id: number;
  email: string;
  mobile: string;
  dateOfBirth: string;
  gender: string;
  owner: boolean;
  preferredLocale: string;
  roles: string[];
};

export type option = {
  code: string;
  name: string;
};

const InviteModal = ({ onClose, employeeToUpdate }: Iprops) => {
  const [rolesOptions, setRolesOptions] = useState<option[]>([
    {
      code: "",
      name: "",
    },
  ]);
  const { invite, update } = useEmployees();

  const { t,i18n } = useTranslation();

  const genders = [
    { code: "male", name: "Male" },
    { code: "female", name: "Female" },
  ];

  const formik = useFormik<InviteEmployeeRequest>({
    initialValues: {
      fullNameAr: employeeToUpdate?.fullNameAr ?? "",
      fullNameEn: employeeToUpdate?.fullNameEn ?? "",
      id: employeeToUpdate?.id ?? 0,
      email: employeeToUpdate?.email ?? "",
      mobile: employeeToUpdate?.mobile ?? "",
      dateOfBirth: employeeToUpdate?.dateOfBirth.split("T")[0] ?? "",
      
      gender: employeeToUpdate?.gender ?? "",
      owner: false,
      preferredLocale: i18n.language,
      roles: employeeToUpdate?.roles.map((x) => x.name) ?? [""],
    },
    validationSchema: validationSchemaOfInviteEmployee,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      if (employeeToUpdate) {
        let updateRes = await update(values, employeeToUpdate.id);
        if (updateRes.status === 204) {
          onClose();
        }
      } else {
        let inviteRes = await invite(values);
        if (inviteRes.status === 200) {
          onClose();
        }
      }
    },
  });

  const getRoles = async () => {
    await axios
      .get(baseUrl + `restaurantRoles?locale=${i18n.language}`)
      .then((res) => {
        setRolesOptions(
          res.data.matches.map((x: option) => ({ code: x.code, name: x.name }))
        );
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
      <div
        id="modal container"
        className="flex flex-col gap-4 mx-auto p-[24px] bg-[#fdfdfd] border-[1px] border-[#505050] shadow-lg rounded-3xl xs:w-11/12 lg:w-1/2"
      >
        <div id="modal header" className="flex justify-between items-center">
          <div className="text-[22px] text-[#ff4233] font-semibold">
            {employeeToUpdate ? t("Update Modal") : t("Invite Modal")}
          </div>
          <div>
            <button className="h-[35px] w-[35px]" onClick={onClose}>
              <img className="h-[35px] w-[35px]" src="Documents/close.svg" />
            </button>
          </div>
        </div>

        <div id="modal border" className="border-[#1a1a1a] border-[1px]" />
        <div id="modal body" className="flex-col">
          <div className="flex justify-between">
            <div className="w-[45%]">
              <InputField
                type="text"
                id="name in arabic"
                label={t("Name in Arabic*")}
                placeholder={t("Enter your name in Arabic")}
                value={formik.values.fullNameAr}
                onChange={(input) => formik.setFieldValue("fullNameAr", input)}
                error={formik.errors.fullNameAr}
              />
            </div>
            <div className="w-[45%]">
              <InputField
                type="text"
                id="name in english"
                label={t("Name in English*")}
                placeholder={t("Enter your name in English")}
                value={formik.values.fullNameEn}
                onChange={(input) => formik.setFieldValue("fullNameEn", input)}
                error={formik.errors.fullNameEn}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[45%]">
              <InputField
                type="email"
                id="email"
                label={t("Email*")}
                placeholder={t("Enter your Email")}
                value={formik.values.email}
                onChange={(input) => formik.setFieldValue("email", input)}
                error={formik.errors.email}
              />
            </div>
            <div className="w-[45%]">
              <PhoneNumField
                id="phone number"
                label={t("Phone Number*")}
                placeholder="Enter your Phone Number"
                value={formik.values.mobile}
                onChange={(input) => formik.setFieldValue("mobile", input)}
                error={formik.errors.mobile}
              />
            </div>
          </div>
          <div className="w-full">
            <InviteModalMultiSelector
              options={rolesOptions}
              valueToDisplay="name"
              selectedValues={employeeToUpdate?.roles}
              label={t("Roles")}
              placeHolder={t("Roles")}
              showCheckBox
              setFormikOnSelect={(selectedRoles) => {
                formik.setFieldValue(
                  "roles",
                  selectedRoles.map((x) => x.name)
                );
              }}
              setFormikOnRemove={(selectedRoles) => {
                formik.setFieldValue(
                  "roles",
                  selectedRoles.map((x) => x.name)
                );
              }}
              //@ts-ignore
              error={formik.errors.roles}
            />
          </div>
          <div className="flex justify-between">
            <div className="w-[45%]">
              <InputField
                type="date"
                id="date"
                label={t("Date Of Birth")}
                placeholder=""
                value={formik.values.dateOfBirth}
                onChange={(input) => formik.setFieldValue("dateOfBirth", input)}
              />
            </div>
            <div className="w-[45%]">
              <InviteModalMultiSelector
                options={genders}
                valueToDisplay="name"
                // @ts-ignore
                selectedValues={
                  employeeToUpdate?.gender
                    ? [genders.find((x) => x.name === employeeToUpdate?.gender)]
                    : []
                }
                isSingleSelect
                label={t("Gender")}
                placeHolder={t("Select your gender")}
                setFormikOnSelect={(selectedGender) => {
                  formik.setFieldValue("gender", selectedGender[0]?.name);
                }}
                setFormikOnRemove={(selectedGender) => {
                  formik.setFieldValue("gender", selectedGender[0]?.name);
                }}
              />
            </div>
          </div>
        </div>
        <div
          id="modal footer"
          className="flex justify-center items-center gap-[10px] mt-[15px]"
        >
          <Button
            style="h-[50px] w-[200px] text-base font-bold tracking-wide text-[#ff4233] bg-[#f6e6e6] hover:bg-[#FAFAFA]  border-[1px] border-[#FF4233] rounded-3xl"
            onclick={onClose}
          >
            {t("Close")}
          </Button>
          <Button
            style="h-[50px] w-[200px] text-base font-bold tracking-wide text-white bg-[#FF4233] hover:bg-[#F5F5F5] hover:text-[#FF4233] border-[1px] border-[#FF4233] rounded-3xl"
            onclick={() => {
              formik.handleSubmit();
            }}
            isSubmitType
          >
            {employeeToUpdate ? t("Save") : t("Submit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
