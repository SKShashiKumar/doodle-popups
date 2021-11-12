import axios from "axios";
import React, { useEffect, useState } from "react";
import './main.css'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send'
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
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



const Main = () => {
  const [resp, setResp] = useState([]);
  const [users,setUsers] = useState([0]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res.data);
        setResp(res.data);
      })
      .catch((err) => console.log(err.name));
  }, []);

  const viewRow = (user) => {
      setUsers(user)
  }

  const deleteRow =  (id) => {
    setResp(resp.filter(usr => usr.id !== id))
  }

  return (
    <>
      <h1>DoodData</h1>
      <center>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" className="tableStyles">
            <TableHead className="tableHead">
              <TableRow>
                <TableCell align="center"><span className="headTable"></span></TableCell>
                <TableCell align="left"><span className="headTable">User Name</span></TableCell>
                <TableCell align="left"><span className="headTable">Full Name</span></TableCell>
                <TableCell align="left"><span className="headTable">Email</span></TableCell>
                <TableCell align="left"><span className="headTable">Address</span></TableCell>
                <TableCell align="center" colSpan={2}><span className="headTable">Actions</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resp.map((row) => (
                <TableRow
                  key={row.id}
                  className="tableRows"
                >
                  <TableCell align="center">
                    <Avatar alt={row.username} src="."></Avatar>
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.address.city}</TableCell>
                  <TableCell align="left">
                    <Button variant="contained" color="primary" onClick={() => {viewRow(row);handleOpen()}} startIcon={<SendIcon/>}>View</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => deleteRow(row.id)} variant="contained" color="error" startIcon={<DeleteIcon />}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </center>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
            <Typography id="modal-modal-title"  >
              
              <h1>{users.username}</h1>
              {console.log(users)}
            </Typography>
            <Grid container>
            <Typography id="modal-modal-description">
              
                <Grid item spacing={6}>
                <h3> Name :</h3>
                </Grid>
                <Grid item spacing={6}>
              {users.name}
              </Grid>
            </Typography>
            </Grid>
            <Grid container>
            <Typography id="modal-modal-description">
                <Grid item spacing={6}>
                <h3> Email :</h3>
                </Grid>
                <Grid item spacing={6}>
              {users.email}
              </Grid>
            </Typography>
            </Grid>
            
            <Grid container>
            <Typography id="modal-modal-description">
                <Grid item spacing={6}>
                <h3> Phone :</h3>
                </Grid>
                <Grid item spacing={6}>
              {users.phone}
              </Grid>
            </Typography>
            </Grid>
            <br/>
            <Grid container>
              <Grid item spacing={1}>
              <Button onClick={handleClose} variant="contained" color="warning">Close</Button>
              </Grid>
            </Grid>
        </Box>

      </Modal>
    </>
  );
};

export default Main;
