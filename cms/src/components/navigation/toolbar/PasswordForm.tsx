import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "@/hoc/axios";

import { GrClose } from "react-icons/gr";
import { useUserContext } from "@/hoc/context/UserContextProvider";

const ChangePassworSchema = Yup.object().shape({
  oldPassword: Yup.string().min(2, "Too Short!").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});

const PasswordForm = ({ setOpenChangePassword }: any) => {
  const { currentUserID } = useUserContext();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-white/80">
      <div className="bg-white p-8 rounded-lg border border-gray-300 w-full sm:max-w-[425px]">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Change Password
            </h2>
            <span
              className="p-3 rounded-full cursor-pointer hover:bg-slate-100"
              onClick={() => setOpenChangePassword(false)}
            >
              <GrClose />
            </span>
          </div>
        </div>
        <Formik
          initialValues={{
            id: currentUserID || "",
            oldPassword: "",
            password: "",
          }}
          validationSchema={ChangePassworSchema}
          onSubmit={(values: any) => {
            try {
              axios
                .patch(`/auth/adminupdate/${values.id}`, values)
                .then((res) => {
                  if (res.status === 200) {
                    setOpenChangePassword(false);
                  }
                });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({}) => (
            <Form className="grid gap-4 py-4">
              <div className="flex flex-col space-y-2">
                <Field
                  name="oldPassword"
                  type="password"
                  placeholder="Old Password"
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md outline-none"
                />
                <ErrorMessage name="oldPassword" />
                <Field
                  name="password"
                  type="password"
                  placeholder="New Password"
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md outline-none"
                />
                <ErrorMessage name="password" />
              </div>

              <Button type="submit">Update</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordForm;
