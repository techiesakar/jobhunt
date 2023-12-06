import * as Yup from "yup";
export const BenefitSchema = Yup.object().shape({
  name: Yup.string().required("Benefit is required"),
});
