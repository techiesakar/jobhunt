import { ErrorMessage, Field, Form, Formik } from "formik";

import { Button } from "@/components/ui/button";
import axios from "@/hoc/axios";

import { ReloadIcon } from "@radix-ui/react-icons";
import { GrClose } from "react-icons/gr";
import { useContext } from "react";
import { TechnologyContext } from "@/hoc/context/TechnologyContextProvider";
import { TechnologyFormType } from "@/types/TechnologyType";
import { BooleanSetState } from "@/types/BooleanSetState";
import { TechnologySchema } from "@/schema/TechnologySchema";

const AddTechnology = ({ setOpenAddForm }: any) => {
  const { loading, setLoading, setChange, change } =
    useContext(TechnologyContext);

  // Post request
  const postRequest = (
    values: TechnologyFormType,
    resetForm: () => void,
    setOpenAddForm: BooleanSetState
  ) => {
    try {
      setLoading(true);
      axios
        .post("/technology", values)
        .then((res) => {
          if (res.status === 200) {
            resetForm();
            setChange(!change);
            setLoading(false);
            setOpenAddForm(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setOpenAddForm(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setOpenAddForm(false);
    }
  };

  return (
    <div className="w-screen fixed inset-0 h-screen flex justify-center items-center bg-white/80 z-50">
      <div className="bg-white p-8 rounded-lg border border-gray-300 w-full sm:max-w-[425px]">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Add Technology
            </h2>
            <span
              className="hover:bg-slate-100 p-3 rounded-full cursor-pointer"
              onClick={() => {
                setOpenAddForm(false);
              }}
            >
              <GrClose />
            </span>
          </div>
        </div>

        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={TechnologySchema}
          onSubmit={(values, { resetForm }) => {
            postRequest(values, resetForm, setOpenAddForm);
          }}
        >
          {({}) => (
            <Form className="grid gap-4 py-4">
              <div className="flex flex-col space-y-2">
                <Field
                  name="name"
                  placeholder="Technology Name"
                  className="col-span-3 outline-none px-3 py-2 border-gray-300 rounded-md border"
                />
                <ErrorMessage name="name" />
              </div>

              {loading ? (
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">Add </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTechnology;
