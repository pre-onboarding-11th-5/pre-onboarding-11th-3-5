import styled from "styled-components";

import ReactMarkdown from "react-markdown";

type ContentProps = {
  content: string;
};

const Wrapper = styled.div`
  padding: 0 1rem;
`;

function Content({ content }: ContentProps) {
  return (
    <Wrapper>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Wrapper>
  );
}

export default Content;
