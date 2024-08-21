import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const PostsContext = createContext();

export default function PostsContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function handleCreate(postData) {
    console.log(postData);

    try {
      const todoColl = collection(db, "posts");
      await addDoc(todoColl, {
        ...postData,
      });
      console.log("Created successfull");
      //   navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  // Get All Posts

  useEffect(() => {
    const todoColl = collection(db, "posts");
    const unsubscribe = onSnapshot(todoColl, (snapshot) => {
      const todosWithId = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(todosWithId);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
    // getTodos();
  }, []);

  async function deletePost(id) {
    try {
      const coll = collection(db, "posts");
      const refer = doc(coll, id);
      await deleteDoc(refer);
      navigate("/");
      console.log("deleted successfull");
    } catch (error) {
      console.log(error);
    }
  }

  // Update Todo
  async function updatePost(id, value) {
    try {
      const updateValue = value === true ? false : true;

      const todoColl = collection(db, "posts");
      const todoRef = doc(todoColl, id);
      await updateDoc(todoRef, {
        ...value,
      });
      console.log("Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PostsContext.Provider
      value={{ handleCreate, deletePost, isLoading, posts, updatePost }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);
