import {
  Button,
  Card,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import SEO from "../components/shared/SEO";
import isEmail from "validator/lib/isEmail";
import { Link } from "react-router-dom";
import { useSignUpPageStyles } from "../styles";
import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { CHECK_IF_USERNAME_EMAIL_EXISTS } from "../graphql/query";
import ErrorAlert from "../components/shared/ErrorAlert";
import SuccessAlert from "../components/shared/SuccessAlert";

const affiliations = ["Teacher", "Student"];

const SignUp = () => {
  const client = useApolloClient();
  const [affilation, setAffilation] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const classes = useSignUpPageStyles();
  const { handleSubmit, control, reset } = useForm({
    mode: "onBlur",
  });

  const [createUser, payload] = useMutation(CREATE_USER);

  //   console.log(formState.errors);

  function handleChange(e) {
    setAffilation(e.target.value);
  }

  async function onSubmit(data) {
    let variables = {
      cred: data.email,
    };

    let emailResponse = await client.query({
      query: CHECK_IF_USERNAME_EMAIL_EXISTS,
      variables,
    });

    variables = {
      cred: data.username,
    };

    let usernameResponse = await client.query({
      query: CHECK_IF_USERNAME_EMAIL_EXISTS,
      variables,
    });
    if (usernameResponse.data.ifUserExists || emailResponse.data.ifUserExists) {
      setError("Email/Username already Exists");
      return;
    }

    variables = {
      email: data.email,
      password: data.password,
      username: data.username,
      affiliation: affilation,
      firstName: data.name.split(" ")[0],
      lastName: data.name.split(" ")[1],
      moderatorLevel: affilation === "Teacher" ? 0 : 2,
    };
    // console.log(variables);
    await createUser({ variables });
    if (payload.error) {
      setError("Something Occurred!!");
    }
    setSuccess(true);
    reset({
      email: "",
      name: "",
      password: "",
      username: "",
    });
    setAffilation("");
  }

  return (
    <>
      <SEO title="Sign up" />
      {error && <ErrorAlert message={error} setError={setError} />}
      {success && (
        <SuccessAlert
          message={"Verification Email Sent"}
          setError={setSuccess}
        />
      )}
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            {/* <img src={logo} alt="logo" style={{ margin: "auto" }} /> */}
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to Post Questions and help someone else
            </Typography>
            {/* <LoginWithFacebook color="secondary" variant="contained" /> */}
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ color: "#fff" }}
                >
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
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
                    label="Email"
                    type="email"
                    margin="dense"
                    className={classes.textField}
                    InputProps={{
                      style: {
                        color: "#fff",
                      },
                    }}
                  />
                )}
                rules={{
                  validate: (input) => isEmail(input),
                }}
              />
              <Controller
                name="name"
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
                    label="Name"
                    margin="dense"
                    className={classes.textField}
                    InputProps={{
                      style: {
                        color: "#fff",
                      },
                    }}
                  />
                )}
                rules={{ required: true, minLength: 5, maxLength: 20 }}
              />
              <Controller
                name="username"
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
                    label="Username"
                    margin="dense"
                    className={classes.textField}
                    InputProps={{
                      //   endAdornment: errors.name
                      //     ? errorIcon
                      //     : formState.touched.name && validIcon,
                      style: {
                        color: "#fff",
                      },
                    }}
                  />
                )}
                rules={{
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  pattern: /^[a-zA-Z0-9_.]*$/,
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
                      //   endAdornment: errors.password
                      //     ? errorIcon
                      //     : formState.touched.password && validIcon,
                      style: {
                        color: "#fff",
                      },
                    }}
                    fullWidth
                    variant="filled"
                    label="Password"
                    type="password"
                    margin="dense"
                    className={classes.textField}
                    autoComplete="new-password"
                  />
                )}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  // marginTop: "0.5rem",
                }}
              >
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Affiliation
                </InputLabel>

                <Select
                  id="select-affiliation"
                  value={affilation}
                  label="Affiliation"
                  onChange={handleChange}
                  style={{
                    marginBottom: "1rem",
                  }}
                >
                  {affiliations &&
                    affiliations.map((a) => (
                      <MenuItem key={a} value={a}>
                        {a}
                      </MenuItem>
                    ))}
                </Select>
              </div>
              <Button
                // disabled={!formState.isValid || formState.isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
                // onClick={kyaError}
              >
                Sign Up
              </Button>
            </form>
            {/* <AuthError error={error} /> */}
          </Card>
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2">
              Have an account?
            </Typography>
            <Link to="/accounts/login">
              <Button color="primary" className={classes.loginButton}>
                Log in
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
};

export function AuthError({ error }) {
  return (
    Boolean(error) && (
      <Typography
        align="center"
        gutterBottom
        variant="body2"
        style={{ color: "red" }}
      >
        {error}
      </Typography>
    )
  );
}

export default SignUp;
