import React from "react";
import Post from "./Post";

export default function PostsContainer({ children }) {
  return (
    <section className="my-4 grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3 gap-4">
      {children}
    </section>
  );
}
