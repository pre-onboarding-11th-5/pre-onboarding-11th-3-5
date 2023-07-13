import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Issue } from "../../types/issue";
import { styled } from "styled-components";

interface ContentProps {
  issue?: Issue;
}

function Content({ issue }: ContentProps) {
  return (
    <ContentWrapper>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {issue ? issue.body : "이슈 본문을 불러오는 중입니다..."}
      </ReactMarkdown>
    </ContentWrapper>
  );
}

export default Content;

const ContentWrapper = styled.div`
  max-width: 90%;
  * {
    max-width: 100%;
  }
  padding-top: 30px;
  margin-inline: 30px;

  pre {
    background-color: #eee;
    padding: 1rem;
  }
`;
