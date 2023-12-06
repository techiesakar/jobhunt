import { ErrorMessage, Field, Form, Formik } from "formik";

import { GrClose } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

import { CategoryContext } from "@/hoc/context/CategoryContextProvider";
import axios from "@/hoc/axios";
import { useContext, useState } from "react";
import UploadImage from "@/components/ui/UploadImage";
import { Textarea } from "@/components/ui/textarea";
import { CategoryType } from "@/types/Types";

type PropsType = {
  currentCategory: any;
  setCurrentCategory: any;
};

const EditCategory = ({ currentCategory, setCurrentCategory }: PropsType) => {
  const { loading, setLoading, setChange, change } =
    useContext(CategoryContext);
  const [descValue, setDescValue] = useState(currentCategory.desc);

  const patchRequest = (
    values: CategoryType,
    resetForm: () => void,
    setCurrentCategory: any
  ) => {
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("name", values.name);
    formData.append("desc", descValue);

    try {
      setLoading(true);
      axios
        .patch(`/category/${values.id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            setCurrentCategory("");
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
              Edit Category
            </h2>
            <span
              className="p-3 rounded-full cursor-pointer hover:bg-slate-100"
              onClick={() => {
                setCurrentCategory(null);
              }}
            >
              <GrClose />
            </span>
          </div>
        </div>
        <Formik
          initialValues={{
            id: currentCategory?.id || "",
            name: currentCategory?.name || "",
            desc: currentCategory?.desc || "",
            image: currentCategory?.image || [],
          }}
          onSubmit={(values: CategoryType, { resetForm }) => {
            patchRequest(values, resetForm, setCurrentCategory);
          }}
        >
          {({ setFieldValue, handleChange, values }) => (
            <Form
              id="category-form"
              name="category"
              className="grid gap-4 py-4"
            >
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
                  name="desc"
                  rows={6}
                  onChange={(e) => setDescValue(e.target.value)}
                  placeholder="Type your message here."
                  defaultValue={values.desc}
                />
              </div>

              <UploadImage
                values={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                label="Change Logo"
                name="image"
              />
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

export default EditCategory;
