import Link from "next/link";
import React from "react";

function PageMover({
  prevSlug,
  nextSlug,
  prevTitle,
  nextTitle,
}: {
  prevSlug: string | null;
  nextSlug: string | null;
  prevTitle: string | null;
  nextTitle: string | null;
}) {
  return (
    <div
      // eslint-disable-next-line prettier/prettier
      className={`${prevSlug && nextSlug ? "flex justify-between" : ""
        // eslint-disable-next-line prettier/prettier
        } bg-white rounded-lg p-5 mb-8`}
    >
      {prevSlug && (
        <Link href={`/posts/${prevSlug}`} className="text-left">
          <div className="text-xl font-bold">⬅ 이전 포스트</div>
          <div>{prevTitle}</div>
        </Link>
      )}
      {nextSlug && (
        <Link href={`/posts/${nextSlug}`} className="text-right">
          <div className="text-xl font-bold">다음 포스트 ➡️</div>
          <div>{nextTitle}</div>
        </Link>
      )}
    </div>
  );
}

export default PageMover;
