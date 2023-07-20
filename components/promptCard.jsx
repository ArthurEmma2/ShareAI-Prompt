import React from "react";

function PromptCard({ post }) {
  return (
    <div className="prompt-card" key={post.id}>
      <p>{post.prompt}</p>
      <p>{post.username}</p>
      <p>{post.tag}</p>
    </div>
  );
}

export default PromptCard;
