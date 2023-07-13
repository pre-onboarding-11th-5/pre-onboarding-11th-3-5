import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 2rem;
  color: blue;
`;

function Loading() {
  return <Wrapper>Loading</Wrapper>;
}

export default Loading;
