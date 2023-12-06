import { Field, Form, Formik } from "formik";

import { GrClose } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

import { JobTypeContext } from "@/hoc/context/JobTypeContextProvider";
import axios from "@/hoc/axios";
import { useContext } from "react";
import { JobTypeType } from "@/types/Types";

type PropsType = {
  currentJobType: any;
  setCurrentJobType: any;
};

const EditJobType = ({ currentJobType, setCurrentJobType }: PropsType) => {
  const { loading, setLoading, setChange, change } = useContext(JobTypeContext);
  console.log(currentJobType);
  const patchRequest = (
    values: any,
    resetForm: () => void,
    setCurrentJobType: any
  ) => {
    try {
      setLoading(true);
      axios
        .patch(`/jobtype/${values.id}`, values)
        .then((res) => {
          if (res.status === 200) {
            setCurrentJobType("");
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
              Edit JobType
            </h2>
            <span
              className="p-3 rounded-full cursor-pointer hover:bg-slate-100"
              onClick={() => {
                setCurrentJobType(null);
              }}
            >
              <GrClose />
            </span>
          </div>
        </div>
        <Formik
          initialValues={{
            id: currentJobType?.id || "",
            name: currentJobType?.name || "",
          }}
          onSubmit={(values: any, { resetForm }) => {
            console.log(values);
            patchRequest(values, resetForm, setCurrentJobType);
          }}
        >
          {({}) => (
            <Form className="grid gap-4 py-4">
              <div className="flex flex-col space-y-2">
                <Field
                  name="name"
                  placeholder="Job Type "
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

export default EditJobType;
