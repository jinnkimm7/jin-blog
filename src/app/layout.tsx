import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jin's Blog",
  description:
    "김진형의 블로그에 오신 것을 환영합니다. 🙇‍♂️ 이 곳에서 제가 공부하고 정리한 내용을 포스팅 할 예정입니다. 개발에 관련한 내용이 주를 이룰 예정지만, 이외에 다양한 주제도 다룰 예정입니다.",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
