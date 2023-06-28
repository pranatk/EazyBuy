import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Image from "next/image";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [error, setError] = useState(null);
  const [open, handleOpen] = useState(true);

  const handleClick = () => {
    handleOpen((prev) => !prev);
  };
  if (!session) {
    return (
      <div className=" flex flex-col items-end w-screen h-screen justify-center bg-secondary-medium borde">
        <div className="flex flex-col items-center justify-center w-[50%] h-full bg-secondary-grey p-4 border rounded-[.75rem]">
          <div className="text-secondary-grey flex flex-col justify-between py-12 w-[50%]  px-10 border rounded-[.75rem] bg-secondary-medium">
            <div>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .max(30, "Must be 30 characters or less")
                    .email("Invalid email address")
                    .required("Please enter your email"),
                  password: Yup.string().required("Please enter your password"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  const res = await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                    callbackUrl: `${window.location.origin}`,
                  });

                  if (res?.error) {
                    setError(res.error);
                  } else {
                    setError(null);
                  }
                  if (res.url) router.push(res.url);
                  setSubmitting(false);
                }}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <div className="">
                      <div className="">
                        <div className="text-red-400 text-md text-center rounded p-2">
                          {error}
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="uppercase text-sm text-gray-600 font-bold"
                          >
                            Email
                            <Field
                              name="email"
                              aria-label="enter your email"
                              aria-required="true"
                              type="text"
                              className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg "
                            />
                          </label>

                          <div className="text-red-600 text-sm">
                            <ErrorMessage name="email" />
                          </div>
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="password"
                            className="uppercase text-sm text-gray-600 font-bold"
                          >
                            password
                            <Field
                              name="password"
                              aria-label="enter your password"
                              aria-required="true"
                              type="password"
                              className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg "
                            />
                          </label>

                          <div className="text-red-600 text-sm">
                            <ErrorMessage name="password" />
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            type="submit"
                            className=" text-gray-100 p-3 rounded-lg w-full bg-orange-300"
                          >
                            {formik.isSubmitting ? "Please wait..." : "Sign In"}
                          </button>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                          <button
                            onClick={() => signIn("google")}
                            className=" bg-orange-300 text-gray-100 p-3 rounded-lg w-full"
                          >
                            Sign In with Google
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //Add providerId in signIn to avoid the extra signin page

  return (
    <div className="flex min-w-screen min-h-screen flex-1">
      <Navbar handleClick={handleClick} open={open} />
      <div className="flex flex-col flex-1 ">
        <div className="flex justify-between pr-6 bg-secondary-medium py-4 h-[60px] text-white">
          <div className="flex  items-center">
            {!open && (
              <>
                <div className=" text-white">
                  <Image src="/eazybuy.svg" width="24" height="24" />
                </div>

                <div className="text-xl font-bold text-white align-middle mr-2">
                  EasyBuy
                </div>
              </>
            )}

            <div>Shop Smarter, Shop EazyBuy!</div>
          </div>
          <div className="flex">
            {session && (
              <Image
                src={`${
                  session.user.image ? session.user.image : "/profile.png"
                }`}
                width="32"
                height="32"
              ></Image>
            )}
            <div className="mx-2 hidden md:block">
              Welcome{" "}
              {session && session.user.name
                ? session.user.name.split(" ")[0]
                : session.user.first_name}
              !
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
              className="border text-sm px-4 ml-2 md:ml-0"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="flex flex-1 p-2">{children}</div>
      </div>
    </div>
  );
}
