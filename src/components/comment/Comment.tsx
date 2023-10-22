"use client";

import Giscus from "@giscus/react";

function Comment() {
  return (
    <Giscus
      repo="jinnkimm7/jin-blog"
      repoId="R_kgDOKHDJhA"
      category="General"
      categoryId="DIC_kwDOKHDJhM4CaV9R"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}

export default Comment;
