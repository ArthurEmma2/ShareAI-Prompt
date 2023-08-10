"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function PromptPage() {
  const params = useParams();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrompt = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/prompt/${params.id}`, {
          method: "GET",
          cache: "no-cache",
          next: { revalidate: 60 },
        });

        const data = await response.json();
        console.log(data);

        setPrompt(data);
      } catch (error) {
        console.error("Error fetching Prompt:", error);
      }

      setLoading(false);
    };

    fetchPrompt();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Prompt ID: {prompt?._id}</h1>
      <p>{prompt?.prompt}</p>
    </div>
  );
}
