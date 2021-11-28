import {
  Avatar,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import Navbar from "../components/NavBar/NavBar";
import SEO from "../components/shared/SEO";
import FeedPostSkeleton from "../components/Post/FeedPostSkeleton";
// import UserStackCard from "../components/Profile/UserStackCard";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../graphql/query";
import { UserContext } from "../App";
import "./profile.css";
import PostCard from "../components/Post/PostCard";
import { handleImageUpload } from "../assets/utils/handleImageUpload";
import { UPDATE_PROFILE_IMAGE } from "../graphql/mutations";

const ProfilePage = () => {
  const { userId } = useParams();
  const variables = {
    id: userId,
  };
  const { data, loading } = useQuery(GET_USER_BY_ID, { variables });
  // console.log(data);

  if (loading) {
    <h1 className="text-white">Loading...</h1>;
  }
  const { currentUserId } = React.useContext(UserContext);
  const user = data?.getUserById;
  const isOwner = user?.id === currentUserId;
  return (
    <>
      <SEO title={"Profile"} />
      <Navbar />
      <Container>
        <ProfileMainCard
          user={user}
          isOwner={isOwner}
          //   setActiveTab={setActiveTab}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ProfileSideCard user={user} />
          </Grid>
          <Grid item xs={12} md={8}>
            {user?.posts.map((post) => {
              return (
                <React.Suspense key={post?.id} fallback={<FeedPostSkeleton />}>
                  <div className="my-10 overflow-hidden">
                    <PostCard post={post} user={user} />
                  </div>
                </React.Suspense>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

function ProfileMainCard({ user, isOwner }) {
  const coverImgRef = React.useRef(null);
  const bannerImage =
    "https://img5.goodfon.com/wallpaper/nbig/7/64/abstract-background-rounded-shapes-colorful-abstraktsiia-tek.jpg";

  const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE);

  async function handleUpdateProfilePic(e) {
    e.preventDefault();
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    let url = await handleImageUpload(file);
    const variables = {
      profileImage: url,
    };
    await updateProfileImage({ variables });
  }

  return (
    <div>
      <Paper className="covercard">
        <Grid
          // className={classes.cover}
          className="cover-main"
          container
        >
          <Grid
            // className={classes.coverimg}
            className="coverimg-main"
            item
            xs={12}
            style={{
              background: `url(${bannerImage}) no-repeat center center`,
            }}
          ></Grid>
          {isOwner && (
            <input
              type="file"
              ref={coverImgRef}
              className="hidden"
              accept="image/*"
              onChange={handleUpdateProfilePic}
            />
          )}
          <Grid
            // className={classes.profile}
            className="profile-main"
            item
            xs={12}
          >
            <Grid style={{ height: "100%", width: "100%" }} container>
              <Grid className="main-profile-image-grid" item xs={4} md={3}>
                <Avatar
                  className="main-profile-image cursor-pointer"
                  alt="John Doe"
                  src={user?.profileImage}
                  onClick={() => {
                    if (isOwner) coverImgRef.current.click();
                  }}
                />
              </Grid>
              <Grid
                // className={classes.profileinfo}
                className="profileinfo-main"
                item
                xs={7}
                md={6}
              >
                <Grid container style={{ width: "100%", height: "100%" }}>
                  <Grid item xs={12}>
                    <Typography
                      // className={classes.name}
                      className="name-main"
                    >
                      {user?.firstName} {user?.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      // className={classes.username}
                      className="username-main"
                    >
                      {user?.username}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            // className={classes.navigation}
            className="navigation-main"
            xs={12}
          >
            <Tabs
              value={0}
              //   onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab
                // className={classes.navtab}
                className="navtab-main"
                label="Profile"
                // onClick={() => {
                //   setActiveTab((prev) => ({
                //     ...prev,
                //     profile: true,
                //     followers: false,
                //     followings: false,
                //   }));
                // }}
              />
            </Tabs>
          </Grid>
        </Grid>
      </Paper>
      {/* {showOption && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
      {showUnfollowDialog && (
        <UnfollowDialog
          onUnfollowUser={onUnfollowUser}
          user={user}
          onClose={() => setUnfollowDialog(false)}
        />
      )} */}
    </div>
  );
}

function ProfileSideCard({ user }) {
  return (
    <div>
      <Paper className="sidecard-side" elevation={3}>
        <Grid className="frienddata-side" container spacing={1}>
          <Grid className="data-side" item xs={3}>
            <Typography className="friends-side">Followers</Typography>
          </Grid>
          <Grid className="data" item xs={3}>
            <Typography className="number-side">
              {user?.posts?.length}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ProfilePage;
