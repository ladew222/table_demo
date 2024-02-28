import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Button, Modal, Box, Typography, TextField } from '@mui/material'; 
import axios from 'axios';

const UsersWithForm = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const toggleForm = () => setShowForm(!showForm);

  const formModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={toggleForm}>
        {showForm ? 'Hide Form' : 'Add User'}
      </Button>

      <Modal open={showForm} onClose={toggleForm}>
        <Box sx={formModalStyle}>
          <Typography variant="h6" component="h2">
            Add New User
          </Typography>
          <TextField id="name" label="Name" fullWidth margin="normal" />
          <TextField id="email" label="Email" fullWidth margin="normal" />
          <Button onClick={toggleForm} color="primary">
            Submit
          </Button>
        </Box>
      </Modal>

      <MaterialTable
        title="User Data"
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Name', field: 'name' },
          { title: 'Username', field: 'username' },
          { title: 'Email', field: 'email' },
          // Add more columns as needed
        ]}
        data={data}
        options={{
          search: true
        }}
      />
    </>
  );
};

export default UsersWithForm;