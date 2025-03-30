import { forwardRef, Ref } from "react";
import { HtmlTextProps } from "./model/types";

const HtmlText = forwardRef<HTMLDivElement, HtmlTextProps>(({ html, id, width, height }, ref: Ref<HTMLDivElement>) => {
  return (
    <div
      id={`htmltext_${id}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        position: "fixed",
        overflow: "hidden",
        left: "100000px",
        top: "100000px",
        padding: "0",
        boxSizing: "border-box",
        fontSize: "14px",
        fontFamily: "inherit",
        lineHeight: "1.42",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        width: width ? `${width - 16}px` : 'auto',
        height: height ? `${height - 16}px` : 'auto',
        maxWidth: width ? `${width - 16}px` : 'none',
        maxHeight: height ? `${height - 16}px` : 'none'
      }}
      ref={ref}
    ></div>
  );
});

export default HtmlText;
