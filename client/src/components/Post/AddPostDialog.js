import React from "react";
import { Button, Slide, Snackbar } from "@mui/material";
import { FiSend } from "react-icons/fi";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from "react-markdown";
import serialiseMd from "../../assets/utils/serialiseMd";
import { handleImageUpload } from "../../assets/utils/handleImageUpload";
import { useMutation } from "@apollo/client";
import copy from "copy-to-clipboard";
import { CREATE_POST } from "../../graphql/mutations";
import { myContext } from "../../context/NewPostContext";
import { motion } from "framer-motion";
import rehypeRaw from "rehype-raw";
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const AddPostDialog = () => {
  const editorRef = React.useRef();
  if (!editorRef.current) editorRef.current = withReact(createEditor());
  const editor = editorRef.current;
  const [value, setValue] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [showSnackBar, setSnackBar] = React.useState(false);
  const addImgRef = React.useRef(null);
  const { openPost, handleClickNew } = React.useContext(myContext);

  const [createPost] = useMutation(CREATE_POST);

  function handleImage(e) {
    e.preventDefault();
    addImgRef.current.click();
  }

  async function handleAddImage(e) {
    e.preventDefault();
    let urlImage = await handleImageUpload(e.target.files[0]);
    copy(urlImage);
    setSnackBar(true);
  }

  async function handleSubmitPost(e) {
    e.preventDefault();
    setLoading(true);
    const md = serialiseMd(value);
    const variables = {
      postImage: "https://thispersondoesnotexist.com/image",
      title,
      content: md,
    };
    // console.log({ variables });
    try {
      await createPost({ variables });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    window.location.reload();
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {openPost && (
        <>
          <motion.div
            animate={{
              height: "50vh",
            }}
          >
            <div
              style={{
                height: "50vh",
                position: "fixed",
                width: "100%",
                bottom: 0,
                borderRadius: "7px",
                background: "#fff",
                boxShadow: "20px 20px 60px #4e6fa0,-20px -20px 60px #6a97d8",
                padding: "15px",
                overflow: "auto",
              }}
            >
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  width: "100%",
                }}
              >
                <div className="form-group">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control w-50"
                      id="formGroupExampleInput"
                      placeholder="Enter Title Here..."
                      onChange={(e) => {
                        // console.log(e.target.value);
                        setTitle(e.target.value);
                      }}
                    />
                    <div>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={addImgRef}
                        onChange={handleAddImage}
                      />

                      <Button
                        color="primary"
                        // className={classes.share}
                        onClick={(e) => handleImage(e)}
                      >
                        Add Image
                      </Button>
                      <Button
                        style={{
                          color: "#000",
                          borderColor: "gray",
                          margin: "0px 20px",
                        }}
                        variant="outlined"
                        onClick={handleClickNew}
                      >
                        Close
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#3D4F58",
                        }}
                        onClick={handleSubmitPost}
                      >
                        <FiSend
                          size={17}
                          style={{
                            marginRight: "5px",
                          }}
                        />{" "}
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: "20px",
                  height: "80%",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    border: "1px solid #DDDDDD",
                    height: "100%",
                    padding: "10px",
                    overflow: "auto",
                  }}
                >
                  <Slate
                    editor={editor}
                    value={value}
                    onChange={(value) => {
                      setValue(value);
                    }}
                  >
                    <Editable
                      placeholder="Write your Title... Please Press Enter twice to see changes"
                      style={{
                        padding: "10px",
                      }}
                    />
                  </Slate>
                </div>
                <div
                  style={{
                    width: "50%",
                    border: "1px solid #DDDDDD",
                    height: "100%",
                    padding: "10px",
                    overflow: "auto",
                  }}
                >
                  <ReactMarkdown
                    children={serialiseMd(value)}
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
                          <img alt={alt} src={src} style={{ maxWidth: 400 }} />
                        );
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <Snackbar
            open={showSnackBar}
            autoHideDuration={2000}
            TransitionComponent={Slide}
            message={<span>Copied to Clipboard!</span>}
            onClose={() => setSnackBar(false)}
          />
        </>
      )}
    </>
  );
};

export default AddPostDialog;
