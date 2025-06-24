"use client";

import { useParams, useRouter } from "next/navigation";
import { fetchFaqs, updateFaq } from "../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CreateFaqInput } from "../faqTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../faqSchema";

const EditFaq = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: faqs, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  const faq = faqs?.find((f) => f._id === id);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateFaqInput>({
    resolver: zodResolver(schema),
    values: {
      question: faq?.question || "",
      answer: faq?.answer || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateFaqInput) => updateFaq(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      router.push("/dashboard/faq");
    },
  });

  if (isLoading || !faq) return <p>Loading FAQ...</p>;

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="space-y-4"
    >
      <h1 className="text-2xl font-bold mb-4">Edit FAQ</h1>

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
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        {mutation.isPending ? "Updating..." : "Update FAQ"}
      </button>
    </form>
  );
};

export default EditFaq;
