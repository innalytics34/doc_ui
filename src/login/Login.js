import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getFromAPI, postToAPI } from "../apiCall/ApiCall.js";
import { Container, Paper, Alert, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import {
  LockOpen as LockOpenIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [branchOptions, setBranchOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchBranchOptions() {
      try {
        const response = await getFromAPI("/branch_list");

        setBranchOptions(
          response.branch_lst.map((branch) => ({
            label: branch.master_branch_name,
            branch_fk: branch.master_branch_pk,
          }))
        );

      } catch (error) {
        console.error("Error fetching user options:", error);
      }
    }

    fetchBranchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {username: username, password: password };
      const currentTime = new Date().toISOString();
      const result = await postToAPI("/login", data);
      if (result.rval > 0) {
        Cookies.set("name", result.data[0].Name);
        Cookies.set("comp_name", result.data[0].comp_name);
        Cookies.set("is_admin", result.data[0].is_admin);
        Cookies.set("emp_fk", result.data[0].employee_fk);
        Cookies.set("token", result.token);
        Cookies.set("Islogin", true);
        Cookies.set("loginTime", currentTime);
        Cookies.set("loginStatus", 1);
        navigate("/Dashboard");
        window.location.reload()
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Container maxWidth="xs" className="login_c">
      <Paper elevation={3} style={{ padding: "40px", textAlign: "center" }}>
        <LockOpenIcon
          style={{ color: "#296E85", width: "50px", height: "50px" }}
        />
        <br />
        <br />
        <form onSubmit={handleSubmit}>

          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={branchOptions}
            value={selectedUser}
            onChange={(event, newValue) => {
              setSelectedUser(newValue);
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Branch" />}
          />
          <br /> */}

          <TextField
            label="Username or ID"
            type="text"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setusername(e.target.value)}
            sx={{ marginBottom: 2 }}
          /><br/>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "100%", marginBottom: 16 }}
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
          <Stack sx={{ width: "100%" }} spacing={2}>
            {showAlert && (
              <Alert severity="error" onClose={handleCloseAlert}>
                User Invalid
              </Alert>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
