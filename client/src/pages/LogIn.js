import { useMutation } from "@apollo/client";
import {
  Button,
  Card,
  CardHeader,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../components/shared/ErrorAlert";
import SEO from "../components/shared/SEO";
import { LOGIN_USER } from "../graphql/mutations";
import { useLoginPageStyles } from "../styles";

const LogIn = () => {
  const classes = useLoginPageStyles();
  const navigate = useNavigate();
  const { handleSubmit, watch, control } = useForm({
    mode: "onBlur",
  });
  const [showPassword, setPasswordVisibility] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [verify, setVerify] = React.useState(false);
  //   const [verifyError, setVerifyError] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [login, { data }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (!data.login.user.confirmed) {
        setVerify(true);
      } else {
        if (typeof window !== undefined) {
          localStorage.setItem("access-token", data.login.accessToken);
          localStorage.setItem("refresh-token", data.login.refreshToken);
          navigate("/dash");
          window.location.reload();
        }
      }
    },
  });
  const hasPassword = Boolean(watch("password"));

  function togglePasswordVisibility() {
    setPasswordVisibility((prev) => !prev);
  }

  async function onSubmit(d) {
    // console.log(d);
    const variables = {
      email: d.input,
      password: d.password,
    };
    try {
      await login({ variables });
    } catch (error) {
      console.log({ error });
      setError(true);
    }
  }

  //   const handleClose = (event, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }
  //     setVerifyError(false);
  //   };

  return (
    <>
      <SEO title="Login" />
      {error && (
        <ErrorAlert message={"Invalid Credentials"} setError={setError} />
      )}
      {verify && (
        <ErrorAlert message={"Verify your Account"} setError={setVerify} />
      )}
      <div className="container">
        <section className={classes.section}>
          <article>
            <Card className={classes.card}>
              <CardHeader className={classes.cardHeader} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="input"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                      variant="filled"
                      label="Username, email, or phone"
                      margin="dense"
                      className={classes.textField}
                      autoComplete="username"
                      InputProps={{
                        style: {
                          color: "#fff",
                        },
                      }}
                    />
                  )}
                  rules={{
                    required: true,
                    minLength: 5,
                  }}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputProps={{
                        style: {
                          color: "#fff",
                        },
                        endAdornment: hasPassword && (
                          <InputAdornment>
                            <Button
                              onClick={(e) => togglePasswordVisibility(e)}
                            >
                              {showPassword ? "Hide" : "Show"}
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      variant="filled"
                      label="Password"
                      margin="dense"
                      className={classes.textField}
                      autoComplete="current-password"
                    />
                  )}
                />

                <Button
                  //   disabled={!formState.isValid || formState.isSubmitting}
                  variant="contained"
                  fullWidth
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  Log In
                </Button>
              </form>

              {/* <AuthError error={error} /> */}
            </Card>
            <Card className={classes.signUpCard}>
              <Typography align="right" variant="body2">
                Don't have an account?
              </Typography>
              <Link to="/accounts/signup">
                <Button color="primary" className={classes.signUpButton}>
                  Sign up
                </Button>
              </Link>
            </Card>
          </article>
        </section>
      </div>
    </>
  );
};

export default LogIn;
