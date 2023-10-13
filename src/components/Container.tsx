import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="max-w-4xl mx-auto">{children}</div>;
}

export default Container;
