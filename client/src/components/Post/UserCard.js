import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useUserCardStyles } from "../../styles";

const UserCard = () => {
  const classes = useUserCardStyles();
  return (
    <div>
      <Paper className={classes.usercard} elevation={3}>
        <Grid className={classes.container} container>
          <Grid className={classes.coverimg} item xs={12}></Grid>
          <Grid className={classes.userinfo} item xs={12}>
            <Grid className={classes.container} container>
              <Grid className={classes.profilepic} item xs={12}>
                <Avatar
                  className={classes.profileimg}
                  alt="John Doe"
                  src="https://thispersondoesnotexist.com/image"
                ></Avatar>
              </Grid>
              <Grid className={classes.profileinfo} item xs={12}>
                <Typography className={classes.name}>John Doe</Typography>
                <Typography className={classes.username}>@johndoe</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.cardbuttons} item xs={12}>
            <Button>View</Button>
            <Button>Remove</Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default UserCard;
