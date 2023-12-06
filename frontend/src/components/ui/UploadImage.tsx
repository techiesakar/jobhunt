import { ErrorMessage } from "formik";
import { AiOutlineDelete } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";

type PropsType = {
  handleChange: any;
  setFieldValue: any;
  values: any;
  label?: string;
  name: string;
};

const UploadImage = ({
  values,
  handleChange,
  setFieldValue,
  label,
  name,
}: PropsType) => {
  const isBrowser = typeof window !== "undefined";

  return (
    <div className="flex flex-col gap-4 max-w-[420px]">
      <h2 className="text-base font-medium"> {label}</h2>
      <div className="relative flex flex-col items-center justify-center w-full p-2 border border-gray-300 rounded-lg h-28">
        <div className="flex items-center justify-center w-full grid-cols-3 gap-6">
          {values[`${name}`].length > 0 ? (
            <div className="h-24 p-3 ">
              <img
                src={`http://localhost:4002/public/${values[`${name}`]}`}
                className="h-full"
              />
              <span
                onClick={() => {
                  setFieldValue(name, []);
                }}
                className="absolute text-lg text-gray-600 transition cursor-pointer hover:text-gray-700 top-4 right-4"
              >
                <AiOutlineDelete className="text-red-500" />
              </span>
            </div>
          ) : isBrowser && values[`${name}`] instanceof File ? (
            <div className="h-24 p-3 ">
              <img
                src={URL.createObjectURL(values[`${name}`])}
                className="h-full"
              />
              <span
                onClick={() => {
                  setFieldValue(name, []);
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
      </div>

      <input
        id="imageInput"
        type="file"
        name={name}
        className="hidden p-2 border border-gray-200 rounded outline-none"
        onChange={(e: any) => {
          handleChange(e);
          setFieldValue(name, e.target.files[0]);
          console.log(e.target.files[0]);
          e.target.value = "";
        }}
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-xs text-red-400 "
      />
    </div>
  );
};

export default UploadImage;
