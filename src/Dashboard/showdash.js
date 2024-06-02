import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { getFromAPI} from "../apiCall/ApiCall.js";
function Showdash() {
  const [getCount, setCount] = useState([
    {
      tasktype: "Single Document",
      opentask: 0,
      pendingtask: 0,
      completedtask: 0,
      underreview: 0,
      rejectedtask:0
    },
    {
      tasktype: "Statement Upload",
      opentask: 0,
      pendingtask: 0,
      completedtask: 0,
      underreview: 0,
      rejectedtask:0
    },
  ]);
  const [getCountTotal, setCountTotal] = useState([
    {
      open: 0,
      pending: 0,
      completed: 0,
      review: 0,
      rejected: 0
    },
  ]);
  useEffect(() => {
    async function fetchUserOptions() {
      try {
        const response = await getFromAPI("/webtaskcount");
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
                  {getCountTotal[0].open}
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
                Open Task
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
                  {getCountTotal[0].pending}
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
                Delayed Task
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
                Completed Task
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
                  {getCountTotal[0].review}
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
                Review Task
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, backgroundColor: "#E23F44", cursor: "pointer" }}
              >
                <Typography
                  sx={{ fontSize: 25, textAlign: "center", color: "white" }}
                >
                  {getCountTotal[0].rejected}
                </Typography>
              </Paper>
              <br />
              <Typography
                sx={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "#E23F44",
                  fontWeight: "bold",
                }}
              >
                Rejected Task
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
                        {task.opentask}
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
                      Open
                    </Typography>
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
                        {task.pendingtask}
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
                      Delayed
                    </Typography>
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
                        {task.completedtask}
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
                        {task.underreview}
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
                      Review
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        backgroundColor: "#E23F44",
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
                        {task.rejectedtask}
                      </Typography>
                    </Paper>
                    <br />
                    <Typography
                      sx={{
                        fontSize: 15,
                        textAlign: "center",
                        color: "#E23F44",
                        fontWeight: "bold",
                      }}
                    >
                      Rejected
                    </Typography>
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

export default Showdash;
