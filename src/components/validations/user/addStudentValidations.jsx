import * as yup from "yup";

export const addStudentValidations = {
  studentName: yup.string().required("Student name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be up to 10 digits")
    .required("Phone Number is required"),
  studentEmail: yup.string().email("Invalid email format").required('Email is required.'),
  studentDob: yup.date().required("Date of birth is required").typeError('Date of birth is required.'),
  enrollNo: yup.string().nullable(),
  // bloodGroup: yup.string().nullable(),
  bloodGroup: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required("Blood group is required"),
  //  bloodGroup:yup.string().required(),
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
  // currentAddress: yup.string().required("Current Address is required"),
  // parentEmail: yup.string()
  //   .nullable()                // allows null
  //   .notRequired()         // field is optional
  //   .email('Invalid email'),
  // parentMobileNumber: yup.string()
  //   .transform((value, originalValue) => {
  //     // Convert empty string to null
  //     return originalValue === '' ? null : value;
  //   })
  //   .matches(/^\d{10}$/, {
  //     message: 'Enter a valid 10-digit phone number',
  //     excludeEmptyString: true, // ✅ Skip match if empty string (already transformed to null)
  //   }).required("Parent's Number is required."),
  // Father's Details Validation
  fatherName: yup.string().required("Father's Name is required"),
  // fatherphoneNumber: yup
  //   .string()
  //   .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
  //   .nullable(),

  // fatherEmail: yup
  //   .string()
  //   .email("Enter a valid email")
  //   .required("Father's Email is required"),

  // fatherOccupation: yup.string().required("Father's Occupation is required"),
  motherName: yup.string().required("Mother's Name is required"),

  // motherphoneNumber: yup
  //   .string()
  //   .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
  //   .nullable(),

  // motherEmail: yup
  //   .string()
  //   .email("Enter a valid email")
  //   .required("Mother's Email is required"),

  guardianName: yup.string().nullable(),
  relationship: yup.string().nullable(),
  occupation: yup.string().nullable(),

  // guardianMobileNumber: yup
  //   .string()
  //   .nullable()
  //   .notRequired()
  //   .matches(/^\d{10}$/, {
  //     message: "Enter a valid 10-digit phone number",
  //     excludeEmptyString: true, // This is key
  //   }),

  // emailId: yup
  //   .string()
  //   .email("Enter a valid email")
  //   .nullable(),

  familyAddress: yup.string().nullable(),

  hostelName: yup.string().required('Hostel Name is required.'),
  // Hostel Details
  hostel: yup.object().nullable(),
  // selectWing: yup.string().required("Building/Wing Name is required"),
  bedType: yup.object().nullable().nullable(),
  // roomNumber: yup
  //   .string()
  //   .nullable() // ✅ allows empty/null
  //   .test("valid-number-range", "Enter a valid number between 1 to 50", (value) => {
  //     if (!value) return true; // ✅ allow empty
  //     const num = Number(value);
  //     return Number.isInteger(num) && num >= 1 && num <= 50;
  //   })
  floor: yup
    .array()
    .min(1, "Please select a floor") // floor array must not be empty
    .required("Please select a floor"),

  // roomNumber: yup
  //   .object()
  //   .nullable()
  //   .when("floor", {
  //     is: (floor) => Array.isArray(floor) && floor.length > 0,
  //     then: (schema) => schema.required("Room number is required when floor is selected"),
  //     otherwise: (schema) => schema.notRequired(),
  //   }),
  roomNumber: yup.object().required('Room Number is required.'),

  bedNumber: yup.object().required('Bed Number is required.'),

  // Academic Details
  // academicYear: yup.object().nullable().required("Academic Year is required"),
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
  // passport: yup.string().required("Passport Card is required"),
  // kyc: yup.string()
  //   .required("Please select document type")
  //   .oneOf(['aadhaar', 'voterId', 'passport', 'drivingLicense', 'pancard'], 'Invalid document type'),

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




// export const addStudentValidationsUpdate = {
//   studentName: yup.string().required("Student name is required"),
//   phoneNumber: yup
//     .string()
//     .matches(/^\d{10}$/, "Phone number must be up to 10 digits")
//     .required("Phone Number is required"),
//   studentEmail: yup
//     .string()
//     .email("Invalid email format")
//     .required("E-mail is required"),
//   studentDob: yup.date().required("Date of birth is required"),
//   enrollNo: yup.string().required("Enroll. No. is required"),
//   bloodGroup: yup.string().nullable().optional().notRequired(),
//   // bloodGroup: yup
//   //   .object({
//   //     label: yup.string().required(),
//   //     value: yup.string().required(),
//   //   })
//   //   .nullable()
//   //   .required("Blood group is required"),
//   gender: yup.string().required("Gender is required"),
//   disabilities: yup.string().required("Disabilities is required"),
//   identificationMark: yup.string().required("Identification Mark is required"),
//   medicalIssue: yup.string().required("Medical Issue is required"),
//   allergyProblem: yup.string().required("Allergy problem is required"),
//   country: yup.object().nullable().required("Nationality is required"),
//   category: yup.object().nullable().required("Category is required"),
//   caste: yup.string().required("Caste is required"),
//   permanentAddress: yup.string().required("Permanent Address is required"),
//   // currentAddress: yup.string().required("Current Address is required"),

//   // Father's Details Validation
//   fatherName: yup.string().required("Father's Name is required"),
//   fatherphoneNumber: yup
//     .string()
//     .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
//     .required("Father's Mobile Number is required"),

//   fatherEmail: yup
//     .string()
//     .email("Enter a valid email")
//     .required("Father's Email is required"),

//   fatherOccupation: yup.string().required("Father's Occupation is required"),
//   motherName: yup.string().required("Mother's Name is required"),

//   parentsMobileNumber: yup
//     .string()
//     .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
//     .required("Mother's Mobile Number is required"),

//   // motherEmail: yup
//   //   .string()
//   //   .email("Enter a valid email")
//   //   .required("Mother's Email is required"),

//   guardianName: yup.string().required("Guardian Name is required"),
//   relationship: yup.string().required("Relationship is required"),
//   occupation: yup.string().required("Guardian Occupation is required"),

//   guardianMobileNumber: yup
//     .string()
//     .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
//     .required("Guardian's Mobile Number is required"),

//   emailId: yup
//     .string()
//     .email("Enter a valid email")
//     .required("Email ID is required"),

//   familyAddress: yup.string().required("Family Address is required"),

//   // Academic Details
//   // academicYear: yup.object().nullable().required("Academic Year is required"),
//   college: yup.object().nullable().required("College is required"),
//   course: yup.object().nullable().required("Course is required"),
//   semester: yup.object().nullable().required("Semester is required"),

//   // Upload KYC Documents
//   aadhaar: yup.string().required("Aadhar Card is required"),
//   passport: yup.string().required("Passport Card is required"),
// };

export const addStudentValidationsUpdate = {
  studentName: yup.string().required("Student name is required"),
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
  // currentAddress: yup.string().required("Current Address is required"),
  // parentEmail: yup.string()
  //   .nullable()                // allows null
  //   .notRequired()         // field is optional
  //   .email('Invalid email'),
  // parentMobileNumber: yup.string()
  //   .transform((value, originalValue) => {
  //     // Convert empty string to null
  //     return originalValue === '' ? null : value;
  //   })
  //   .matches(/^\d{10}$/, {
  //     message: 'Enter a valid 10-digit phone number',
  //     excludeEmptyString: true, // ✅ Skip match if empty string (already transformed to null)
  //   }).required("Parent's Number is required."),
  // Father's Details Validation
  fatherName: yup.string().required("Father's Name is required"),
  // fatherphoneNumber: yup
  //   .string()
  //   .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
  //   .nullable(),

  // fatherEmail: yup
  //   .string()
  //   .email("Enter a valid email")
  //   .required("Father's Email is required"),

  // fatherOccupation: yup.string().required("Father's Occupation is required"),
  motherName: yup.string().required("Mother's Name is required"),
  // aadharNumber: yup
  //   .string()
  //   .trim()
  //   .matches(/^[0-9]*$/, "Only digits allowed")
  //   .matches(/^\d{12}$/, {
  //     message: "Aadhaar number must be exactly 12 digits",
  //     excludeEmptyString: true,
  //   }),
  // motherphoneNumber: yup
  //   .string()
  //   .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
  //   .nullable(),

  // motherEmail: yup
  //   .string()
  //   .email("Enter a valid email")
  //   .required("Mother's Email is required"),

  guardianName: yup.string().nullable(),
  relationship: yup.string().nullable(),
  occupation: yup.string().nullable(),

  // guardianMobileNumber: yup
  //   .string()
  //   .nullable()
  //   .notRequired()
  //   .matches(/^\d{10}$/, {
  //     message: "Enter a valid 10-digit phone number",
  //     excludeEmptyString: true, // This is key
  //   }),

  // emailId: yup
  //   .string()
  //   .email("Enter a valid email")
  //   .nullable(),

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