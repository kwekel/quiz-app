import { TopParticipant } from "@/types/topParticipant";

export default function TopParticipantRow({
  index,
  name,
  score,
  totalQuestions,
}: TopParticipant & { index: number; totalQuestions: number }) {
  return (
    <div className="grid grid-cols-2 justify-between">
      <p>{`${index}) ${name}`}</p>
      <p>
        {score}/{totalQuestions}
      </p>
    </div>
  );
}
