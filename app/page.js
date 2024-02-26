'use client';
import React, { useState } from "react";

export default function Home() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const characterLimit = 50;

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      let updatedComment = newComment.trim();
      let newComments = [];
  
      while (updatedComment.length > characterLimit) {
        const slicedComment = updatedComment.slice(0, characterLimit);
        newComments.push(slicedComment);
        updatedComment = updatedComment.slice(characterLimit);
      }
  
      if (updatedComment.trim() !== "") {
        newComments.push(updatedComment);
      }
  
      setComments([...comments, ...newComments]);
      setNewComment("");
    }
  };

  const handleRemoveComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newComment.trim() !== "") {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-slate-400">
      <div className="w-[60vh]">
        <h2 className="mb-4 text-lg font-semibold text-center text-black">Comments:</h2>
        <ul className="p-4 bg-gray-200 rounded">
          {comments.map((comment, index) => (
            <li key={index} className="flex justify-between mb-2">
              <span>{comment}</span>
              <button
                className="p-1 text-white bg-red-500 rounded max-text-sm max-h-3"
                onClick={() => handleRemoveComment(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 text-black border border-gray-300 rounded"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="p-2 mt-2 text-white bg-blue-500 rounded"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </main>
  );
}
