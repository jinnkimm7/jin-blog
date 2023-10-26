/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import { getMDXComponent } from "next-contentlayer/hooks";
import { format, parseISO, compareDesc } from "date-fns";
import { allPosts } from "@/contentlayer/generated";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Comment from "@/components/comment/Comment";
import PageMover from "@/components/pageMover/PageMover";

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

  const sortedPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
  );

  // 이전 포스팅과 다음 포스팅의 정보 계산
  const allPostSlugs = sortedPosts.map(post => post._raw.flattenedPath);
  const currentIndex = allPostSlugs.findIndex(slug => slug === params.slug);
  const prevSlug =
    currentIndex < allPostSlugs.length - 1
      ? allPostSlugs[currentIndex + 1]
      : null;
  const prevTitle = prevSlug
    ? allPosts.find(post => post._raw.flattenedPath === prevSlug)?.title ?? null
    : null;

  const nextSlug = currentIndex > 0 ? allPostSlugs[currentIndex - 1] : null;
  const nextTitle = nextSlug
    ? allPosts.find(post => post._raw.flattenedPath === nextSlug)?.title ?? null
    : null;

  if (!post) {
    return <div>잘못된 페이지 경로입니다!!</div>;
  }

  const MDXContent = getMDXComponent(post.body.code);

  return (
    <div className="max-w-3xl mx-auto">
      <Navbar />
      <article
        className="
          bg-white p-5 my-5 rounded-xl
          prose lg:prose-xl md:prose-xl
          prose-blockquote:bg-gray-100 prose-blockquote:rounded-xl prose-blockquote:not-italic
          prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl
          prose-em:text-red-500 prose-em:font-bold prose-em:bg-gray-100 prose-em:rounded-xl prose-em:p-1 prose-em:not-italic
        "
      >
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
      <PageMover
        prevSlug={prevSlug}
        nextSlug={nextSlug}
        prevTitle={prevTitle}
        nextTitle={nextTitle}
      />
      <Comment />
      <Footer />
    </div>
  );
}

export default PostDetailPage;
