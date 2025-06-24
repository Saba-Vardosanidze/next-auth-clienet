export type Faq = {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateFaqInput = {
  question: string;
  answer: string;
};
