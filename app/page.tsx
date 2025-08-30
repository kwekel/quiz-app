import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { Link } from "@heroui/link";
import {Divider} from "@heroui/divider";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1>Quiz App</h1>
      <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
      <h1>Quiz App</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>This is a simple quiz app. The quiz contains 5 questions. You get 20 seconds to answer each question. You can answer them and see your score at the end.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
    </section>
  );
}
