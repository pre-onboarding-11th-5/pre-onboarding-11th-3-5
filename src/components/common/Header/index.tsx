import { ORGANIZATION, REPO } from "../../../constants/common";
import { HeaderBox } from "./Header.styles";

function Header() {
  return (
    <HeaderBox>
      {ORGANIZATION} / {REPO}
    </HeaderBox>
  );
}

export default Header;
