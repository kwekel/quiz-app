"use client";

import quizAPI from "@/api/quizAPI";
import { useEffect, useState, useRef } from "react";
import { useTimer } from "@/hooks/useTimer";
import { Spinner } from "@heroui/spinner";
import QuizCard from "@/components/quiz-card";
import { RadioGroup, Radio } from "@heroui/radio";
import type { RadioVariantProps } from "@heroui/theme/dist/components/radio";
import TopParticipantRow from "@/components/top-participant";
import { TopParticipant } from "@/types/topParticipant";
import { Button } from "@heroui/button";
import { Question } from "@/types/question";

export default function QuizPage({}) {
  const QUESTION_TIME = 20000;
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showTopParticipants, setShowTopParticipants] =
    useState<boolean>(false);
  const [topParticipants, setTopParticipants] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const quizRef = useRef<Question[]>([]);
  const currentQuestionIndexRef = useRef<number>(0);
  const selectedOptionRef = useRef<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showFinalResults, setShowFinalResults] = useState<boolean>(false);

  const handleTimerComplete = () => {
    checkResult();
    fetchTopParticipants();
  };

  const { timeLeft, stopTimer, resetTimer, restartTimer } = useTimer({
    duration: QUESTION_TIME,
    quiz,
    onComplete: handleTimerComplete,
  });

  const fetchQuizData = async () => {
    const quizData = await quizAPI.getQuizData();
    if (quizData.success) {
      setQuiz(quizData.data);
      quizRef.current = quizData.data;
      setLoading(false);
    } else {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const fetchTopParticipants = async () => {
    const topParticipants = await quizAPI.getTopParticipants(
      currentQuestionIndexRef.current
    );
    if (topParticipants.success) {
      setTopParticipants(topParticipants.data);
    } else {
      setTopParticipants([]);
    }
  };

  const checkResult = () => {
    if (
      quizRef.current[currentQuestionIndexRef.current].options.find(
        (option: any) => option.isCorrect
      )?.option === selectedOptionRef.current
    ) {
      setScore(oldProp => oldProp + 1);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    currentQuestionIndexRef.current = 0;
    setSelectedOption("");
    resetTimer();
    setShowTopParticipants(false);
    setShowFinalResults(false);
    restartTimer();
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(oldProp => oldProp + 1);
    setSelectedOption("");
    currentQuestionIndexRef.current = currentQuestionIndex + 1;
    resetTimer();
    setShowTopParticipants(false);
    restartTimer();
  };

  const handleShowFinalResults = () => {
    setShowFinalResults(true);
  };

  const showParticipantResults = () => {
    setShowTopParticipants(true);
  };

  const getSelectColor = (
    option: any
  ): {
    herouiClass: RadioVariantProps["color"];
    tailwindClass: string;
  } => {
    if (timeLeft > 0) return { herouiClass: "default", tailwindClass: "" };

    if (option.isCorrect && option.option === selectedOption)
      return { herouiClass: "success", tailwindClass: "text-success" };
    if (!option.isCorrect && option.option === selectedOption)
      return { herouiClass: "danger", tailwindClass: "text-danger" };
    return { herouiClass: "default", tailwindClass: "" };
  };

  const buildCorrectAnswerContainer = () => {
    if (
      selectedOptionRef.current !==
        quiz[currentQuestionIndex].options.find(
          (option: any) => option.isCorrect
        )?.option &&
      timeLeft <= 0
    )
      return (
        <p className="text-sm text-gray-500">
          The correct answer is:{" "}
          <span className="font-bold">
            {
              quiz[currentQuestionIndex].options.find(
                (option: any) => option.isCorrect
              )?.option
            }
          </span>
        </p>
      );
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    fetchQuizData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (showFinalResults) {
    return (
      <QuizCard header={<h1>Your results</h1>}>
        <h1>Quiz completed</h1>
        <p>
          Your score is {score}/{currentQuestionIndexRef.current + 1}
        </p>
        <Button
          color="primary"
          className="w-fit"
          onPress={() => {
            resetQuiz();
          }}
        >
          Restart quiz
        </Button>
      </QuizCard>
    );
  }

  if (showTopParticipants) {
    return (
      <QuizCard header={<h1>Top participants</h1>}>
        <>
          {topParticipants.map(
            (topParticipant: TopParticipant, index: number) => (
              <TopParticipantRow
                key={topParticipant.name}
                index={index + 1}
                score={topParticipant.score}
                name={topParticipant.name}
                totalQuestions={currentQuestionIndexRef.current + 1}
              />
            )
          )}
        </>
        <Button
          color="primary"
          className="w-fit"
          onPress={
            currentQuestionIndexRef.current + 1 < quiz.length
              ? handleNextQuestion
              : handleShowFinalResults
          }
        >
          {currentQuestionIndexRef.current + 1 < quiz.length
            ? "Next question"
            : "Show final results"}
        </Button>
      </QuizCard>
    );
  }

  return (
    <QuizCard
      header={
        <div className="flex w-full justify-between items-center">
          <h1>Quiz App</h1>
          <p>Time left: {timeLeft} seconds</p>
        </div>
      }
    >
      <>
        <div className="flex justify-between items-center gap-2">
          <h1>{quiz[currentQuestionIndex].question}</h1>
          <p>
            Your Score: {score}/{currentQuestionIndexRef.current + 1}
          </p>
        </div>
        <RadioGroup
          onValueChange={option => {
            selectedOptionRef.current = option;
            setSelectedOption(option);
          }}
          value={selectedOption}
        >
          {quiz[currentQuestionIndex].options.map((option: any) => (
            <Radio
              key={`${currentQuestionIndex}-${option.option}`}
              color={getSelectColor(option).herouiClass}
              value={option.option}
              isDisabled={timeLeft <= 0 && option.option !== selectedOption}
            >
              <span className={getSelectColor(option).tailwindClass}>
                {option.option}
              </span>
            </Radio>
          ))}
        </RadioGroup>
        {buildCorrectAnswerContainer()}
        <Button
          onPress={timeLeft <= 0 ? showParticipantResults : stopTimer}
          color="primary"
          className="w-fit"
        >
          Show results
        </Button>
      </>
    </QuizCard>
  );
}
