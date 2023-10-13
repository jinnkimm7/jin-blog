"use client";

import React, { useState } from "react";
import Link from "next/link";

// Post 타입 정의
interface Post {
  _id: string;
  title: string;
  description: string;
  tags?: string[];
  createdAt: string;
}

interface PostListProps {
  posts: Post[];
}

function PostList({ posts }: PostListProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // 선택된 태그에 해당하는 포스트만 필터링
  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter(post => post.tags?.includes(selectedTag));

  // 태그 배열
  const allTags: string[] = posts
    .flatMap(post => post.tags || [])
    .filter((tag): tag is string => typeof tag === "string")
    .sort();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const uniqueTags: string[] = ["All", ...new Set<string>(allTags)];

  return (
    <>
      <ul className="sticky top-3 z-10 bg-white rounded-lg px-3 py-2 flex overflow-x-auto">
        {uniqueTags.map(tag => (
          <li key={tag}>
            <button
              type="button"
              onClick={() => setSelectedTag(tag)}
              // eslint-disable-next-line prettier/prettier
              className={`min-w-max min-h-max rounded-lg px-3 text-lg font-semibold m-1 text-left ${selectedTag === tag ? "bg-gray-400" : "bg-gray-100"}`}>
              {tag}
            </button>
          </li>
        ))}
      </ul>
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
                      className="bg-gray-100 font-semibold px-2 rounded-xl text-blue-700 ml-2"
                      onClick={() => setSelectedTag(tag)} // 버튼을 클릭하면 선택된 태그로 설정
                    >
                      #{tag}
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
    </>
  );
}

export default PostList;
