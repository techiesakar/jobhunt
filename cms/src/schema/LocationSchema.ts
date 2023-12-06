import * as Yup from "yup";
export const LocationSchema = Yup.object().shape({
  name: Yup.string().required("Location is required"),
});
