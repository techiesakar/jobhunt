import { ErrorMessage, Field, Form, Formik } from "formik";

import { Button } from "@/components/ui/button";
import axios from "@/hoc/axios";

import { ReloadIcon } from "@radix-ui/react-icons";
import { GrClose } from "react-icons/gr";
import { useContext } from "react";
import { BenefitContext } from "@/hoc/context/BenefitContextProvider";

import { BenefitSchema } from "@/schema/BenefitSchema";
import { BenefitFormType } from "@/types/Types";

const AddBenefit = ({ setOpenAddForm }: any) => {
  const { loading, setLoading, setChange, change } = useContext(BenefitContext);

  // Post request
  const postRequest = (
    values: BenefitFormType,
    resetForm: () => void,
    setOpenAddForm: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      axios
        .post("/benefit", values)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-white/80">
      <div className="bg-white p-8 rounded-lg border border-gray-300 w-full sm:max-w-[425px]">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Add Benefit
            </h2>
            <span
              className="p-3 rounded-full cursor-pointer hover:bg-slate-100"
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
          validationSchema={BenefitSchema}
          onSubmit={(values, { resetForm }) => {
            values.name = values.name.toLowerCase();
            postRequest(values, resetForm, setOpenAddForm);
          }}
        >
          {({}) => (
            <Form className="grid gap-4 py-4">
              <div className="flex flex-col space-y-2">
                <Field
                  name="name"
                  placeholder="Benefit Name"
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md outline-none"
                />
                <ErrorMessage name="name" />
              </div>

              {loading ? (
                <Button disabled>
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
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

export default AddBenefit;
