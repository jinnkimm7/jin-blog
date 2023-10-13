import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="mx-[auto]">
      <Link href="/resume" className="text-lg font-bold animate-pulse">
        ➡️ About Me 🙋‍♂️
      </Link>
      <Link href="/" className="text-4xl font-extrabold text-gray-900">
        <h1>Welcome to Jin&#39;s Blog 🤗</h1>
      </Link>
    </nav>
  );
}

export default Navbar;
