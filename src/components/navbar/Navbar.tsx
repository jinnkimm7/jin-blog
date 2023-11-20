import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="mx-[auto]">
      <Link
        href="https://jinnkimm7.notion.site/8e758e868dc64f80b3bf413bbe031b2b?pvs=4"
        className="text-lg font-bold animate-pulse"
      >
        ➡️ About Me 🙋‍♂️
      </Link>
      <Link href="/" className="text-4xl font-extrabold text-gray-900">
        <h1>Welcome to Jin&#39;s Blog 🤗</h1>
      </Link>
    </nav>
  );
}

export default Navbar;
