import { ErrorBox, ErrorText } from "./Error.styles";

interface ErrorProps {
  error: {
    message: string;
  } | null;
  refetch: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, refetch }) => {
  const onReloadClick = () => {
    refetch();
  };
  return error ? (
    <ErrorBox>
      <ErrorText>{error.message}</ErrorText>
      <button onClick={onReloadClick}>Reload</button>
    </ErrorBox>
  ) : null;
};

export default Error;
