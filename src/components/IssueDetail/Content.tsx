import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

function Content({ content }: { content: string }) {
  return <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />;
}

export default Content;
