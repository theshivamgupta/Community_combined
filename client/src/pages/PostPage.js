import React from "react";
import SEO from "../components/shared/SEO";
import NavBar from "../components/NavBar/NavBar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_POST_BY_ID, GET_USER_BY_ID } from "../graphql/query";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Avatar } from "@mui/material";
import rehypeRaw from "rehype-raw";
import Comment from "../components/Comment/Comment";

const PostPage = () => {
  const { postId } = useParams();
  const [user, setUser] = React.useState({});
  const client = useApolloClient();
  const variables = {
    id: postId,
  };
  const { data, loading } = useQuery(GET_POST_BY_ID, {
    variables,
  });
  const post = data?.getPostById;
  React.useEffect(() => {
    async function fetchUser() {
      if (!loading) {
        let response = await client.query({
          query: GET_USER_BY_ID,
          variables: {
            id: data?.getPostById?.userId,
          },
        });
        setUser(response.data?.getUserById);
      }
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <SEO title={"Post"} />
      <NavBar />
      {!!user && (
        <>
          <div className="p-3 text-white">
            <div className="mt-8 mx-auto" style={{ width: "900px" }}>
              <div className="prose lg:prose-lg xl:prose-xl mt-10 mb-10 mx-auto text-white">
                <h1 className="text-white">{post?.title}</h1>
              </div>
              <div className="relative z-10 py-5 mb-5 border-t border-b md:mb-10 dark:border-brand-grey-800">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-start md:items-center">
                    <div className="w-12 h-12 mr-2 rounded-full md:w-16 md:h-16 md:mr-5">
                      <Link
                        to={`/${user.username}`}
                        className="block w-full h-auto relative bg-brand-grey-200 dark:bg-brand-dark-grey-900"
                      >
                        <Avatar src={user.profileImage} />
                      </Link>
                    </div>
                    <div className="leading-snug">
                      <Link
                        to={`/${user.username}`}
                        className="mb-1 text-lg font-bold text-brand-black dark:text-white"
                      >
                        <span>
                          {user.firstName} {user?.lastName}
                        </span>
                      </Link>
                      <p className="mb-2 text-sm text-brand-grey-600 dark:text-brand-grey-400">
                        Published on{" "}
                        <span className="font-semibold">
                          {/* {formatPostDate(post?.createdAt)} */}2 FEBRUARY,
                          2019
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row">
                      <div className="relative">
                        <div
                          aria-label="Post actions dropdown"
                          className="flex flex-row items-center button-transparent small"
                        >
                          {/* <LikeButton likes={likes} postId={id} authorId={user.id} /> */}
                          <span className="hidden ml-2 md:inline-block">
                            {/* {likesCount === 1 ? "1 like" : `${likesCount} likes`} */}
                            {"1 like"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ReactMarkdown
                children={post?.content}
                transformImageUri={(uri) => uri}
                rehypePlugins={[rehypeRaw]}
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
            <Comment post={post} />
          </div>
        </>
      )}
    </>
  );
};

export default PostPage;
