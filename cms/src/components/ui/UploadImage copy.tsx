import { ErrorMessage } from "formik";
import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";

type Props = {
  handleChange: any;
  setFieldValue: any;
  values: any;
  label: string;
  variant: "single" | "multiple";
};

const UploadImage = ({
  values,
  handleChange,
  setFieldValue,
  label,
  variant,
}: Props) => {
  useEffect(() => {
    console.log(values.image, "useeffect");
  });
  return (
    <>
      <span className="text-base font-medium"> {label}</span>
      <div className="relative flex flex-col items-center justify-center w-full p-2 border border-gray-300 rounded-lg h-28">
        <div className="flex items-center justify-center w-full grid-cols-3 gap-6">
          {values?.image.length > 0 ? (
            variant === "multiple" &&
            values.image.map((image: File, index: number) => {
              return (
                <div className="h-24 p-3 " key={index}>
                  <img src={URL.createObjectURL(image)} className="h-full" />
                  <span
                    onClick={() => {
                      let value = values.image;
                      value.splice(index, 1);
                      setFieldValue("image", [...value]);
                    }}
                    className="absolute text-lg text-gray-600 transition cursor-pointer hover:text-gray-700 top-4 right-4"
                  >
                    <AiOutlineDelete className="text-red-500" />
                  </span>
                </div>
              );
            })
          ) : values.image instanceof File ? (
            <div className="h-24 p-3 ">
              <img src={URL.createObjectURL(values.image)} className="h-full" />
              <span
                onClick={() => {
                  setFieldValue("image", []);
                }}
                className="absolute text-lg text-gray-600 transition cursor-pointer hover:text-gray-700 top-4 right-4"
              >
                <AiOutlineDelete className="text-red-500" />
              </span>
            </div>
          ) : (
            <label
              htmlFor="imageInput"
              className="flex items-center justify-center w-10 h-10 text-xl text-white bg-blue-600 rounded-full cursor-pointer"
            >
              <BiUpload />
            </label>
          )}
        </div>

        {variant == "multiple" ? (
          <input
            id="imageInput"
            type="file"
            name="image"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                const file = files[0];
                e.target.value = "";
                handleChange(e);
                setFieldValue("image", [file]);
              }
            }}
            className="hidden p-2 border border-gray-200 rounded outline-none"
          />
        ) : (
          <input
            id="imageInput"
            type="file"
            name="image"
            className="hidden p-2 border border-gray-200 rounded outline-none"
            onChange={(e: any) => {
              handleChange(e);
              setFieldValue("image", e.target.files[0]);
              console.log(e.target.files[0]);
              e.target.value = "";
            }}
          />
        )}
      </div>

      <ErrorMessage
        name="image"
        component="div"
        className="text-xs text-red-400 "
      />
    </>
  );
};

export default UploadImage;
