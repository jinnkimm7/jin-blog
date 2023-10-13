import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav>
      <Link href="/resume" className="text-lg font-bold animate-pulse">
        ➡️ About Me 🙋‍♂️
      </Link>
      <h1 className="text-4xl font-extrabold text-gray-900">
        Welcome to Jin&#39;s Blog 🤗
      </h1>
    </nav>
  );
}

export default Navbar;
