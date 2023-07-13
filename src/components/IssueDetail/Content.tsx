import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useIssueDetail } from "../../contexts/issueDetailContext";
import { ContentBox } from "./Content.styles";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown-light.css";
import rehypeRaw from "rehype-raw";

function Content() {
  const { data } = useIssueDetail();
  return data ? (
    <ContentBox>
      <ReactMarkdown
        className="markdown-body"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {data.body}
      </ReactMarkdown>
    </ContentBox>
  ) : null;
}

export default Content;
