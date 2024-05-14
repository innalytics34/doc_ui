import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { getFromAPI} from "../apiCall/ApiCall.js";

function Showadmindash() {
  const [getCount, setCount] = useState([
    {
      tasktype: "Single Document",
      assigned_to_assignee: 0,
      assigned_to_checker: 0,
      completed: 0,
      rejected_by_checker: 0,
    },
    {
      tasktype: "Statement Upload",
      assigned_to_assignee: 0,
      assigned_to_checker: 0,
      completed: 0,
      rejected_by_checker: 0,
    },
  ]);
  const [getCountTotal, setCountTotal] = useState([
    {
        Assigned_to_Assignee: 0,
        Assigned_to_Checker: 0,
        completed: 0,
        Rejected_by_Checker: 0,
    },
  ]);
  useEffect(() => {
    async function fetchUserOptions() {
      try {
        const response = await getFromAPI("/admintaskcount");
        setCount(response.lst);
        setCountTotal(response.all);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }

    fetchUserOptions();
  }, []);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ display: "flex" }}
          >
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, backgroundColor: "#338BA8", cursor: "pointer" }}
              >
                <Typography
                  sx={{ fontSize: 25, textAlign: "center", color: "white" }}
                >
                  {getCountTotal[0].Assigned_to_Assignee}
                </Typography>
              </Paper>
              <br />
              <Typography
                sx={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "#338BA8",
                  fontWeight: "bold",
                }}
              >
                Assigned to Assignee
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, backgroundColor: "#E49B0F", cursor: "pointer" }}
              >
                <Typography
                  sx={{ fontSize: 25, textAlign: "center", color: "white" }}
                >
                  {getCountTotal[0].Assigned_to_Checker}
                </Typography>
              </Paper>
              <br />
              <Typography
                sx={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "#E49B0F",
                  fontWeight: "bold",
                }}
              >
                Assigned to Checker
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, backgroundColor: "#2E8B57", cursor: "pointer" }}
              >
                <Typography
                  sx={{ fontSize: 25, textAlign: "center", color: "white" }}
                >
                  {getCountTotal[0].completed}
                </Typography>
              </Paper>
              <br />
              <Typography
                sx={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "#2E8B57",
                  fontWeight: "bold",
                }}
              >
                Completed
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, backgroundColor: "#FF7518", cursor: "pointer" }}
              >
                <Typography
                  sx={{ fontSize: 25, textAlign: "center", color: "white" }}
                >
                  {getCountTotal[0].Rejected_by_Checker}
                </Typography>
              </Paper>
              <br />
              <Typography
                sx={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "#FF7518",
                  fontWeight: "bold",
                }}
              >
               Rejected by Checker
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {getCount.map((task, index) => (
          <Grid key={index} item xs={12} sm={6} md={6}>
            <Card sx={{ minWidth: 275 }}>
              <br />
              <Typography
                sx={{
                  fontSize: 16,
                  textAlign: "center",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                {task.task_name}
              </Typography>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ display: "flex" }}
                >
                  <Grid item xs={12} sm={6} md={2.4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        backgroundColor: "#338BA8",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 25,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {task.assigned_to_assignee}
                      </Typography>
                    </Paper>
                    <br />
                    {/* <Typography
                      sx={{
                        fontSize: 15,
                        textAlign: "center",
                        color: "#338BA8",
                        fontWeight: "bold",
                      }}
                    >
                      Assigned_to_Assignee
                    </Typography> */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        backgroundColor: "#E49B0F",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 25,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {task.assigned_to_checker}
                      </Typography>
                    </Paper>
                    <br />
                    {/* <Typography
                      sx={{
                        fontSize: 15,
                        textAlign: "center",
                        color: "#E49B0F",
                        fontWeight: "bold",
                      }}
                    >
                      Assigned to Checker
                    </Typography> */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        backgroundColor: "#2E8B57",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 25,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {task.completed}
                      </Typography>
                    </Paper>
                    <br />
                    {/* <Typography
                      sx={{
                        fontSize: 15,
                        textAlign: "center",
                        color: "#2E8B57",
                        fontWeight: "bold",
                      }}
                    >
                      Completed
                    </Typography> */}
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        backgroundColor: "#FF7518",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 25,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {task.rejected_by_checker}
                      </Typography>
                    </Paper>
                    <br />
                    {/* <Typography
                      sx={{
                        fontSize: 15,
                        textAlign: "center",
                        color: "#FF7518",
                        fontWeight: "bold",
                      }}
                    >
                      Rejected by Checker
                    </Typography> */}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Showadmindash;
