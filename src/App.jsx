import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import AuthContextProvider from "./contexts/AuthContextProvider";
import Login from "./components/auth/Login";
import PostsContextProvider from "./contexts/PostsContextProvider";
import CreatePostForm from "./components/CreatePostForm";
import GlobalLayout from "./components/layout/GlobalLayout";
import SinglePostPage from "./components/SinglePostPage";
import EditPostForm from "./components/EditPostForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AuthContextProvider>
              <PostsContextProvider>
                <GlobalLayout />
              </PostsContextProvider>
            </AuthContextProvider>
          }
        >
          <Route index element={<Home />} />
          <Route path="/create" element={<CreatePostForm />} />
          <Route path="/post/edit/:id" element={<EditPostForm />} />
          <Route path="/post/:id" element={<SinglePostPage />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
