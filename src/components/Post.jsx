import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { getRelativeDate } from "../utils/helper";

export default function Post({ post }) {
  return (
    <div className=" relative p-4 bg-transparent transition-all z-10 hover:bg-blue-50 rounded-lg">
      {/* Hover */}
      {/* User Info */}
      <div className="flex items-start justify-start gap-4 font-semibold">
        <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full">
          {post?.userPhoto && <img src={`${post.userPhoto}`} alt="user-img" />}
        </div>

        <div>
          <h4>{post?.userName}</h4>
          <p className="text-xs text-stone-600 font-normal">
            {getRelativeDate(post?.createdAt)}
          </p>
        </div>
      </div>
      {/* Body/Content */}
      <div className="mt-5">
        <h2 className="font-bold text-lg leading-5" title={post?.title}>
          {post?.title.slice(0, 20) + "..."}
        </h2>
        <p className="text-stone-500 mt-2">
          {post?.content.slice(0, 100) + ".."}{" "}
          <Link
            to={`/post/${post?.id}`}
            className="text-blue-500 underline italic text-sm"
          >
            show more
          </Link>
        </p>
      </div>
    </div>
  );
}
