import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import axios from "@/hoc/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { GrClose } from "react-icons/gr";
import { SetStateAction, useContext } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkillContext } from "@/hoc/context/SkillContextProvider";

import { SkillFormType } from "@/types/Types";

const SkillSchema = Yup.object().shape({
  name: Yup.string().required("Skill is required"),
});

const AddSkill = ({ setOpenAddForm }: any) => {
  const { loading, setLoading, setChange, change } = useContext(SkillContext);

  // Post request
  const postRequest = (
    values: SkillFormType,
    resetForm: () => void,
    setOpenAddForm: React.Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      axios
        .post("/skill", values)
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
              Add Skill
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
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Add skills for the job requirements
          </p>
        </div>

        <Formik
          initialValues={{
            name: "",
            type: "",
          }}
          validationSchema={SkillSchema}
          onSubmit={(values, { resetForm }) => {
            values.name = values.name.toLowerCase();
            postRequest(values, resetForm, setOpenAddForm);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="grid gap-4 py-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Name</Label>
                <Field
                  name="name"
                  placeholder="Skill Name"
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md outline-none"
                />
                <ErrorMessage name="name" />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="type">Skill Type</Label>
                <Select
                  name="type"
                  onValueChange={(e) => {
                    setFieldValue("type", e);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                    <SelectContent position="popper">
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <ErrorMessage name="type" />
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

export default AddSkill;
