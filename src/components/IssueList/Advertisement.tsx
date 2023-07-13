import { ForwardedRef, forwardRef } from "react";
import { IssueItemCard } from "../common/IssueItem";

const Advertisement = forwardRef((_, ref: ForwardedRef<HTMLImageElement>) => {
  return (
    <IssueItemCard>
      <a href="https://www.wanted.co.kr/">
        <img
          ref={ref}
          src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=300&q=100"
          alt="advertisement"
        />
      </a>
    </IssueItemCard>
  );
});

export default Advertisement;
