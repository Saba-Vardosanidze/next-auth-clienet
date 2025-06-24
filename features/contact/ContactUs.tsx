"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {ContactSchema, contactSchema} from "./contactSchema";
import {useMutation} from "@tanstack/react-query";
import {sendContactMessage} from "./api/contactApi";
import {useRouter} from "next/navigation";

const ContactUs = () => {
  const router = useRouter();
  const {handleSubmit, register} = useForm({
    resolver: zodResolver(contactSchema),
  });
  const mutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      router.push("/");
    },
  });
  const onSubmit: SubmitHandler<ContactSchema> = (data) => {
    mutation.mutate(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[30px] m-auto mt-[50px] max-w-[400px] w-full"
      >
        <input
          type="text"
          placeholder="name"
          className="bg-white max-w-[400px] w-full min-h-[50px] outline-none rounded-[10px] text-black px-[10px]"
          {...register("name")}
        />
        <input
          type="text"
          placeholder="email"
          className="bg-white max-w-[400px] w-full min-h-[50px] outline-none rounded-[10px] text-black px-[10px]"
          {...register("email")}
        />
        <input
          type="text"
          placeholder="message"
          className="bg-white max-w-[400px] w-full min-h-[50px] outline-none rounded-[10px] text-black px-[10px]"
          {...register("message")}
        />
        <input
          type="text"
          placeholder="phone"
          className="bg-white max-w-[400px] w-full min-h-[50px] outline-none rounded-[10px] text-black px-[10px]"
          {...register("phone")}
        />
        <button
          type="submit"
          className="max-w-[400px] w-full min-h-[50px] bg-blue-400 rounded-[10px] cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
