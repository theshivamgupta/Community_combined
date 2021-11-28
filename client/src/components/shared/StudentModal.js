import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_STUDENTS } from "../../graphql/query";
import { INCREASE_USER_POWER } from "../../graphql/mutations";
import { myContext } from "../../context/NewPostContext";
import {
  Avatar,
  Checkbox,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import defaultImage from "../../assets/images/defaultImage.jpg";

const StudentModal = () => {
  const { data, loading, refetch } = useQuery(GET_ALL_STUDENTS);
  const { studentModal, handleStudentModal } = React.useContext(myContext);
  // eslint-disable-next-line no-unused-vars
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [increasePower] = useMutation(INCREASE_USER_POWER);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  const users = data?.getStudentUsers;
  async function handlePowerUser(e) {
    e.preventDefault();
    if (selectedValue) {
      const variables = {
        id: selectedValue,
      };
      await increasePower({ variables });
      refetch();
    }
  }

  return (
    <>
      <Dialog onClose={handleStudentModal} open={studentModal} fullWidth={true}>
        <DialogTitle>
          Power Up User
          <button
            type="button"
            className="btn btn btn-outline-info ml-6"
            onClick={handlePowerUser}
          >
            Power Up!
          </button>
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          {users?.map((user) => (
            <ListItem button key={user?.id}>
              <ListItemAvatar>
                <Checkbox
                  onChange={(e) => {
                    e.preventDefault();
                    console.log(user?.id);
                    setSelectedValue(user?.id);
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div className="flex">
                    <Avatar
                      src={
                        user?.profileImage ? user?.profileImage : defaultImage
                      }
                      className="mr-4"
                    />
                    <Typography variant="h6" gutterBottom component="span">
                      {user.firstName} {user?.lastName} ({user?.username})
                    </Typography>
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default StudentModal;
