import React from "react";

function PromptCard({ post }) {
  return (
    <div className="prompt-card">
      <p>{post.prompt}</p>
    </div>
  );
}

export default PromptCard;
