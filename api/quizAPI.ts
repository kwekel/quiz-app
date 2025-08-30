import { Question } from "@/types/question";
import { TopParticipant } from "@/types/top-participant";

const quizAPI = {
  getQuizData: async (): Promise<{ success: boolean; data: Question[] }> => {
    // mock data
    const quizData = [
      {
        question: "What is the capital of France?",
        options: [
          { option: "Paris", isCorrect: true },
          { option: "London", isCorrect: false },
          { option: "Berlin", isCorrect: false },
          { option: "Madrid", isCorrect: false },
        ],
      },
      {
        question: "What is the capital of Germany?",
        options: [
          { option: "Paris", isCorrect: false },
          { option: "London", isCorrect: false },
          { option: "Berlin", isCorrect: true },
          { option: "Madrid", isCorrect: false },
        ],
      },
      {
        question: "What is the capital of Italy?",
        options: [
          { option: "Paris", isCorrect: false },
          { option: "London", isCorrect: false },
          { option: "Berlin", isCorrect: false },
          { option: "Rome", isCorrect: true },
        ],
      },
      {
        question: "What is the capital of Spain?",
        options: [
          { option: "Paris", isCorrect: false },
          { option: "London", isCorrect: false },
          { option: "Berlin", isCorrect: false },
          { option: "Madrid", isCorrect: true },
        ],
      },
      {
        question: "What is the capital of Portugal?",
        options: [
          { option: "Paris", isCorrect: false },
          { option: "London", isCorrect: false },
          { option: "Berlin", isCorrect: false },
          { option: "Lisbon", isCorrect: true },
        ],
      },
    ];
    return { success: true, data: quizData };
  },
  getTopParticipants: async (
    numberOfQuestions: number
  ): Promise<{ success: boolean; data: TopParticipant[] }> => {
    // mock data
    const topParticipants = [
      { name: "John", score: numberOfQuestions + 1 },
      { name: "Jane", score: Math.max(numberOfQuestions, 0) },
      { name: "Jim", score: Math.max(numberOfQuestions, 0) },
      { name: "Jill", score: Math.max(numberOfQuestions - 1, 0) },
      { name: "Jack", score: Math.max(numberOfQuestions - 2, 0) },
    ];
    return { success: true, data: topParticipants };
  },
};

export default quizAPI;
