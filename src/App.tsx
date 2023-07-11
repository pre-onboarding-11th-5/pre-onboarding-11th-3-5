import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ListPage />} />
          <Route path="/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
