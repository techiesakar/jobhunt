import * as Yup from "yup";
export const TechnologySchema = Yup.object().shape({
  name: Yup.string().required("Technology is required"),
});
