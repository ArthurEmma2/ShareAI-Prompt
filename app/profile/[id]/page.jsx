"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "../../../components/profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params?.id.toString());
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${params.id}/posts`); // <-- Use params.user.id here
      const data = await response.json();
      setLoading(false);

      setUserPosts(data);
    };

    if (params.id) fetchPosts(); // <-- Use params.user.id here
  }, [params.id]); // <-- Use params.user.id here

  return (
    <>
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
      />
    </>
  );
};

export default UserProfile;
