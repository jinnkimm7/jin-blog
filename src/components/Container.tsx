import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  maxSize: number;
}

function Container({ children, maxSize }: ContainerProps) {
  return <div className={`max-w-${maxSize}xl mx-[auto]`}>{children}</div>;
}

export default Container;
