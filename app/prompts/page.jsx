"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "../../components/promptCard";

const project = "SharePrompt";

function PromptCardList({ data, handleTagClick }) {
  if (!data) {
    return null; // Return null if data is not available yet
  }

  return (
    <div className="mt-10 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

function Prompts({ initialPosts, handleTagClick }) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/prompts/${project}/prompts`, {
          method: "GET",
          cache: "no-cache",
          next: { revalidate: 60 },
        });

        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    const newValue = e.target.value;

    setSearchText(newValue);

    clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(newValue);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const promptListData = searchText ? searchedResults : posts;

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search for a word, a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
      <PromptCardList data={promptListData} handleTagClick={handleTagClick} />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`/api/prompts/${project}/prompts`, {
      method: "GET",
      cache: "no-cache",
      next: { revalidate: 60 },
    });

    const initialPosts = await response.json();

    return {
      props: {
        initialPosts,
      },
    };
  } catch (error) {
    console.error("Error fetching initial posts:", error);

    return {
      props: {
        initialPosts: [],
      },
    };
  }
}

export default Prompts;
