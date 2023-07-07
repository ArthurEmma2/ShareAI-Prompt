import React from 'react';

function PromptCard({ post }) {
  return (
    <div className="prompt-card">
      <h3>{post.tag}</h3>
      <h3>{post.prompt}</h3>
    </div>
  );
}




export default PromptCard;
