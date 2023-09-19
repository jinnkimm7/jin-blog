"use client";

import React, { useState } from "react";
import Link from "next/link";
import { compareDesc } from "date-fns";
import { allPosts } from "@/contentlayer/generated";

function PostList() {
  const [selectedTag, setSelectedTag] = useState("");

  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
  );

  // 선택된 태그에 해당하는 포스트만 필터링
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags?.includes(selectedTag))
    : posts;

  return (
    <main>
      <div className="my-5">{filteredPosts.length} posts</div>
      <div className="grid grid-cols-2 gap-10">
        {filteredPosts.map(({ _id, title, description, tags, createdAt }) => (
          <article
            key={_id}
            className="flex flex-col bg-white rounded-lg p-8 h-[230px] hover:shadow-md hover:transform hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs">{createdAt}</span>
              <div>
                {tags?.map(tag => (
                  <button
                    type="button"
                    key={tag}
                    className="bg-gray-100 px-2 rounded-xl text-blue-700 ml-2"
                    onClick={() => setSelectedTag(tag)} // 버튼을 클릭하면 선택된 태그로 설정
                  >
                    {tag}
                  </button>
                ))}
              </div>
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
