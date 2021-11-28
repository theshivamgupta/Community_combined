import { useMutation } from "@apollo/client";
import { Button, Dialog, Divider, Zoom } from "@mui/material";
import React from "react";
import { UserContext } from "../../App";
import { DELETE_COMMENT, FLAG_COMMENT } from "../../graphql/mutations";
import { GET_ALL_FLAGGED_COMMENTS } from "../../graphql/query";
import { useOptionsDialogStyles } from "../../styles";

const OptionsDialog = ({ onClose, model }) => {
  const classes = useOptionsDialogStyles();
  const { currentUserId } = React.useContext(UserContext);
  const isOwner = currentUserId === model?.userId;
  console.log({ currentUserId }, model?.userId);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [flagComment] = useMutation(FLAG_COMMENT, {
    refetchQueries: [GET_ALL_FLAGGED_COMMENTS, "getAllFlaggedComments"],
  });
  async function handleDeleteComment(e) {
    e.preventDefault();
    const variables = {
      commentId: model?.id,
    };
    await deleteComment({ variables });
    window.location.reload();
  }

  async function handleFlagComment(e) {
    e.preventDefault();
    const variables = {
      commentId: model?.id,
    };
    await flagComment({ variables });
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
      }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      {isOwner && (
        <Button onClick={handleDeleteComment} className={classes.redButton}>
          {"Delete"}
        </Button>
      )}
      <Divider />
      <Button onClick={handleFlagComment} className={classes.redButton}>
        {"Report"}
      </Button>
      <Divider />
      <Button onClick={onClose} className={classes.button}>
        Cancel
      </Button>
    </Dialog>
  );
};

export default OptionsDialog;
