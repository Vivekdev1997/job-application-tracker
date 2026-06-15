import { Outlet } from "react-router";

import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="app-shell d-flex flex-column">
      <Header />
      <main className="container flex-grow-1 d-flex align-items-center py-5">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

