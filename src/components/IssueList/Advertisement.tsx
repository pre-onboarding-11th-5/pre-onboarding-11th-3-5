import styled from "styled-components";

const Wrapper = styled.div`
  height: 100px;

  img {
    height: 100%;
  }
`;

function Advertisement() {
  return (
    <Wrapper>
      <a href="https://www.wanted.co.kr/" target="_blank" rel="noreferrer">
        <img
          src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
          alt="ads"
        />
      </a>
    </Wrapper>
  );
}

export default Advertisement;
