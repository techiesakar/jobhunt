import * as Yup from "yup";
export const SkillSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Type is required"),
});
