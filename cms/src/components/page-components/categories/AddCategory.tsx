import { ErrorMessage, Field, Form, Formik } from "formik";

import { Button } from "@/components/ui/button";
import axios from "@/hoc/axios";

import { useContext, useState } from "react";
import { CategoryContext } from "@/hoc/context/CategoryContextProvider";
import { CategorySchema } from "@/schema/CategorySchema";
import { ReloadIcon } from "@radix-ui/react-icons";
import { GrClose } from "react-icons/gr";
import UploadImage from "@/components/ui/UploadImage";
import { Textarea } from "@/components/ui/textarea";

type AddCategoryProps = {
  setOpenAddForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCategory = ({ setOpenAddForm }: AddCategoryProps) => {
  const { loading, setLoading, setChange, change } =
    useContext(CategoryContext);
  const [descValue, setDescValue] = useState("");
  // Post request
  const postRequest = (
    formData: FormData,
    resetForm: () => void,
    setOpenAddForm: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      axios
        .post("/category", formData)
        .then((res) => {
          if (res.status === 200) {
            resetForm();
            setChange(!change);
            setLoading(false);
            setOpenAddForm(false);
            console.log(res);
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
              Add Category
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
            desc: "",
            image: [],
          }}
          validationSchema={CategorySchema}
          onSubmit={(values: any, { resetForm }) => {
            const formData = new FormData();
            formData.append("image", values.image);
            formData.append("name", values.name);
            formData.append("desc", descValue);
            console.log(values);
            postRequest(formData, resetForm, setOpenAddForm);
          }}
        >
          {({ setFieldValue, values, handleChange }) => (
            <Form id="categories-form" className="grid gap-4 py-4">
              <div className="flex flex-col space-y-2">
                <Field
                  name="name"
                  placeholder="Category Name"
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md outline-none"
                />
                <ErrorMessage
                  component="span"
                  className="text-sm text-red-500"
                  name="name"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Textarea
                  rows={6}
                  onChange={(e) => setDescValue(e.target.value)}
                  placeholder="Type your message here."
                />
              </div>

              <UploadImage
                values={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                label="Upload Logo"
                name="image"
              />

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

export default AddCategory;
