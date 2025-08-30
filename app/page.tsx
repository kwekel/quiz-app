import QuizCard from "@/components/quizCard";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1>Quiz App</h1>
      <QuizCard header={<h1>Quiz App</h1>}>
        <>
          <p>
            This is a simple quiz app. The quiz contains 5 questions. You get 20
            seconds to answer each question. You can answer them and see your
            score at the end.
          </p>
          <Button
            color="primary"
            className="w-fit mt-4"
            as={Link}
            href={"/quiz"}
          >
            Start Quiz
          </Button>
        </>
      </QuizCard>
    </section>
  );
}
