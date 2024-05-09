import * as Yup from "yup";

const saudiPhoneRegex = /^\+966\s?\d{3}\s?\d{3}\s?\d{3}$/;

const validationSchemaOfInviteEmployee= Yup.object().shape({
    fullNameAr: Yup.string().required("Please complete this field"),
    fullNameEn: Yup.string().required("Please complete this field"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please complete this field"),
    mobile: Yup.string().required("Please complete this field")
    .matches(
      saudiPhoneRegex,
      "Phone number must be a valid Saudi phone number"
    ),
    roles: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one role is required'),
    // gender:Yup.string().required("Please complete this field"),
    // dateOfBirth:Yup.string().required("Please complete this field"),
    

})

export default validationSchemaOfInviteEmployee;