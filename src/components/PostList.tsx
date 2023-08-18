import React from "react";
import Link from "next/link";
import getSortedPostsData from "../hooks/useGetSortedPostsData";

function PostList() {
  const allPostsData = getSortedPostsData();
  // console.log(allPostsData);
  return (
    <main className="max-w-4xl mx-[auto] my-10">
      <div className="mb-5">{allPostsData.length} posts</div>
      <div className="grid grid-cols-2 gap-10">
        {allPostsData.map(({ id, title, description, category, createdAt }) => (
          <article
            key={id}
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
                href={`posts/${id}`}
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

export default PostList;
