import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

const initialValues = {
  userName: "",
  userSurName: "",
  userSalary: "",
};

function App() {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });

  const handleRemoveClick = (index) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));
  };

  const handleEditClick = (data, index) => {
    setUserData(data);
    setEditableUserData({
      isEdit: true,
      userIndex: index,
    });
  };

  const isFilledFields =
    userData.userName && userData.userSurName && userData.userSalary;

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (isFilledFields) {
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userData);

        setUserData(editedData);

        setEditableUserData({
          isEdit: false,
          userIndex: null,
        });
      } else {
        setUsers((prevState) => [...prevState, userData]);
      }

      setUserData(initialValues);
    }
  };

  const handleCleanClick = () => setUserData(initialValues);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div className="wrapper-table">
          <table>
            <th>#</th>
            <th>User Name</th>
            <th>User Surname</th>
            <th>User Salary</th>
            <th>Date</th>
            <th>Actions</th>

            <tbody>
              {users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.userSurName}</td>
                  <td>{user.userSalary}</td>
                  <td>{date}</td>
                  <td>
                    <Button
                      size="sm"
                      className="edit-action"
                      onClick={() => handleEditClick(user, index)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="remove-action"
                      onClick={() => handleRemoveClick(index)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <form
            onSubmit={handleSubmitUser}
            onReset={handleCleanClick}
            action=""
          >
            <input
              placeholder="Write you name"
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }))
              }
              value={userData.userName}
            />
            <input
              placeholder="Write you surname"
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userSurName: e.target.value,
                }))
              }
              value={userData.userSurName}
            />
            <input
              placeholder="Write you salary"
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  userSalary: e.target.value,
                }))
              }
              value={userData.userSalary}
            />

            <div className="buttons-wrapper">
              <Button variant="primary" type="reset">
                Clean
              </Button>

              {editableUserData.isEdit ? (
                <Button
                  variant="secondary"
                  disabled={!isFilledFields}
                  type="submit"
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="success"
                  disabled={!isFilledFields}
                  type="submit"
                >
                  Add
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
