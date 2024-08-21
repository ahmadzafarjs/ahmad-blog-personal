import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContextProvider";
import { usePosts } from "../contexts/PostsContextProvider";
import { useParams } from "react-router-dom";

export default function EditPostForm() {
  const { id } = useParams();
  const { isAuth } = useAuth();
  const { posts, updatePost } = usePosts();
  const [formData, setFormData] = useState({
    content: "",
    title: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const post = posts?.find((post) => post.id === id);
      if (post) {
        setFormData({
          content: post.content || "",
          title: post.title || "",
        });
      } else {
        setError("Post not found");
      }
    }
  }, [id, posts]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.content && formData.title) {
      try {
        await updatePost(id, formData);
        setIsDone(true);
        setFormData({
          content: "",
          title: "",
        });
      } catch (err) {
        setError("Failed to update post. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please fill in all fields.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isAuth) {
    return <p className="text-center text-xl">Signup Please!</p>;
  }

  return (
    <div className="w-[90vw] m-auto flex flex-col items-center gap-5 justify-center">
      <p className="my-4 p-2 px-4 text-left rounded-full text-md bg-orange-200">
        Edit Post
      </p>
      {isLoading ? (
        <div className="loading loading-spinner loading-md"></div>
      ) : (
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col items-center justify-center gap-5 w-full"
        >
          <input
            name="title"
            disabled={isLoading}
            className="bg-blue-50 p-3 rounded text-lg w-full"
            type="text"
            placeholder="Title..."
            value={formData.title}
            onChange={handleInputChange}
          />
          <textarea
            name="content"
            disabled={isLoading}
            className="bg-blue-50 p-3 rounded text-lg w-full"
            placeholder="Content..."
            value={formData.content}
            onChange={handleInputChange}
          />
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-700 text-stone-100 w-full py-2 rounded"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Update Post"
            )}
          </button>
        </form>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isDone && (
        <p className="text-green-500 mt-2">Post updated successfully!</p>
      )}
    </div>
  );
}
