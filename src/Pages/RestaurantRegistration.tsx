import { useFormik } from "formik";
import { useState } from "react";
import "../App.css"
import FirstForm from "../Components/RegistrationComponents/FirstForm";
import Header from "../Components/RegistrationComponents/Header";
import SecondForm from "../Components/RegistrationComponents/SecondForm";
import RestaurantRegistrationRequest from "../Types/Registration";
import CreateAccButton from "../Components/RegistrationComponents/CreateAccButton";
import axios from "axios";
import baseUrl from "./baseUrl";
import Modal from "../Components/RegistrationComponents/Modal";
import validationSchemaOfRegistration from "../Types/validationSchemaOfRegistration";


function RestaurantRegistration() {
  const [isSuccesRes, setIsSuccesRes] = useState(false);
  // for the success status of api
  const formik = useFormik<RestaurantRegistrationRequest>({
    initialValues: {
      nameAr: "",
      nameEn: "",
      password: "",
      confirmPassword: "",
      imageUrl: "", // restaurant image
      preferredLocale: "",
      district: "",
      documents: [],
      city: "",
      operationRepresentativePhoneNumber: "",
      email: "",
      foodCategories: [],
      instagramSocialMediaLink: "",
      twitterSocialMediaLink: "",
      bankAccountIban: "",
      managementPhoneNumber: "",
      registrationNumber: "",
      workingDetails: [],
      operationRepresentativeFullNameAr: "",
      operationRepresentativeFullNameEn: "",
      operationRepresentativeEmailAddress: "",
      mainRestaurantBranchMapsLink: "",
      mainBranchNameEn: "",
      mainBranchNameAr: "",
      longitude: 1,
      latitude: 1,
      branchAddressName: "",
      branchStreet: "",
      branchAddressDescription: "",
      branchBuildingNumber: "",
      branchDistrict: "",
      branchCountry: "",
      branchCity: "",
    },
    validationSchema: validationSchemaOfRegistration,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      await axios
        .post(baseUrl + "restaurants", values )
        .then((res) => {
          if (res.status === 200) setIsSuccesRes(true);
          else setIsSuccesRes(false);
        })
        .then(() => formik.resetForm())
        .catch((error) => alert(error.message));
    },
  });

  const formikSetter = (field: string, value: any) => {
    formik.setFieldValue(field, value);
  };

  return (
    <div id="template" className="p-4">
      <Header />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8 p-6 border-solid border-[1.5px] rounded-2xl">
        <div id="firstHalf">
          <FirstForm
            formikValues={formik.values}
            formikSetter={formikSetter}
            error={formik.errors}
          />
        </div>
        <div id="secondHalf">
          <SecondForm
            formikValues={formik.values}
            formikSetter={formikSetter}
            error={
              formik.errors as Record<
                keyof RestaurantRegistrationRequest,
                string | undefined
              >
            }
          />
          <CreateAccButton formSubmit={() => formik.handleSubmit()} />
        </div>
      </div>
      {isSuccesRes && (
        <Modal
          title="Congratulations!"
          onClose={() => setIsSuccesRes(false)}
          primaryTitleButton="Log in"
          secondaryTitleButton={"Exit"}
          secondaryActionButton={() => setIsSuccesRes(false)}
          isSuccessModal
        >
          <div className="flex justify-center text-[#1a1a1a] text-xl font-medium ">
            your restaurant has been registered successfully!
          </div>
        </Modal>
      )}
      <br />
    </div>
  );
}

export default RestaurantRegistration;
