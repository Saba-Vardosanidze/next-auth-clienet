"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Faq } from "../faqTypes";
import { deleteFaq, fetchFaqs } from "../api/api";
import { useState } from "react";
import toast from "react-hot-toast";
import DeleteModal from "./DeleteModal";
import Link from "next/link";

const FaqList = () => {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery<Faq[]>({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  const mutation = useMutation({
    mutationFn: deleteFaq,
    onSuccess: () => {
      toast.success("FAQ deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },

    onError: () => {
      toast.error("Failted to delete FAQ");
    },
  });

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load FAQs</p>;

  return (
    <>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-[120px] mt-[100px]">
        {data?.map((faq) => (
          <div key={faq._id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{faq.question}</h2>
            <p>{faq.answer}</p>
            <p className="text-xs text-gray-500 mt-auto pt-2">
              Createt at : {new Date(faq.createdAt).toLocaleString()}
            </p>
            <div className="flex justify-between w-full flex-row-reverse">
              <button
                className="text-red-600 text-sm font-medium cursor-pointer"
                onClick={() => handleDelete(faq._id)}
              >
                Delete
              </button>
              <Link href={`/dashboard/faq/${faq._id}/edit`}>Edit</Link>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        isOpen={!!deleteId}
        setIsOpen={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) mutation.mutate(deleteId);
        }}
      />
    </>
  );
};

export default FaqList;
