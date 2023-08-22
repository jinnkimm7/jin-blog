/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import { getMDXComponent } from "next-contentlayer/hooks";
import { format, parseISO } from "date-fns";
import { allPosts } from "@/contentlayer/generated";
import Container from "@/components/Container";

// eslint-disable-next-line @typescript-eslint/require-await
export const generateStaticParams = async () =>
  allPosts.map(post => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const post = allPosts.find(post => post._raw.flattenedPath === params.slug);
  return {
    title: `${post?.title} | Jin's blog`,
    description: post?.description,
  };
};

function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(post => post._raw.flattenedPath === params.slug);

  if (!post) {
    return <div>잘못된 페이지 경로입니다!!</div>;
  }

  const MDXContent = getMDXComponent(post.body.code);

  return (
    <Container>
      <article className="prose lg:prose-xl">
        <h1>{post.title}</h1>
        <div className="flex justify-between items-center">
          <p>{format(parseISO(post.createdAt), "LLLL d, yyyy")}</p>
          <span>{post.category}</span>
        </div>
        <MDXContent />
      </article>
    </Container>
  );
}

export default PostDetailPage;
