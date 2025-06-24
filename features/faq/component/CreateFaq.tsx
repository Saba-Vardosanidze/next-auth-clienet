"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { schema } from "../faqSchema";
import { CreateFaqInput } from "../faqTypes";
import { createFaq } from "../api/api";

const CreateFaq = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFaqInput>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: createFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      router.push("/dashboard/faq");
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-[120px] mt-[100px]"
    >
      <div>
        <label>Question</label>
        <input {...register("question")} className="w-full border p-2" />
        {errors.question && (
          <p className="text-red-500 text-sm">{errors.question.message}</p>
        )}
      </div>
      <div>
        <label>Answer</label>
        <textarea {...register("answer")} className="w-full border p-2" />
        {errors.answer && (
          <p className="text-red-500 text-sm">{errors.answer.message}</p>
        )}
      </div>
      <button
        disabled={mutation.isPending}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        {mutation.isPending ? "Creating..." : "Create FAQ"}
      </button>
    </form>
  );
};

export default CreateFaq;
