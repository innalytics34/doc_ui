import React, { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskIcon from "@mui/icons-material/Task";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Showdash from "./showdash";
import AdminReport from "./AdminReport.js";
import EmpReport from "./EmpReport.js";
import { getFromAPI } from "../apiCall/ApiCall.js";
import Jobassign from "../Jobassign/jobassign.js";
import TaskData from "../taskstatus/taskdata.js";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Checkerdata from '../taskstatus/checkerdata';
import Showadmindash from '../Dashboard/showadmindash.js';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    background: 'white',
    color:'#0C6980',
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Dashboard(props) {
  const [open, setOpen] = useState(true);
  const [taskData, setTaskData] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showContainerstatus, setshowContainerstatus] = useState(false);
  const [showdash, setshowdash] = useState(true);
  const [showreport, setshowreport] = useState(false);
  const [showtaskstatus, settaskstatus] = useState(false);
  const [getunderreview, setunderreview] = useState(false)

  const navigate = useNavigate();
  const username = Cookies.get("name");
  const compname = Cookies.get("comp_name");
  const isadmin = Cookies.get("is_admin");

  

  useEffect(() => {
    async function fetchTaskData() {
      try {
        const response1 = await getFromAPI("/task_list");
        setTaskData(response1);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    }
    fetchTaskData();
  }, []);

  const renderTaskComponent = () => {
    return <Jobassign data={{ task_type: selectedTask }} />;
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.set("name", '');
    Cookies.set("comp_name", '');
    Cookies.set("is_admin", '');
    Cookies.set("emp_fk", '');
    Cookies.set("token", '');
    Cookies.set("Islogin", false);
    Cookies.set("loginTime", '');
    Cookies.set("loginStatus", 1);
    navigate("/", { replace: true });
  };

  const handleTaskAssignment = (task) => {
    setshowContainerstatus(true);
    setSelectedTask(task);
    setshowdash(false);
    setshowreport(false);
    setunderreview(false);
    settaskstatus(false);
  };

  const dashonclick = () => {
    setshowdash(true);
    setshowContainerstatus(false);
    setshowreport(false);
    settaskstatus(false);
    setunderreview(false);
  };
  const reportclick = () => {
    setshowreport(true);
    setshowContainerstatus(false);
    setshowdash(false);
    settaskstatus(false);
    setunderreview(false);
  };

  const taskstatusclick = () => {
    settaskstatus(true);
    setshowdash(false);
    setshowreport(false);
    setshowContainerstatus(false);
    setunderreview(false);
  }

  const underreviewclick = () => {
    setunderreview(true);
    setshowreport(false);
    setshowContainerstatus(false);
    setshowdash(false);
    settaskstatus(false);
  }

  


  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open} className="appbar">
            <Toolbar
              sx={{
                pr: "24px",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, fontSize: 16 }}
              >
                <span style={{ fontSize: 14, fontWeight: "bold" }}>
                  {compname}&nbsp;&nbsp;&nbsp;Work Management Portal
                </span>
              </Typography>
              <IconButton
                onClick={handleMenu}
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <span style={{ fontSize: 14, fontWeight: "bold" }}>
                  {username}&nbsp;&nbsp;&nbsp;
                </span>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open1}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <PersonOutlineIcon />
                  &nbsp;{username}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon />
                  &nbsp;Logout
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
                color: 'white'
              }}
            >
              <IconButton onClick={() => setOpen(!open)}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItemButton key="dashboard" onClick={dashonclick}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
          
                {isadmin === "1" && (
                <ListItemButton data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" key="task">
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Job Assignment" /><ExpandMoreIcon style={{ color: 'gray' }} />
                </ListItemButton>
              )}

              <div class="collapse" id="collapseExample" style={{ marginLeft: 5,padding:5, cursor: "pointer", zIndex: 100}}>
                <ul>
                  {taskData &&
                    taskData.task_lst.map((task, index) => (
                      <li key={task.tasklist_pk} style={{padding:5,  zIndex: 4}} onClick={() => handleTaskAssignment(task.tasklist_pk)}>
                        {task.name}
                      </li>
                    ))}
                </ul>
              </div>
            {isadmin === "0" && (
              <ListItemButton key="Tasks" onClick={taskstatusclick}>
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText primary="Assigned Task" />
              </ListItemButton>
            )} 
            {isadmin === "0" && ( 
              <ListItemButton key="UnderReview" onClick={underreviewclick}>
                <ListItemIcon>
                  <ReviewsIcon />
                </ListItemIcon>
                <ListItemText primary="Under Review" />
              </ListItemButton>
            )}
              <ListItemButton key="reports" onClick={reportclick}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItemButton>
              <Divider sx={{ my: 1}} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {showdash && isadmin === "1" && <Showadmindash />}
              {showdash && isadmin === "0" && <Showdash />}
              {showreport && isadmin === "1" && <AdminReport />}
              {showreport && isadmin === "0" && <EmpReport />}
              {showtaskstatus && <TaskData />}
              {getunderreview && <Checkerdata />}
              {showContainerstatus && renderTaskComponent()}
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
