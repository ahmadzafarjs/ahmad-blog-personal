import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function GlobalLayout() {
  return (
    <>
      <Header />
      <main className="m-auto w-[90vw] md:max-w-[900px]">
        <Outlet />
      </main>
    </>
  );
}
