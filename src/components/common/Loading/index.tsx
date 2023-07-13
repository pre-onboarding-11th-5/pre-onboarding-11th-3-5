import { LoadingBox } from "./Loading.styles";

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return <LoadingBox $loading={loading}>Loading...</LoadingBox>;
};

export default Loading;
