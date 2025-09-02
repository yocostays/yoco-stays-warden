import * as yup from "yup";

export const addStudentValidations = {
  studentName: yup.string().required("Student name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be up to 10 digits")
    .required("Phone Number is required"),
  studentEmail: yup
    .string()
    .email("Invalid email format")
    .required("E-mail is required"),
  studentDob: yup.date().nullable().required("Date of birth is required"),
  enrollNo: yup.string().required("Enroll. No. is required"),
  bloodGroup: yup.object().nullable().required("Blood group is required"),
  gender: yup.string().required("Gender is required"),
  disabilities: yup.string().required("Disabilities is required"),
  identificationMark: yup.string().required("Identification Mark is required"),
  medicalIssue: yup.string().required("Medical Issue is required"),
  allergyProblem: yup.string().required("Allergy problem is required"),
  country: yup.object().nullable().required("Nationality is required"),
  category: yup.object().nullable().required("Category is required"),
  caste: yup.string().required("Caste is required"),
  permanentAddress: yup.string().required("Permanent Address is required"),
  currentAddress: yup.string().required("Current Address is required"),

  // Father's Details Validation
  fatherName: yup.string().required("Father's Name is required"),
  fatherphoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Father's Mobile Number is required"),

  fatherEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Father's Email is required"),

  fatherOccupation: yup.string().required("Father's Occupation is required"),
  motherName: yup.string().required("Mother's Name is required"),

  motherphoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Mother's Mobile Number is required"),

  motherEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Mother's Email is required"),

  guardianName: yup.string().required("Guardian Name is required"),
  relationship: yup.string().required("Relationship is required"),
  occupation: yup.string().required("Guardian Occupation is required"),

  guardianMobileNumber: yup
    .string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Guardian's Mobile Number is required"),

  emailId: yup
    .string()
    .email("Enter a valid email")
    .required("Email ID is required"),
    
  familyAddress: yup.string().required("Family Address is required"),

  // Hostel Details
  hostel: yup.object().nullable().required("Hostel Name is required"),
  selectWing: yup.string().required("Building/Wing Name is required"),
  bedType: yup.object().nullable().required("Bed Type is required"),
  // roomNumber: yup.object().nullable().required("Room Number is required"),
  bedNumber: yup.object().nullable().required("Bed Number is required"),

  // Academic Details
  // academicYear: yup.object().nullable().required("Academic Year is required"),
  college: yup.object().nullable().required("College is required"),
  course: yup.object().nullable().required("Course is required"),
  semester: yup.object().nullable().required("Semester is required"),

  // Upload KYC Documents
  aadhaar: yup.string().required("Aadhar Card is required"),
  passport: yup.string().required("Passport Card is required"),
};

export const addStudentValidationsUpdate = {
  studentName: yup.string().required("Student name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be up to 10 digits")
    .required("Phone Number is required"),
  studentEmail: yup
    .string()
    .email("Invalid email format")
    .required("E-mail is required"),
  studentDob: yup.date().required("Date of birth is required"),
  enrollNo: yup.string().required("Enroll. No. is required"),
  bloodGroup: yup.object().nullable().required("Blood group is required"),
  gender: yup.string().required("Gender is required"),
  disabilities: yup.string().required("Disabilities is required"),
  identificationMark: yup.string().required("Identification Mark is required"),
  medicalIssue: yup.string().required("Medical Issue is required"),
  allergyProblem: yup.string().required("Allergy problem is required"),
  country: yup.object().nullable().required("Nationality is required"),
  category: yup.object().nullable().required("Category is required"),
  caste: yup.string().required("Caste is required"),
  permanentAddress: yup.string().required("Permanent Address is required"),
  currentAddress: yup.string().required("Current Address is required"),

  // Father's Details Validation
  fatherName: yup.string().required("Father's Name is required"),
  fatherphoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Father's Mobile Number is required"),

  fatherEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Father's Email is required"),

  fatherOccupation: yup.string().required("Father's Occupation is required"),
  motherName: yup.string().required("Mother's Name is required"),

  motherphoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Mother's Mobile Number is required"),

  motherEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Mother's Email is required"),

  guardianName: yup.string().required("Guardian Name is required"),
  relationship: yup.string().required("Relationship is required"),
  occupation: yup.string().required("Guardian Occupation is required"),

  guardianMobileNumber: yup
    .string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Guardian's Mobile Number is required"),

  emailId: yup
    .string()
    .email("Enter a valid email")
    .required("Email ID is required"),
    
  familyAddress: yup.string().required("Family Address is required"),

  // Academic Details
  // academicYear: yup.object().nullable().required("Academic Year is required"),
  college: yup.object().nullable().required("College is required"),
  course: yup.object().nullable().required("Course is required"),
  semester: yup.object().nullable().required("Semester is required"),

  // Upload KYC Documents
  aadhaar: yup.string().required("Aadhar Card is required"),
  passport: yup.string().required("Passport Card is required"),
};
