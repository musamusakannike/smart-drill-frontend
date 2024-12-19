import QuestionList from "@/components/ui/QuestionList";

// Server Component
export default function Page({ params }) {
  const { course } = params;

  return <QuestionList course={course} />;
}
