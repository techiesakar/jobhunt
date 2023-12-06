import { Field, Form, Formik } from "formik";

import { GrClose } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

import { TechnologyContext } from "@/hoc/context/TechnologyContextProvider";
import { TechnologyType } from "@/types/TechnologyType";
import axios from "@/hoc/axios";
import { useContext } from "react";

type PropsType = {
  currentTechnology: any;
  setCurrentTechnology: any;
};

const EditTechnology = ({
  currentTechnology,
  setCurrentTechnology,
}: PropsType) => {
  const { loading, setLoading, setChange, change } =
    useContext(TechnologyContext);

  const patchRequest = (
    values: TechnologyType,
    resetForm: () => void,
    setCurrentTechnology: any
  ) => {
    try {
      setLoading(true);
      axios
        .patch(`/technology/${values.id}`, values)
        .then((res) => {
          if (res.status === 200) {
            setCurrentTechnology("");
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
    <div className="w-screen fixed inset-0 h-screen flex justify-center items-center bg-white/80 z-50">
      <div className="bg-white p-8 rounded-lg border border-gray-300 w-full sm:max-w-[425px]">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Edit Technology
            </h2>
            <span
              className="hover:bg-slate-100 p-3 rounded-full cursor-pointer"
              onClick={() => {
                setCurrentTechnology(null);
              }}
            >
              <GrClose />
            </span>
          </div>
        </div>
        <Formik
          initialValues={{
            id: currentTechnology?.id || "",
            name: currentTechnology?.name || "",
          }}
          onSubmit={(values: TechnologyType, { resetForm }) => {
            patchRequest(values, resetForm, setCurrentTechnology);
          }}
        >
          {({}) => (
            <Form
              id="technology-form"
              name="technology"
              className="grid gap-4 py-4"
            >
              <div className="flex flex-col space-y-2">
                <Field
                  id="name"
                  name="name"
                  placeholder="Skill Name"
                  className="col-span-3 outline-none px-3 py-2 border-gray-300 rounded-md border"
                />
              </div>

              {loading ? (
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
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

export default EditTechnology;
