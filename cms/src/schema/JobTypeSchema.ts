import * as Yup from "yup";
export const JobTypeSchema = Yup.object().shape({
  name: Yup.string().required("Job Type is required"),
});
