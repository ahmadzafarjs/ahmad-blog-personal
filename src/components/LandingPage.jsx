import React from "react";
import PostsContainer from "./PostsContainer";
import Loader from "./layout/Loader";
import Post from "./Post";
import { usePosts } from "../contexts/PostsContextProvider";

export default function LandingPage() {
  const { posts, isLoading } = usePosts();
  return (
    <div className="m-auto w-[90vw] md:max-w-[900px]">
      <p className="text-3xl text-center">
        Wellcome to{" "}
        <strong className="text-5xl text-blue-800 font-extrabold">
          ahmad.
        </strong>{" "}
        blog
      </p>
      <p className="text-stone-700 text-xl text-center m-auto p-4 max-w-[500px]">
        Naam hi kafi hay. Ab kary apni har sooch ko share 😀
      </p>
      {isLoading ? (
        <Loader />
      ) : (
        <PostsContainer>
          {posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </PostsContainer>
      )}
    </div>
  );
}
