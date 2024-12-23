import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <h1 className="text-xl font-bold">Feed</h1>
        <div className="flex space-x-4">
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded"
            onClick={() => navigate("/create-post")}
          >
            Create Post
          </button>
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="p-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white shadow p-4 mb-4 rounded">
              <h2 className="text-lg font-bold">{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
