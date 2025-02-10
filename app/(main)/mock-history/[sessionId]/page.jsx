import MockTestDetailsClient from "./MockTestDetailsClient";

export default async function Page({ params }) {
  const { sessionId } = await params; // Extract sessionId from params

  return <MockTestDetailsClient sessionId={sessionId} />;
}
