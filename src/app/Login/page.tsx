"use client";

import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import * as Yup from "yup";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.ok) {
        window.location.href = "/dasboard";
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {formik.errors.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        {formik.errors.password && (
          <div className="text-red-500">{formik.errors.password}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
