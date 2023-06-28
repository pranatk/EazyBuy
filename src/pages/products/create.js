import Layout from "@/src/components/Layout";
import { Formik, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Products() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const initialValues = {
    name: "",
    description: "",
    category: "",
    price: 0,
    quantity: 0,
    images: [],
    tags: [],
  };
  const [imageURLs, setImageURLs] = useState([]);
  const handleImageUpload = (event, push) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageDataURL = e.target.result;
      push(imageDataURL);
      setImageURLs([...imageURLs, imageDataURL]);
    };

    reader.readAsDataURL(file);
  };
  return (
    <Layout>
      <div className="flex-1 ">
        <div className="flex flex-col items-center justify-center w-full h-full p-4 ">
          <div className="text-secondary-grey flex flex-col justify-between py-6 px-10 border rounded-[.75rem] bg-secondary-medium">
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Name is required"),
                  description: Yup.string().required("Description is required"),
                  category: Yup.string().required("Category is required"),
                  price: Yup.number().required("Price is required"),
                })}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                  const res = await fetch("/api/products", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  });
                  if (res?.error && res.status != 201) {
                    setError(res.error);
                  } else {
                    resetForm();
                    setError(null);
                    alert("Product Created");
                    setTimeout(() => {
                      router.push("/products");
                    }, 2);
                  }
                }}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <div className="text-red-400 text-md text-center rounded">
                      {error}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="uppercase text-sm text-gray-600 font-bold"
                      >
                        Name
                        <Field
                          name="name"
                          aria-label="enter product name"
                          aria-required="true"
                          type="text"
                          className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg "
                        />
                      </label>

                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="Name" />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="description"
                        className="uppercase text-sm text-gray-600 font-bold"
                      >
                        Description
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg "
                        />
                      </label>

                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="description" />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="category"
                        className="uppercase text-sm text-gray-600 font-bold"
                      >
                        Category
                        <Field
                          as="select"
                          id="category"
                          name="category"
                          className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg "
                        >
                          <option value="">Select a category</option>
                          <option value="electronics">Electronics</option>
                          <option value="clothing">Clothing</option>
                          <option value="accessories">Accessories</option>
                        </Field>
                      </label>

                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="category" />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="price"
                        className="uppercase text-sm text-gray-600 font-bold"
                      >
                        Price
                        <Field
                          name="price"
                          aria-label="set price"
                          aria-required="true"
                          type="number"
                          className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg "
                        />
                      </label>

                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="price" />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="quantity"
                        className="uppercase text-sm text-gray-600 font-bold"
                      >
                        Quantity
                        <Field
                          name="quantity"
                          aria-label="set quantity"
                          aria-required="true"
                          type="number"
                          className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg "
                        />
                      </label>

                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="quantity" />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="tags"
                        className="uppercase text-sm text-gray-600 font-bold"
                      >
                        Tags
                      </label>
                      <FieldArray name="tags">
                        {({ push, remove }) => {
                          return (
                            <div className="">
                              <div
                                className={` ${
                                  formik.values.tags.length > 0
                                    ? " mb-4 mr-4"
                                    : ""
                                }`}
                              >
                                <div className="flex flex-row my-1">
                                  {formik.values.tags.map((tag, index) => {
                                    return (
                                      <div className="bg-gray-300 border mr-2 rounded-lg p-2 text-gray-800 flex">
                                        <div>{tag}</div>
                                        <div className="flex items-center ">
                                          <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="inline-block text-sm ml-4"
                                          >
                                            X
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="w-full flex justify-between p-2 mt-2 border rounded-lg bg-gray-300 text-gray-800">
                                <input
                                  type="text"
                                  id="tag"
                                  accept="image/*"
                                  className="bg-transparent border border-transparent"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    push(document.getElementById("tag").value);
                                    document.getElementById("tag").value = "";
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          );
                        }}
                      </FieldArray>
                      <ErrorMessage name="images" component="div" />
                    </div>
                    <div className="mb-6">
                      <FieldArray name="images">
                        {({ push, remove }) => (
                          <div>
                            <div
                              className={` ${
                                imageURLs.length > 0 ? "p-2 mb-4" : ""
                              }`}
                            >
                              {formik.values.images.map((image, index) => (
                                <div key={index} className="flex flex-row my-1">
                                  <div>
                                    <img
                                      src={imageURLs[index]}
                                      alt={`Image ${index + 1}`}
                                      className={`w-10 h-10 inline-block`}
                                    />
                                  </div>
                                  <div className="flex items-center ">
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="inline-block text-sm text-gray-300 ml-4"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <input
                              type="file"
                              id="imagesId"
                              accept="image/*"
                              className="hidden"
                              multiple
                              onChange={(event) =>
                                handleImageUpload(event, push)
                              }
                            />
                            <label
                              htmlFor="imagesId"
                              className="inline-block mt-2 p-2 bg-gray-300 text-gray-800 w-full text-center border rounded-lg cursor-pointer"
                            >
                              Upload Images
                            </label>
                          </div>
                        )}
                      </FieldArray>
                      <ErrorMessage name="images" component="div" />
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        type="submit"
                        className=" text-gray-100 p-3 rounded-lg w-full bg-orange-300"
                      >
                        {formik.isSubmitting ? "Please wait..." : "Submit"}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
