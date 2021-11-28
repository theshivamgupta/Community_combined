import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { BsFillPencilFill, BsCardImage } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";
import ReactMarkdown from "react-markdown";
import serialiseMd from "../../assets/utils/serialiseMd";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT } from "../../graphql/mutations";
import { Avatar } from "@mui/material";
import { GET_USER_BY_ID } from "../../graphql/query";
import { formatDateToNow } from "../../assets/utils/formatDate";
import { BiDotsVerticalRounded } from "react-icons/bi";
import OptionsDialog from "../shared/OptionsDialog";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const Comment = ({ post }) => {
  const editorRef = React.useRef();
  if (!editorRef.current) editorRef.current = withReact(createEditor());
  const editor = editorRef.current;
  const [value, setValue] = React.useState(initialValue);
  const [showPreview, setShowPreview] = React.useState(false);

  const [createComment] = useMutation(CREATE_COMMENT);
  // const {subscribeToMore, ...result} = useQuery(GET_ALL_POST_COMMENTS, va);

  // const { subscribeToMore, ...result } = useQuery(GET_ALL_POST_COMMENTS, {
  //   variables,
  // });
  async function handleAddComment(e) {
    e.preventDefault();
    const variables = {
      content: serialiseMd(value),
      postId: post?.id,
    };
    await createComment({ variables });
    window.location.reload();
    window.location.reload();
  }

  return (
    <div className="mt-8 mx-auto" style={{ width: "900px" }}>
      <div className="mt-8 mx-auto bg-transparent relative z-50 flex justify-between items-center p-4 mb-px bg-opacity-100 rounded-lg">
        <div className="text-opacity-100 text-white flex flex-row items-center">
          <h3 className="text-lg font-bold">
            Comments ({post?.comments?.length})
          </h3>
        </div>
        <div className="flex flex-row">
          <button
            type="button"
            className="flex flex-row items-center p-2 ml-4 font-medium  rounded-lg  text-opacity-100 text-blue-600 hover:bg-blue-200"
          >
            <AiOutlinePlus /> Write Comment
          </button>
        </div>
      </div>
      <div className="relative z-30 p-2 rounded bg-gray-500 dark:bg-brand-dark-grey-700 dark:border-brand-grey-800 toolbar-tabs ">
        <div className="flex flex-row flex-wrap justify-between pb-1">
          <div className="flex flex-row items-center text-sm text-gray-700 dark:text-gray-400">
            <button
              className="button-transparent small flex flex-row items-center active p-2"
              title="Write Markdown"
              onClick={() => setShowPreview(false)}
            >
              <BsFillPencilFill className="w-4 h-4 mr-2" />
              <span className="font-medium">Write</span>
            </button>
            <button
              className="button-transparent small flex flex-row items-center "
              title="Preview Markdown"
              onClick={() => setShowPreview(true)}
            >
              <AiOutlineEye className="w-4 h-4 mr-2" />
              <span>Preview</span>
            </button>
            <button
              className="button-transparent small flex flex-row items-center p-2"
              title="Add Image"
              // onClick={() => setShowPreview((prev) => !prev)}
            >
              <BsCardImage className="w-5 h-5 mr-1" />
              <span>Add Image</span>
            </button>
          </div>
          <button
            className="flex flex-row items-center bg-blue-600 p-2 rounded-lg"
            onClick={handleAddComment}
          >
            <BiPaperPlane className="w-5 h-5 mr-2" />
            <span>Post</span>
          </button>
        </div>
      </div>
      <div
        // className=""
        style={{
          // border: "1px solid #DDDDDD",
          height: "30vh",
          padding: "10px",
          overflow: "auto",
          backgroundColor: "#fff",
        }}
      >
        {!showPreview ? (
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
                color: "#000",
              }}
            />
          </Slate>
        ) : (
          <div
            style={{
              color: "black",
            }}
          >
            <ReactMarkdown
              children={serialiseMd(value)}
              transformImageUri={(uri) => uri}
              rehypePlugins={[rehypeRaw]}
              className="prose "
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
                  return <img alt={alt} src={src} style={{ maxWidth: 400 }} />;
                },
              }}
            />
          </div>
        )}
      </div>
      <CommentList post={post} />
    </div>
  );
};

function CommentList({ post }) {
  return (
    <>
      {post?.comments?.map((comment) => (
        <React.Suspense fallback={<h1>Loading...</h1>} key={comment?.id}>
          <div className="my-4">
            <CommentItem comment={comment} />
          </div>
        </React.Suspense>
      ))}
    </>
  );
}

function CommentItem({ comment }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const variables = {
    id: comment?.userId,
  };
  const { data, loading } = useQuery(GET_USER_BY_ID, { variables });
  if (loading) {
    return <h1>Loading...</h1>;
  }

  const user = data?.getUserById;

  function handleOpenDialog(e) {
    e.preventDefault();
    setOpenDialog(!openDialog);
  }

  return (
    <>
      {openDialog && (
        <OptionsDialog model={comment} onClose={handleOpenDialog} />
      )}
      <div className="flex flex-row py-6 px-4 rounded-lg bg-opacity-100 bg-gray-500">
        <div className="w-10 h-10 mr-2 flex-shrink-0">
          <Avatar src={user?.profileImage} sx={{ width: 30, height: 30 }} />
        </div>
        <div className="min-w-0 w-full">
          <div className="flex flex-col mb-4">
            <div className="flex flex-row flex-wrap items-start justify-between text-opacity-100 ">
              <div className="mr-4 font-bold text-lg">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="flex">
                {comment?.flagged && (
                  <EmojiFlagsIcon
                    fontSize={"medium"}
                    color="error"
                    className="mr-2"
                  />
                )}
                {formatDateToNow(comment?.createdAt)}
                <BiDotsVerticalRounded
                  size={25}
                  className="cursor-pointer"
                  onClick={handleOpenDialog}
                />
              </div>
            </div>
            <div className="my-5 max-w-prose text-base overflow-wrap break-words text-black">
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
                      <img alt={alt} src={src} style={{ maxWidth: "100%" }} />
                    );
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
