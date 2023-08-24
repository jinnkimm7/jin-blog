import React from "react";
import Link from "next/link";
import { compareDesc } from "date-fns";
import { allPosts } from "@/contentlayer/generated";

function PostList() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
  );

  return (
    <main>
      <div className="my-5">{posts.length} posts</div>
      <div className="grid grid-cols-2 gap-10">
        {posts.map(({ _id, title, description, category, createdAt }) => (
          <article
            key={_id}
            className="flex flex-col bg-white rounded-lg p-8 h-[230px] hover:shadow-md hover:transform hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs">{createdAt}</span>
              <span className="bg-gray-100 px-2 rounded-xl text-blue-700">
                {category}
              </span>
            </div>
            <Link
              href={`posts/${_id.replace(/\.md$/, "")}`}
              className="flex-grow flex flex-col"
            >
              <h3 className="line-clamp-2 text-gray-900 text-xl font-bold mb-2 h-[55px]">
                {title}
              </h3>
              <p className="line-clamp-2 mt-auto h-[54px]">{description}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export default PostList;
