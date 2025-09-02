import * as yup from "yup";

export const otpUserSchema = yup.object().shape({
    code1: yup.string(),
    code2: yup.string(),
    code3: yup.string(),
    code4: yup.string(),
  });