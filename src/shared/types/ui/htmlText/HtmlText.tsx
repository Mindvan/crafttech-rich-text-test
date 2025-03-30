import { forwardRef, Ref } from "react";
import { HtmlTextProps } from "./model/types";

const HtmlText = forwardRef<HTMLDivElement, HtmlTextProps>(({ html, id }, ref: Ref<HTMLDivElement>) => {
  return (
    <div
      id={`htmltext_${id}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        position: "fixed",
        overflow: "hidden",
        left: "100000px",
        top: "100000px",
      }}
      ref={ref}
    ></div>
  );
});

export default HtmlText;
