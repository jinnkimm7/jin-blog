import Container from "@/components/Container";
import PostList from "@/components/PostList";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <Container>
      <Header />
      <PostList />
    </Container>
  );
}
