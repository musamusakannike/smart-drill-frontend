import CommunityPageClient from "@/components/CommunityPage/CommunityPageClient";

// Server Component
export default async function Page({ params }) {
  const { communityId } = await params;

  return <CommunityPageClient communityId={communityId} />;
}
