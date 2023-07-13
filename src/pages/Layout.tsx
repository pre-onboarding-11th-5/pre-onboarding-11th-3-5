import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";

const Main = styled.main`
  min-height: 50vh;

  border: 2px solid #000;
  margin: auto;
`;

function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default Layout;
