import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContextProvider";
import { usePosts } from "../contexts/PostsContextProvider";

export default function CreatePostForm() {
  const { authUser, isAuth } = useAuth();
  const { handleCreate } = usePosts();

  const [formData, setFormData] = useState({
    content: "",
    title: "",
    userPhoto: authUser?.photoURL || "",
    userName: authUser?.displayName || "",
    userId: authUser?.uid || "",
    createdAt: Date.now(),
  });
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   setIsDone(false);
  // }, [formData]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.content && formData.title) {
      try {
        await handleCreate(formData);
        setIsDone(true);
        setFormData({
          title: "",
          content: "",
        });
      } catch (err) {
        setError("Failed to create post. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please fill in all fields.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isAuth) {
    return <p className="text-center text-xl">Signup Please!</p>;
  }

  return (
    <div className="w-[90vw] m-auto flex flex-col items-center gap-5 justify-center">
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col items-center justify-center gap-5 w-full"
      >
        <input
          disabled={isLoading}
          className="bg-blue-50 p-3 rounded text-lg w-full"
          type="text"
          placeholder="Title..."
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
        <textarea
          disabled={isLoading}
          className="bg-blue-50 p-3 rounded text-lg w-full"
          placeholder="Content..."
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-700 text-stone-100 w-full py-2 rounded"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Create Post"
          )}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isDone && (
        <p className="text-green-500 mt-2">Post created successfully!</p>
      )}
    </div>
  );
}
