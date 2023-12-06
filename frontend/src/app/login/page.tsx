"use client";
import { Field, Form, Formik } from "formik";
import axios from "@/hoc/axios";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { useLoginStatusContext } from "@/hoc/context/LoginStatusContextProvicer";
const Login = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { change, setChange } = useLoginStatusContext();

  return (
    <div className="flex flex-col justify-center h-screen px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <Image src="/jobhuntlogo.png" width={200} height={200} alt="logo" />
        </Link>
        <h2 className="text-lg font-medium tracking-tight text-center text-gray-900 ">
          Sign in to Jobhunt
        </h2>
      </div>
      <div className="p-8 mt-4 bg-white rounded-md shadow-md sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            try {
              axios
                .post("/auth/companylogin", values, {
                  withCredentials: true,
                })
                .then((res) => {
                  if (res.data.status === "success") {
                    setChange(!change);
                    router.push("/");
                  } else {
                    toast({
                      description: "Invalid email or password",
                    });
                  }
                })
                .catch((error) => {
                  toast({
                    description: "Invalid email or password",
                  });
                });
            } catch (error) {
              console.log("Something went wrong");
            }
          }}
        >
          {({}) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full p-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full p-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-center text-gray-500 ">
          <Link
            href="/create-company"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Not a member?
          </Link>
        </p>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
