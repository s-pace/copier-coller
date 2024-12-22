import clsx from "clsx";
import React, { ComponentPropsWithoutRef } from "react";

type H1Props = ComponentPropsWithoutRef<"h1">;

const Title: React.FC<H1Props> = ({ children, className, ...props }) => {
  return (
    <h1
      className={clsx(
        "my-4 text-center text-4xl font-bold hover:text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Title;
