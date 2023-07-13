import styled from "styled-components";

interface LoadingBoxProps {
  $loading: boolean;
}

export const LoadingBox = styled.div<LoadingBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
  visibility: ${(props) => (props.$loading ? "visible" : "hidden")};
`;
