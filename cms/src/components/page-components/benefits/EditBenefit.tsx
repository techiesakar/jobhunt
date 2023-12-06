import { Field, Form, Formik } from "formik";

import { GrClose } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

import { BenefitContext } from "@/hoc/context/BenefitContextProvider";
import axios from "@/hoc/axios";
import { useContext } from "react";
import { BenefitType } from "@/types/Types";

type PropsType = {
  currentBenefit: any;
  setCurrentBenefit: any;
};

const EditBenefit = ({ currentBenefit, setCurrentBenefit }: PropsType) => {
  const { loading, setLoading, setChange, change } = useContext(BenefitContext);

  const patchRequest = (
    values: BenefitType,
    resetForm: () => void,
    setCurrentBenefit: any
  ) => {
    try {
      setLoading(true);
      axios
        .patch(`/benefit/${values.id}`, values)
        .then((res) => {
          if (res.status === 200) {
            setCurrentBenefit("");
            resetForm();
            setChange(!change);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-white/80">
      <div className="bg-white p-8 rounded-lg border border-gray-300 w-full sm:max-w-[425px]">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Edit Benefit
            </h2>
            <span
              className="p-3 rounded-full cursor-pointer hover:bg-slate-100"
              onClick={() => {
                setCurrentBenefit("");
              }}
            >
              <GrClose />
            </span>
          </div>
        </div>
        <Formik
          initialValues={{
            id: currentBenefit?.id || "",
            name: currentBenefit?.name || "",
          }}
          onSubmit={(values: BenefitType, { resetForm }) => {
            values.name = values.name.toLowerCase();
            patchRequest(values, resetForm, setCurrentBenefit);
          }}
        >
          {({}) => (
            <Form className="grid gap-4 py-4">
              <div className="flex flex-col space-y-2">
                <Field
                  id="name"
                  name="name"
                  placeholder="Skill Name"
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>

              {loading ? (
                <Button disabled>
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">Update</Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditBenefit;
