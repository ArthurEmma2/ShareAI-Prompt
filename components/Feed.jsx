"use client";
import { useState, useEffect } from "react";
import PromptCard from "../components/promptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-6 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        // Handle the error here
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts().catch((error) => {
      // Handle any uncaught errors here
      console.error("Unhandled error during fetchPosts:", error);
    });
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full  flex-center">
        <input
          type="text"
          placeholder="search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;
