import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";

import { getUser, saveUser, deleteUser } from "./redux/ducks/user";
import { useSelector } from "react-redux";

export default function DataTable() {
  const dispatch = useDispatch();
  const [editableId, setEditableId] = useState(null);

  const [editableUser, setEditableUser] = useState(null);

  useEffect(() => {
    console.log("USE EFFECT");
    callApi();
  }, [dispatch]);

  const callApi = () => {
    console.log("CALLING API");
    dispatch(getUser());
  };

  const user = useSelector((state) => state.user.user);
  {
    user && console.log(user.data);
  }

  const handleEditUser = (data) => {
    setEditableId(data.id);
    setEditableUser(data);
  };

  const handleEditUserValue = (prop, value) => {
    console.log("HANDLER FUNCTIOn", prop, value);
    editableUser[prop] = value;
    setEditableUser({ ...editableUser });
  };

  const handleSave = () => {
    window.localStorage.setItem("user", JSON.stringify(editableUser));
    dispatch(saveUser(editableUser));
    setEditableUser(null);
  };

  const handleDelete = (user) => {
    console.log("DELETE");
    dispatch(deleteUser(user));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user &&
              user.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  {editableUser?.id !== user.id ? (
                    <>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.first_name}</TableCell>
                      <TableCell align="left">{user.last_name}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="left">
                        <input
                          type="text"
                          value={editableUser.email}
                          onChange={(e) =>
                            handleEditUserValue("email", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <input
                          type="text"
                          value={editableUser.first_name}
                          onChange={(e) =>
                            handleEditUserValue("first_name", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <input
                          type="text"
                          value={editableUser.last_name}
                          onChange={(e) =>
                            handleEditUserValue("last_name", e.target.value)
                          }
                        />
                      </TableCell>
                    </>
                  )}
                  <TableCell align="left">
                    <img
                      src={user.avatar}
                      style={{ width: 50, height: 50 }}
                      alt="img"
                    />
                  </TableCell>
                  {editableUser?.id !== user.id ? (
                    <TableCell>
                      <EditIcon onClick={() => handleEditUser(user)} />
                    </TableCell>
                  ) : (
                    <TableCell>
                      <button onClick={handleSave}>Save</button>
                    </TableCell>
                  )}
                  <TableCell
                    onClick={() => {
                      handleDelete(user);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
