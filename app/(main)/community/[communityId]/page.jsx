import CommunityPageClient from "@/components/CommunityPage/CommunityPageClient";

// Server Component
export default function Page({ params }) {
  const { communityId } = params;

  return <CommunityPageClient communityId={communityId} />;
}
