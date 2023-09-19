import { compareDesc } from "date-fns";
import Container from "@/components/Container";
import PostList from "@/components/PostList";
import Header from "@/components/header/Header";
import { allPosts } from "@/contentlayer/generated";

export default function Home() {
  // allPosts를 Post[] 타입으로 변환
  const posts = allPosts
    .map(post => ({
      ...post,
      description: post.description || "", // description이 없을 경우 빈 문자열로 설정
    }))
    .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));

  return (
    <Container>
      <Header />
      <PostList posts={posts} />
    </Container>
  );
}
