"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "../../components/profile";
import ConfirmationModal from "../../components/Confirmaton";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user.id) return router.push("/");
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await response.json();
      setLoading(false);
      setMyPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openConfirmationModal = (post) => {
    setSelectedPost(post);
    setIsConfirmationOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
    setSelectedPost(null);
  };

  const handleDelete = async (post) => {
    openConfirmationModal(post);
  };

  const handleConfirmDelete = async () => {
    closeConfirmationModal();

    try {
      await fetch(`/api/prompt/${selectedPost._id.toString()}`, {
        method: "DELETE",
      });
      const filteredPosts = myPosts.filter((p) => p._id !== selectedPost._id);
      setMyPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && (
        <div>
          <p>Loading</p>
        </div>
      )}
      <Profile
        name="My"
        desc="Welcome to your personalized profile page!"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={closeConfirmationModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default MyProfile;
