import React from "react";
import { usePosts } from "../contexts/PostsContextProvider";
import { Link, useParams } from "react-router-dom";
import Loader from "./layout/Loader";
import { getRelativeDate } from "../utils/helper";
import { useAuth } from "../contexts/AuthContextProvider";
import { Pencil, Trash2 } from "lucide-react";

export default function SinglePostPage() {
  const { id } = useParams();
  const { posts, isLoading, deletePost } = usePosts();
  const { authUser, isAuth } = useAuth();

  // Find the single post by id
  const getSinglePost = !isLoading && posts?.find((post) => post.id === id);

  return (
    <section>
      {isLoading && <Loader />}
      {!isLoading && getSinglePost && (
        <div>
          {/* User Info */}
          <div className="relative bg-stone-100 p-3 rounded-md flex items-start justify-start gap-4 font-semibold">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full">
              {getSinglePost.userPhoto && (
                <img src={getSinglePost.userPhoto} alt="user-img" />
              )}
            </div>

            <div>
              <h4>{getSinglePost.userName}</h4>
              <p className="text-xs text-stone-600 font-normal">
                {getRelativeDate(getSinglePost.createdAt)}
              </p>
            </div>
            {/* Operations */}
            {isAuth && getSinglePost.userId === authUser.uid && (
              <div className="flex gap-5 absolute top-[50%] right-8 translate-y-[-50%]">
                <button
                  onClick={() => deletePost(getSinglePost.id)}
                  title="Delete"
                >
                  <Trash2 />
                </button>
                <Link title="Edit" to={`/post/edit/${getSinglePost.id}`}>
                  <Pencil />
                </Link>
              </div>
            )}
          </div>
          {/* Post */}
          <div className="my-5">
            <h3 className="text-2xl font-bold">{getSinglePost.title}</h3>
            <p className="text-stone-500 text-lg mt-2">
              {getSinglePost.content}
            </p>
          </div>
        </div>
      )}
      {!isLoading && !getSinglePost && <div>Post not found.</div>}
    </section>
  );
}
