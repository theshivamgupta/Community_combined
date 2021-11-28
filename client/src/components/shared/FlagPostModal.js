import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { myContext } from "../../context/NewPostContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_FLAGGED_COMMENTS } from "../../graphql/query";
import { Checkbox } from "@mui/material";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { DELETE_FLAG_COMMENT } from "../../graphql/mutations";

const FlagPostModal = () => {
  const { flagModal, handleFlagModal } = React.useContext(myContext);
  const { data, loading, refetch } = useQuery(GET_ALL_FLAGGED_COMMENTS);
  const [deleteFlaggedComment] = useMutation(DELETE_FLAG_COMMENT);
  const [selectedValue, setSelectedValue] = React.useState(null);
  if (loading) {
    return <h1 className="text-white">Loading...</h1>;
  }
  const comments = data?.getAllFlaggedComments;

  async function handleDeleteComment(e) {
    e.preventDefault();
    if (selectedValue) {
      const variables = {
        commentId: selectedValue,
      };
      await deleteFlaggedComment({ variables });
      // console.log("flagged comment deleted");
      refetch();
    }
  }

  return (
    <>
      <Dialog onClose={handleFlagModal} open={flagModal} fullWidth={true}>
        <DialogTitle>
          Delete Comment
          <button
            type="button"
            className="btn btn-outline-danger ml-6"
            onClick={handleDeleteComment}
          >
            Delete
          </button>
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          {comments?.map((comment) => (
            <ListItem
              button
              // onClick={() => handleListItemClick(email)}
              key={comment?.id}
            >
              <ListItemAvatar>
                <Checkbox
                  onChange={(e) => {
                    e.preventDefault();
                    // console.log(comment?.id);
                    setSelectedValue(comment?.id);
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <ReactMarkdown
                      children={comment?.content}
                      transformImageUri={(uri) => uri}
                      rehypePlugins={[rehypeRaw]}
                      className="prose"
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              children={String(children).replace(/\n$/, "")}
                              style={docco}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                        img({ alt, src }) {
                          //   console.log({ props });
                          return (
                            <img
                              alt={alt}
                              src={src}
                              style={{ maxWidth: 400 }}
                            />
                          );
                        },
                      }}
                    />
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default FlagPostModal;
