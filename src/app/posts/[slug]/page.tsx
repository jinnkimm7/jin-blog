/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import { getMDXComponent } from "next-contentlayer/hooks";
import { format, parseISO } from "date-fns";
import { allPosts } from "@/contentlayer/generated";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
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
    <Container maxSize={3}>
      <Navbar />
      <article className="prose lg:prose-xl bg-white p-5 my-5 rounded-xl">
        <h1>{post.title}</h1>
        <div className="flex justify-between items-center">
          <p>{format(parseISO(post.createdAt), "LLLL d, yyyy")}</p>
          <div>
            {post.tags?.map(tag => (
              <span className="bg-gray-100 px-2 rounded-xl text-blue-700 font-semibold ml-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <MDXContent />
      </article>

      <Footer />
    </Container>
  );
}

export default PostDetailPage;
