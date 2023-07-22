"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "../../components/profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log(session);
      if (!session?.user?.id) {
        return router.push("/");
      }

      setLoading(true);
      const response = await fetch(`/api/users/${session.user?.id}/posts`);
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setMyPosts(data);
    };

    fetchPosts();
  }, [session?.user?.id]);

  return (
    <>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page!"
        data={myPosts}
      />
    </>
  );
};

export default MyProfile;
