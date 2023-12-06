import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/hoc/axios";
import { useUserContext } from "@/hoc/context/UserContextProvider";
import { useEffect } from "react";
import Logo from "@assets/images/jobhuntlogo.png";
import Cookies from "js-cookie";

const SignIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", {
        replace: true,
      });
    }
  }, [localStorage]);

  const { setCurrentUserID } = useUserContext();
  return (
    <div className="flex flex-col justify-center h-screen px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2">
          <img className="w-[200px]" src={Logo} alt="" />
        </Link>
        <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900 ">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            try {
              axios
                .post("/auth/superlogin", values)
                .then((res) => {
                  Cookies.set("token", res.data.token, { expires: 1 / 24 }); // 1 hour expiration

                  if (res.status === 200) {
                    setCurrentUserID(res.data.id);
                    navigate("/");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } catch (error) {
              console.log(error);
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
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
      </div>
    </div>
  );
};

export default SignIn;
