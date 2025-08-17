import React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Image = (props: ImageProps) => {
  return <img loading="lazy" {...props} />;
};

export default Image;
