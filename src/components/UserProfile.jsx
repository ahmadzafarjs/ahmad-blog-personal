import { BadgeCheck, UserRound } from "lucide-react";
import React from "react";

export default function UserProfile({ user }) {
  return (
    <section
      className={`grid grid-cols-[auto_1fr] gap-8 bg-blue-100 p-5 rounded-md ${
        !user?.displayName ? "items-center" : ""
      }`}
    >
      {/* Profile Pic */}
      {user?.photoURL ? (
        <div className=" relative w-20 h-20 flex items-center justify-center overflow-hidden rounded-full">
          <img src={user?.photoURL} alt="profile-pic" />
        </div>
      ) : (
        <div className=" relative w-20 bg-stone-400 text-4xl h-20 flex items-center justify-center overflow-hidden rounded-full">
          <UserRound className="w-8" />
        </div>
      )}
      <div>
        {user?.emailVerified && (
          <p className=" text-stone-400 text-sm italic flex gap-2 items-center justify-start">
            {" "}
            Verified
            <BadgeCheck className="w-5 text-green-400" />
          </p>
        )}
        {user?.displayName && (
          <h2 className="text-xl font-bold">{user?.displayName}</h2>
        )}
        <p
          className={`${
            !user?.displayName ? "text-2xl font-bold" : "text-sm"
          } text-stone-500`}
        >
          {user?.email}
        </p>
      </div>
    </section>
  );
}
