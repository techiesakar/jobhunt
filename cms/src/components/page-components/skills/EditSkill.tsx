import { Field, Form, Formik } from "formik";
import { GrClose } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkillContext } from "@/hoc/context/SkillContextProvider";
import axios from "@/hoc/axios";

import { useContext } from "react";
import { SkillType } from "@/types/Types";

type PropsType = {
  currentSkill: any;
  setCurrentSkill: any;
};

const EditSkill = ({ currentSkill, setCurrentSkill }: PropsType) => {
  const { loading, setLoading, setChange, change } = useContext(SkillContext);

  const patchRequest = (
    values: SkillType,
    resetForm: () => void,
    setCurrentSkill: any
  ) => {
    try {
      setLoading(true);
      axios
        .patch(`/skill/${values.id}`, values)
        .then((res) => {
          if (res.status === 200) {
            setCurrentSkill("");
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
              Edit Skill
            </h2>
            <span
              className="p-3 rounded-full cursor-pointer hover:bg-slate-100"
              onClick={() => {
                setCurrentSkill(null);
              }}
            >
              <GrClose />
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Update skills for the job requirements
          </p>
        </div>
        <Formik
          initialValues={{
            id: currentSkill?.id || "",
            name: currentSkill?.name || "",
            type: currentSkill?.type || "",
          }}
          onSubmit={(values: SkillType, { resetForm }) => {
            values.name = values.name.toLowerCase();
            patchRequest(values, resetForm, setCurrentSkill);
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
              </div>
              {loading ? (
                <Button disabled>
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">Update Record</Button>
              )}
            </Form>
          )}
        </Formik>
        {/* Place Formik */}
      </div>
    </div>
  );
};

export default EditSkill;
