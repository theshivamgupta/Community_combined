import React from "react";
import {
  Avatar,
  Divider,
  Grid,
  Hidden,
  Paper,
  Typography,
} from "@mui/material";
import { useFeedPostsStyles } from "../../styles";
import { FaRegComment } from "react-icons/fa";
import { formatDateToNow } from "../../assets/utils/formatDate";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/images/defaultImage.jpg";
const PostCard = ({ post, user }) => {
  const classes = useFeedPostsStyles();
  // const { data, error } = useQuery(GET_USER_VIA_POST, { variables });
  // console.log("! ", data, error);
  // const user = data?.getUserById;
  return (
    <div>
      <Paper className={classes.stackitem} elevation={1}>
        <Grid className={classes.maingrid} container spacing={2}>
          <Grid className={classes.usericon} item xs={3} sm={2}>
            <Avatar
              className={classes.avatar}
              alt="Remy Sharp"
              src={user?.profileImage ? user?.profileImage : defaultImage}
            />
            <Hidden smDown>
              <Typography className={classes.user} variant="caption">
                {user?.firstName} {user?.lastName}
              </Typography>
            </Hidden>
          </Grid>
          <Grid className={classes.post} item xs={9} sm={8}>
            <Divider
              className={classes.divider}
              orientation="vertical"
              flexItem
              light
            />
            <div className={classes.mainpost}>
              <Link to={`/p/${post?.id}`}>
                <Typography className={classes.content}>
                  {post?.title}
                </Typography>
                <Typography className={classes.timestamp}>
                  Posted {formatDateToNow(post?.createdAt)}
                </Typography>
              </Link>
            </div>
            <Hidden smDown>
              <Divider
                className={classes.divider}
                orientation="vertical"
                flexItem
                light
              />
            </Hidden>
          </Grid>
          <Hidden smDown>
            <Grid className={classes.likes} item sm={2}>
              <FaRegComment className={classes.likeicon} />
              <Typography className={classes.likecount}>
                {post?.comments?.length}
              </Typography>
            </Grid>
          </Hidden>
        </Grid>
      </Paper>
    </div>
  );
};

export default PostCard;
