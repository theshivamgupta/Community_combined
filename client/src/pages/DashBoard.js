import React from "react";
import Navbar from "../components/NavBar/NavBar";
import SEO from "../components/shared/SEO";
// import UserCard from "../components/Post/UserCard";
import PostCard from "../components/Post/PostCard";
import AddPostDialog from "../components/Post/AddPostDialog";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/query";
import FeedPostSkeleton from "../components/Post/FeedPostSkeleton";
import FlagPostModal from "../components/shared/FlagPostModal";
import StudentModal from "../components/shared/StudentModal";

const DashBoard = () => {
  const { data, loading } = useQuery(GET_ALL_POSTS);
  if (loading) {
    return <h1 className="text-white">Loading...</h1>;
  }
  return (
    <>
      <SEO title="DashBoard" />
      <Navbar />
      {data?.getAllPosts?.map((post) => (
        <React.Suspense fallback={<FeedPostSkeleton />} key={post?.id}>
          <div
            style={{
              margin: "50px",
            }}
          >
            <PostCard post={post} />
          </div>
        </React.Suspense>
      ))}
      {/* <FeedPostSkeleton /> */}
      <AddPostDialog />
      <FlagPostModal />
      <StudentModal />
    </>
  );
};

export default DashBoard;
