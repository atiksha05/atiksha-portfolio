import type { Metadata } from "next";
import { MyStoryContent } from "@/components/my-story/MyStoryContent";
import { myStoryPage } from "@/data/myStoryPage";

export const metadata: Metadata = {
  title: `${myStoryPage.title} — Atiksha Antil`,
  description: myStoryPage.tagline,
};

export default function MyStoryPage() {
  return <MyStoryContent />;
}
