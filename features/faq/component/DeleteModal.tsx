"use client";

import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-md shadow-lg w-full max-w-sm p-6 cursor-default"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 text-red-600 p-2 rounded-full">
                <FiTrash2 className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              Are you sure you want to delete this FAQ? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  setIsOpen(false);
                }}
                className="px-4 py-2 rounded text-sm bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
