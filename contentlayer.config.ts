import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    category: { type: "string", required: true },
    createdAt: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      // eslint-disable-next-line no-underscore-dangle
      resolve: post => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

const contentSource = makeSource({
  // 마크다운 파일이 저장되어 있는 루트 폴더
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
        },
      ],
      highlight,
    ],
  },
});

export default contentSource;
