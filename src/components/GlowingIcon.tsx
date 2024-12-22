import React, { ReactNode } from "react";

type GlowingIconProps = {
  children?: ReactNode;
};

const GlowingIcon: React.FC<GlowingIconProps> = ({
  children,
}: GlowingIconProps) => {
  return <span className="glowing-icon">{children?.toString() ?? "🥖"}</span>;
};

export default GlowingIcon;
