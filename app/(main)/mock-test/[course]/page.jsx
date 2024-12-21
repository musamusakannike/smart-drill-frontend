import MockTestClient from "@/components/MockTestPage/MockTestClient";

// Server Component
export default function Page({ params }) {
  const { course } = params; // Safe as migration still supports direct access

  return <MockTestClient course={course} />;
}
