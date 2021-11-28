import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const UserStackCard = () => {
  const bannerImage =
    "https://img5.goodfon.com/wallpaper/nbig/7/64/abstract-background-rounded-shapes-colorful-abstraktsiia-tek.jpg";
  return (
    <div>
      <div>
        <Paper
          // className={classes.usercard}
          className="usercard-friends"
          elevation={3}
        >
          <Grid
            // className={classes.container}
            className="container-friends"
            container
          >
            <Grid
              // className={classes.coverimg}
              className="coverimg-friends"
              item
              xs={12}
              style={{
                background: `url(${bannerImage}) no-repeat center center`,
              }}
            ></Grid>
            <Grid
              // className={classes.userinfo}
              className="userinfo-friends"
              item
              xs={12}
            >
              <Grid
                // className={classes.container}
                className="container-friends"
                container
              >
                <Grid
                  // className={classes.profilepic}
                  className="profilepic-friends"
                  item
                  xs={12}
                >
                  <Avatar
                    // className={classes.profileimg}
                    className="profileimg-friends"
                    alt="John Doe"
                    src={friend?.user?.profile_image}
                  ></Avatar>
                </Grid>
                <Grid
                  // className={classes.profileinfo}
                  className="profileinfo-friends"
                  item
                  xs={12}
                >
                  <Typography
                    // className={classes.name}
                    className="name-friends"
                  >
                    {friend?.user?.name}
                  </Typography>
                  <Typography
                    // className={classes.username}
                    className="username-friends"
                  >
                    @{friend?.user?.username}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              // className={classes.cardbuttons}
              className="cardbuttons-friends"
              item
              xs={12}
            >
              <Button>View</Button>
              <Button>Remove</Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default UserStackCard;
