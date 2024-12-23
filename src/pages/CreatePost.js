import React, { useState } from "react";
import { db, auth } from "../firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage } from "../firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const CreatePost = () => {
  const [content, setContent] = useState(""); 
  const [media, setMedia] = useState(null); 
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      setError("Please enter some content.");
      return;
    }

    try {
      let mediaUrl = "";

      if (media) {
        const mediaRef = ref(storage, `posts/${media.name}`);
        await uploadBytes(mediaRef, media);
        mediaUrl = await getDownloadURL(mediaRef);
      }

      // Add the post to Firestore
      await addDoc(collection(db, "posts"), {
        username: auth.currentUser.displayName || "Anonymous", // Assuming user is logged in
        content: content,
        timestamp: serverTimestamp(), // Automatically set timestamp
        mediaUrl: mediaUrl, // Store media URL (if uploaded)
      });

      // Clear the form
      setContent("");
      setMedia(null);
      setError("");
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      setError("There was an error creating the post.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create a New Post</h2>

      <form onSubmit={handleSubmit}>
        {/* Post Content */}
        <textarea
          className="w-full p-4 border border-gray-300 rounded mb-4"
          rows="4"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Media Upload */}
        <input
          type="file"
          onChange={(e) => setMedia(e.target.files[0])}
          className="mb-4"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
