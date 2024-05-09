import * as Yup from "yup";

const saudiPhoneRegex = /^\+966\s?\d{3}\s?\d{3}\s?\d{3}$/;
  // task. put the schema in a seperate folder
  const validationSchemaOfRegistration = Yup.object().shape({
    nameEn: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please complete this field"),
    nameAr: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please complete this field"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please complete this field"),
    bankAccountIban: Yup.string().required("Please complete this field"),
    password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one symbol or punctuation'
    ),
    confirmPassword: Yup.string()
      .required("Please re-type your password")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
    registrationNumber: Yup.string().required("Please complete this field"),
    operationRepresentativeEmailAddress: Yup.string()
      .email("Invalid email address")
      .required("Please complete this field"),
    operationRepresentativeFullNameEn: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please complete this field"),
    operationRepresentativeFullNameAr: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please complete this field"),
    mainBranchNameEn: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please complete this field"),
    mainBranchNameAr: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please complete this field"),
    operationRepresentativePhoneNumber: Yup.string()
      .matches(
        saudiPhoneRegex,
        "Phone number must be a valid Saudi phone number"
      )
      .required("Please complete this field"),
    managementPhoneNumber: Yup.string()
      .matches(
        saudiPhoneRegex,
        "Phone number must be a valid Saudi phone number"
      )
      .required("Please complete this field"),
    workingDeatails: Yup.array().of(Yup.object().shape({
        day:Yup.string(),
        from: Yup.string(),
        to:Yup.string()
    })),
    imageUrl: Yup.string().required("Please complete this field"),
    documents: Yup.array().min(3,"please complete this field").of(Yup.object().shape({
      documentTypeCode: Yup.string().required(),
      urls: Yup.array().of(Yup.string()),
    }))
    
  });

  export default validationSchemaOfRegistration;