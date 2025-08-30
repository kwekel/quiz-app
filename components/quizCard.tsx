import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";

interface QuizCardProps {
    children: string | React.ReactNode;
    header: string | React.ReactNode;
}

export default function QuizCard({ children, header }: QuizCardProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex gap-3">
        {header}
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4">
        {children}
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/kwekel/quiz-app"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}
