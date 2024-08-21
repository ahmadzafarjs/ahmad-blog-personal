import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContextProvider";
import { auth, db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Trash } from "lucide-react";
import Header from "./Header";
import LandingPage from "./LandingPage";
import UserProfile from "./UserProfile";
import CreatePostForm from "./CreatePostForm";
import PostsContainer from "./PostsContainer";
import { usePosts } from "../contexts/PostsContextProvider";
import Post from "./Post";
import Loader from "./layout/Loader";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    user: "",
    todo: "",
    isCompleted: false,
  });

  const { authUser, isAuth, isLoading: isAuthLoading } = useAuth();
  const { posts, isLoading } = usePosts();

  return (
    <>
      {isAuth && isAuthLoading && <Loader />}
      {isAuth && !isAuthLoading ? (
        <main>
          {/* User */}

          <UserProfile user={authUser} />

          {/* Todos */}
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <PostsContainer>
                {isLoading ? (
                  <Loader />
                ) : (
                  posts.map((post) => {
                    return <Post key={post.id} post={post} />;
                  })
                )}
              </PostsContainer>
            </>
          )}
        </main>
      ) : (
        <LandingPage />
      )}
    </>
  );
}
