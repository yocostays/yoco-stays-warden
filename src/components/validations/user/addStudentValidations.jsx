import * as yup from "yup";

export const addStudentValidations = {
  studentName: yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required("Student name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be up to 10 digits")
    .required("Phone Number is required"),
  studentEmail: yup.string().email("Invalid email format").required('Email is required.'),
  studentDob: yup.date().required("Date of birth is required").typeError('Date of birth is required.'),
  enrollNo: yup.string().nullable(),
  bloodGroup: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required("Blood group is required"),
  gender: yup.string().required('Gender is required.'),
  disabilities: yup.string().nullable(),
  identificationMark: yup.string().nullable(),
  medicalIssue: yup.string().nullable(),
  allergyProblem: yup.string().nullable(),
  country: yup.object().nullable().required("Country is required"),
  state: yup.object().required("State is required."),
  city: yup.object().required("City is required."),
  category: yup.object().nullable(),
  caste: yup.string().nullable(),
  permanentAddress: yup.string().required("Permanent Address is required"),
  // Father's Details Validation
  fatherName: yup.string().required("Father's Name is required"),
  motherName: yup.string().required("Mother's Name is required"),
  guardianName: yup.string().nullable(),
  relationship: yup.string().nullable(),
  occupation: yup.string().nullable(),
  familyAddress: yup.string().nullable(),

  hostelName: yup.string().required('Hostel Name is required.'),
  // Hostel Details
  hostel: yup.object().nullable(),
  bedType: yup.object().nullable().nullable(),
  floor: yup
    .array()
    .min(1, "Please select a floor") // floor array must not be empty
    .required("Please select a floor"),
  roomNumber: yup.object().required('Room Number is required.'),

  bedNumber: yup.object().required('Bed Number is required.'),

  // Academic Details
  college: yup.object().nullable().nullable(),
  course: yup.object().nullable().nullable(),
  semester: yup.object().nullable().nullable(),

  // Upload KYC Documents
  aadhaar: yup.string().required("Aadhar Card is required"),
  aadharNumber: yup
    .string()
    .trim()
    .nullable()
    .test(
      "aadhaar-length",
      "Aadhaar number must be exactly 12 digits",
      (value) => {
        if (!value) return true; // allow empty
        return /^\d{12}$/.test(value); // must match 12 digits
      }
    ),
  aadhaarFile: yup.mixed().when('kyc', {
    is: 'aadhaar',
    then: (schema) => schema.required('Aadhaar file is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  // panFile: yup.mixed().when('kyc', {
  //   is: 'pancard',
  //   then: (schema) => schema.required('PAN file is required'),
  //   otherwise: (schema) => schema.nullable(),
  // }),
  // ✅ Repeat same pattern for other documents


};


export const addStudentValidationsUpdate = {
  studentName: yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required("Student name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be up to 10 digits")
    .required("Phone Number is required"),
  studentEmail: yup.string().email("Invalid email format").required('Email is required.'),
  studentDob: yup.date().required("Date of birth is required").typeError('Date of birth is required.'),
  enrollNo: yup.string().nullable(),
  bloodGroup: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required("Blood group is required"),
  // bloodGroup:yup.string().required(),
  gender: yup.string().required('Gender is required.'),
  disabilities: yup.string().nullable(),
  identificationMark: yup.string().nullable(),
  medicalIssue: yup.string().nullable(),
  allergyProblem: yup.string().nullable(),
  country: yup.object().nullable().required("Country is required"),
  state: yup.object().required("State is required."),
  city: yup.object().required("City is required."),
  category: yup.object().nullable(),
  caste: yup.string().nullable(),
  permanentAddress: yup.string().required("Permanent Address is required"),
  // Father's Details Validation
  fatherName: yup.string().required("Father's Name is required"),
  motherName: yup.string().required("Mother's Name is required"),
  guardianName: yup.string().nullable(),
  relationship: yup.string().nullable(),
  occupation: yup.string().nullable(),

  familyAddress: yup.string().nullable(),

  hostelName: yup.string().required('Hostel Name is required.'),
  // Hostel Details
  hostel: yup.object().nullable(),
  bedType: yup.object().nullable().nullable(),
  floor: yup
    .array()
    .min(1, "Please select a floor") // floor array must not be empty
    .required("Please select a floor"),

  roomNumber: yup.object().required('Room Number is required.'),

  bedNumber: yup.object().required('Bed Number is required.'),
  college: yup.object().nullable().nullable(),
  course: yup.object().nullable().nullable(),
  semester: yup.object().nullable().nullable(),

  // Upload KYC Documents
  aadhaar: yup.string().nullable().optional(),
  aadharNumber: yup
    .string()
    .trim()
    .nullable()
    .test(
      "aadhaar-length",
      "Aadhaar number must be exactly 12 digits",
      (value) => {
        if (!value) return true; // allow empty
        return /^\d{12}$/.test(value); // must match 12 digits
      }
    )
  ,

  aadhaarFile: yup.mixed().when('kyc', {
    is: 'aadhaar',
    then: (schema) => schema.required('Aadhaar file is required'),
    otherwise: (schema) => schema.nullable(),
  }),

}