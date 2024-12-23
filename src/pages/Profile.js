// // src/pages/Profile.js
// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebase"; 
// import { doc, getDoc, updateDoc, getDocs, query, collection, where} from "firebase/firestore"; 
// // import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [bio, setBio] = useState(""); // Bio state
//   const [profilePic, setProfilePic] = useState(""); // Profile picture state
//   const [name, setName] = useState(""); // Name state
//   const [posts, setPosts] = useState([]); // User's posts
//   // const navigate = useNavigate();

//   // Fetch user profile and posts on load
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const userDocRef = doc(db, "users", auth.currentUser.uid);
//       const userSnap = await getDoc(userDocRef);

//       if (userSnap.exists()) {
//         const userData = userSnap.data();
//         setName(userData.name);
//         setBio(userData.bio || "");
//         setProfilePic(userData.profilePic || "");
//       } else {
//         console.log("User not found!");
//       }

//       // Fetch posts created by the user
//       const postsSnap = await getDocs(
//         query(collection(db, "posts"), where("userId", "==", auth.currentUser.uid))
//       );
//       const userPosts = postsSnap.docs.map(doc => doc.data());
//       setPosts(userPosts);
//     };

//     fetchUserProfile();
//   }, []);

//   const handleProfileUpdate = async () => {
//     try {
//       const userDocRef = doc(db, "users", auth.currentUser.uid);
//       await updateDoc(userDocRef, {
//         bio,
//         profilePic,
//         name
//       });
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating profile: ", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-blue-500 text-white py-4 px-6 shadow-md">
//         <h1 className="text-xl font-bold">User Profile</h1>
//       </header>

//       {/* Profile Form */}
//       <main className="px-4 py-6">
//         <div className="bg-white p-6 rounded shadow">
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2">Bio</label>
//             <textarea
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2">Profile Picture URL</label>
//             <input
//               type="text"
//               value={profilePic}
//               onChange={(e) => setProfilePic(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <button
//             onClick={handleProfileUpdate}
//             className="bg-blue-500 text-white py-2 px-4 rounded"
//           >
//             Update Profile
//           </button>
//         </div>

//         {/* My Posts Section */}
//         <div className="mt-8">
//           <h2 className="font-bold text-xl">My Posts</h2>
//           <div className="mt-4">
//             {posts.map((post, index) => (
//               <div key={index} className="bg-white p-4 rounded shadow mb-4">
//                 <p>{post.content}</p>
//                 {post.mediaUrl && <img src={post.mediaUrl} alt="Post media" />}
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Profile;
