import * as Yup from "yup";
export const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Category is required"),
});
