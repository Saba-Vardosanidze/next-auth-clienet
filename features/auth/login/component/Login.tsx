"use client";

import {useMutation} from "@tanstack/react-query";
import {login} from "../api/api";

import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginFormValues, loginSchema} from "../LoginSchema";
import {useRouter} from "next/navigation";

const Login = () => {
  const router = useRouter();

  // ! React hook form
  const {
    handleSubmit,
    control,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ! Query
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login Succsesful : ", data);
      router.push("/dashboard/profile");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
    mutation.mutate(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 max-w-md rounded-md shadow-md border border-gray-300 mx-auto mt-[100px]"
    >
      <h1 className="text-2xl font-semibold">Login</h1>

      <Controller
        name="email"
        control={control}
        render={({field}) => (
          <input
            {...field}
            aria-label="email"
            disabled={isSubmitting}
            className="p-2 border rounded-md"
            type="email"
            placeholder="Enter your email"
          />
        )}
      />
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}

      <Controller
        name="password"
        control={control}
        render={({field}) => (
          <input
            {...field}
            aria-label="password"
            disabled={isSubmitting}
            className="p-2 border rounded-md"
            type="password"
            placeholder="Enter your password"
          />
        )}
      />
      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}

      <button
        disabled={isSubmitting}
        className="bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-gray-50 font-semibold py-2 px-4 rounded-md"
      >
        {isSubmitting ? "Logging in…" : "Login"}
      </button>

      {mutation.error && (
        <p className="text-red-500 mt-2">{(mutation.error as Error).message}</p>
      )}

      {mutation.isSuccess && (
        <p className="text-green-500 mt-2">Login successful! Redirecting...</p>
      )}
    </form>
  );
};

export default Login;
