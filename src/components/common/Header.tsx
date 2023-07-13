import styled from "styled-components";

import { ORGANIZATION, REPO } from "../../constants/common";

const HeaderLayout = styled.header`
  width: 100%;
  height: 5rem;

  text-align: center;

  span {
    display: inline-block;
    height: 100%;

    font-size: 2.5rem;
    line-height: 4.5rem;
  }
`;

function Header() {
  return (
    <HeaderLayout>
      <span>
        {ORGANIZATION}/{REPO}
      </span>
    </HeaderLayout>
  );
}

export default Header;
