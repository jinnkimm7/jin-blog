import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col items-center mt-10 p-12 border-t-[3px] border-white">
      <ul className="flex w-[200px] justify-between m-2 font-semibold text-blue-700">
        <li>
          <Link href="https://github.com/jinnkimm7" target="_blank">
            GitHub
          </Link>
        </li>
        <li>
          <Link href="/resume">Resume</Link>
        </li>
      </ul>
      <span>Copyright ©2023 Jin&#39;s Blog Powered by Next.js, Vercel</span>
    </footer>
  );
}

export default Footer;
