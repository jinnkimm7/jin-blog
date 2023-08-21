import React from "react";
import Link from "next/link";
import { allPosts } from "@/contentlayer/generated";

function PostList() {
  const {
    props: { posts },
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = getStaticProps();

  return (
    <main>
      <div className="mb-5">{posts.length} posts</div>
      <div className="grid grid-cols-2 gap-10">
        {posts.map(({ _id, title, description, category, createdAt }) => (
          <article
            key={_id}
            className="flex flex-col bg-white rounded-lg p-8 h-[230px]"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs">{createdAt}</span>
              <span className="bg-gray-100 px-2 rounded-xl text-blue-700">
                {category}
              </span>
            </div>
            <div className="flex-grow flex flex-col">
              <Link
                href={`posts/${_id}`}
                className="text-gray-900 text-xl font-bold mb-2 truncate-2-lines"
              >
                {title}
              </Link>
              <p className="truncate-2-lines mt-auto h-[55px]">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export const getStaticProps = () => {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
  );

  return {
    props: {
      posts,
    },
  };
};

export default PostList;
