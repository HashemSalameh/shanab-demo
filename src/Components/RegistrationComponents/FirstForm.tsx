import InputField from "../InputField";
import Password from "../Password";
import RestaurantTypes from "./RestaurantTypes";
import AssignButton from "./AssignButton";
import PhoneNumField from "./PhoneInput";
import { useState } from "react";
import WorkingHoursModal, { WorkingDetails } from "./WorkingHoursModal";
import ShiftCard from "./ShiftCard";
import RestaurantRegistrationRequest from "../../Types/Registration";
import { Document } from "../../Types/Registration";
import { FormikErrors } from "formik";

type Iprops = {
  formikValues: RestaurantRegistrationRequest;
  formikSetter: (
    field: string,
    value: string | WorkingDetails[] | Document[] | number | number[]
  ) => void;
  error: FormikErrors<RestaurantRegistrationRequest>;
};

const FirstForm = ({ formikValues, formikSetter, error }: Iprops) => {
  const [clicked, setClick] = useState<boolean>(false);
  const [edited, setEdited] = useState<WorkingDetails | undefined>();

  const ShiftCards = formikValues.workingDetails.map(
    (element: WorkingDetails) => {
      return (
        <ShiftCard
          workingDetailstoDisplay={element}
          onDelete={(localId) => {
            const filtered = formikValues.workingDetails.filter(
              (element) => element.localId !== localId
            );

            formikSetter("workingDetails", filtered);
          }}
          onEdit={(localId) => {
            const editedElement = formikValues.workingDetails.find(
              (element) => element.localId === localId
            );
            setEdited(editedElement as WorkingDetails);
          }}
        />
      );
    }
  );

  return (
    <>
      <div id="FirstForm">
        <div className="flex gap-2 items-center pb-1">
          <img src="Documents/one.svg" />
          <div className="text-gray-900 font-bold text-2xl">
            Fill Out Restaurant Registration Form
          </div>
        </div>
        <div className="text-sm font-medium p-2 pl-4">
          Fill out your personal information to create an account tied to a
          Restaurant and Continue
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:gap-6 xs:gap-4">
          <div className="grid gap-1">
            <InputField
              type="text"
              id="restNameEnglish"
              label="Restaurant Name in English*"
              placeholder="Enter your restaurant's name in english"
              value={formikValues.nameEn}
              onChange={(e) => formikSetter("nameEn", e)}
              error={error.nameEn}
            />
            <InputField
              type="text"
              id="restNameArabic"
              label="Restaurant Name in Arabic*"
              placeholder="Enter your restaurant's name in arabic"
              value={formikValues.nameAr}
              onChange={(e) => formikSetter("nameAr", e)}
              error={error.nameAr}
            />
            <InputField
              type="email"
              id="email"
              label="Email*"
              placeholder="Enter the email"
              value={formikValues.email}
              onChange={(e) => formikSetter("email", e)}
              error={error.email}
            />
            <InputField
              type="text"
              id="Iban"
              label="Bank Account IBAN*"
              placeholder="Enter your bank account iban"
              value={formikValues.bankAccountIban}
              onChange={(e) => formikSetter("bankAccountIban", e)}
              error={error.bankAccountIban}
            />
            <Password
              id="password"
              label="Password*"
              placeholder="Enter your password"
              value={formikValues.password}
              onChange={(e) => formikSetter("password", e)}
              error={error.password}
            />
            <Password
              id="confirmPassword"
              label="Confirm Password*"
              placeholder="Confirm your password"
              value={formikValues.confirmPassword}
              onChange={(e) => formikSetter("confirmPassword", e)}
              error={error.confirmPassword}
            />
            <RestaurantTypes
              setFormikFoodCategories_Ids={(selectedIds) =>
                formikSetter("foodCategories", selectedIds)
              }
            />
            {/*yet without validation */}
            <InputField
              type="text"
              id="registrationNumber"
              label="Commercial Registration Number*"
              placeholder="Enter registration number consisting of 10 digits"
              value={formikValues.registrationNumber}
              onChange={(e) => formikSetter("registrationNumber", e)}
              error={error.registrationNumber}
            />
            <InputField
              type="email"
              id="repEmail"
              label="Operation Representative Email*"
              placeholder="Enter the restaurant rep. email address"
              value={formikValues.operationRepresentativeEmailAddress}
              onChange={(e) =>
                formikSetter("operationRepresentativeEmailAddress", e)
              }
              error={error.operationRepresentativeEmailAddress}
            />
            <PhoneNumField
              id="repNumber"
              label="Operation Representative Phone Number*"
              placeholder="Enter restaurant rep. phone"
              value={formikValues.operationRepresentativePhoneNumber}
              onChange={(e) =>
                formikSetter("operationRepresentativePhoneNumber", e)
              }
              error={error.operationRepresentativePhoneNumber}
            />
            <InputField
              type="text"
              id="repFullNameEn"
              label="Operation Representative Full Name in english*"
              placeholder="Enter the restaurant operation rep. full name in english"
              value={formikValues.operationRepresentativeFullNameEn}
              onChange={(e) =>
                formikSetter("operationRepresentativeFullNameEn", e)
              }
              error={error.operationRepresentativeFullNameEn}
            />
          </div>
          <div className="grid gap-1">
            <InputField
              type="text"
              id="repFullNameAr"
              label="Operation Representative Full Name in arabic*"
              placeholder="Enter the restaurant operation rep. full name in arabic"
              value={formikValues.operationRepresentativeFullNameAr}
              onChange={(e) =>
                formikSetter("operationRepresentativeFullNameAr", e)
              }
              error={error.operationRepresentativeFullNameAr}
            />
            <PhoneNumField
              id="managerNumber"
              label="Management phone number*"
              placeholder="Enter the Management phone number"
              value={formikValues.managementPhoneNumber}
              onChange={(e) => formikSetter("managementPhoneNumber", e)}
              error={error.managementPhoneNumber}
            />
            <InputField
              type="text"
              id="branchNameAr"
              label="Main Branch NameAr*"
              placeholder="Enter main branch name in arabic"
              value={formikValues.mainBranchNameAr}
              onChange={(e) => formikSetter("mainBranchNameAr", e)}
              error={error.mainBranchNameAr}
            />
            <InputField
              type="text"
              id="branchNameEn"
              label="Main Branch NameEn*"
              placeholder="Enter main branch name in english"
              value={formikValues.mainBranchNameEn}
              onChange={(e) => formikSetter("mainBranchNameEn", e)}
              error={error.mainBranchNameEn}
            />
            <InputField
              type="text"
              id="branchDistrict"
              label="Branch District"
              placeholder="Enter branch district"
              value={formikValues.branchDistrict}
              onChange={(e) => formikSetter("branchDistrict", e)}
            />
            <InputField
              type="text"
              id="branchAddress"
              label="Branch Address Name"
              placeholder="Enter branch address name"
              value={formikValues.branchAddressName}
              onChange={(e) => formikSetter("branchAddressName", e)}
            />
            <InputField
              type="text"
              id="branchStreet"
              label="Branch Street"
              placeholder="Enter branch street"
              value={formikValues.branchStreet}
              onChange={(e) => formikSetter("branchStreet", e)}
            />
            <InputField
              type="text"
              id="branchBuildingNum"
              label="Branch Building Number"
              placeholder="Enter branch building number"
              value={formikValues.branchBuildingNumber}
              onChange={(e) => formikSetter("branchBuildingNumber", e)}
            />
            <InputField
              type="text"
              id="branchAddressDescription"
              label="Branch Address Description"
              placeholder="Enter branch address description"
              value={formikValues.branchAddressDescription}
              onChange={(e) => formikSetter("branchAddressDescription", e)}
            />
            <InputField
              type="text"
              id="twitterSM"
              label="Twitter Social Media Account"
              placeholder="Enter your restaurant twitter page"
              value={formikValues.twitterSocialMediaLink}
              onChange={(e) => formikSetter("twitterSocialMediaLink", e)}
            />
            <InputField
              type="text"
              id="instagramSM"
              label="Instagram Social Media Account"
              placeholder="Enter your restaurant Instagram page"
              value={formikValues.instagramSocialMediaLink}
              onChange={(e) => formikSetter("instagramSocialMediaLink", e)}
            />
          </div>

          <div className="grid gap-1 lg:">
            <AssignButton
              onOpen={() => {}}
              caption="Google Maps Location Link:"
            />
          </div>
          <div className="grid gap-1 lg: row-span-2 content-start">
            <AssignButton
              caption="Working hours"
              onOpen={() => setClick(true)}
            />
            {ShiftCards}

            {/* objects always returns true 
                empty strings return false */}
            {(clicked || edited?.day) && (
              <WorkingHoursModal
                title={clicked ? "Add Working Details" : "Edit Working Details"}
                primaryTitleButton={clicked ? "Add" : "Save"}
                onClose={() => {
                  setClick(false);
                  setEdited(undefined);
                }}
                editedElementToShow={edited}
                onAddOrEditModal={(details: WorkingDetails) => {
                  if (clicked) {
                    formikSetter("workingDetails", [
                      ...formikValues.workingDetails,
                      details,
                    ]);
                  } else if (edited?.day) {
                    const notEditedElements =
                      formikValues.workingDetails.filter(
                        (element: WorkingDetails) =>
                          element.localId !== edited?.localId
                      );

                    formikSetter("workingDetails", [
                      ...notEditedElements,
                      details,
                    ]);
                  }
                }}
                alreadyAddedWorkingDetails={formikValues.workingDetails}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstForm;
