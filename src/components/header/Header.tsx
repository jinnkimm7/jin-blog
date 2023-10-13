import Image from "next/image";
import React from "react";
import Navbar from "../navbar/Navbar";

function Header() {
  return (
    <header className="my-4">
      <Navbar />
      <div className="flex border px-3 py-5 rounded-lg mt-3 bg-white">
        <Image
          src="/images/profile.svg"
          width={80}
          height={80}
          alt="프로필 이미지"
          className="border rounded-full px-4 mr-3"
        />
        <p className="text-base text-gray-900">
          김진형의 블로그에 오신 것을 환영합니다. 🙇‍♂️ <br />이 곳에서 제가
          공부하고 정리한 내용을 포스팅 할 예정입니다. 개발에 관련한 내용이 주를
          이룰 예정지만, 이외에 다양한 주제도 다룰 예정입니다.
        </p>
      </div>
    </header>
  );
}

export default Header;
