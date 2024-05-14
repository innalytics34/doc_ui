import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Cookies from "js-cookie";
import { getFromAPI } from "../apiCall/ApiCall.js";
import Checkerverify from "../Dashboard/Checker_verify.js";
export default function GetOpenTask() {
  const [taskData, setTaskData] = useState(null);

  async function fetchData() {
    try {
      var data = { emp_fk: Cookies.get("emp_fk") };
      const response = await getFromAPI(
        "/get_checkerdata?data=" + JSON.stringify(data)
      );
      setTaskData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div>
      {taskData && (
        <Grid container spacing={2}>
          {taskData.checker_sdf && taskData.checker_sdf.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" style={{ color: "gray" }}>
                Single Documents
              </Typography>
            </Grid>
          )}
          {taskData.checker_sdf &&
            taskData.checker_sdf.map((doc) => (
              <Grid key={doc.doc_pk} item xs={12} sm={6} md={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Document Name:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.doc_name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Name
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Document Number:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.DocumentNumber}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assignee:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assignee}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assignee Remarks:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assignee_remarks}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assigner Remarks:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assigner_remarks}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Target Date:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.target_date}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                  <Typography align="right" sx={{ fontSize: 14, padding: 1 }}>
                    <Checkerverify
                      data={doc}
                      onRefresh={handleRefresh}
                      status={"1"}
                    />
                  </Typography>
                </Card>
              </Grid>
            ))}
          {taskData.checker_sdu && taskData.checker_sdu.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" style={{ color: "gray" }}>
                Statement Upload
              </Typography>
            </Grid>
          )}
          {taskData.checker_sdu &&
            taskData.checker_sdu.map((doc) => (
              <Grid key={doc.doc_pk} item xs={12} sm={6} md={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Issuer Name:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.issuer_name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Account Number:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.account_no}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                From Date:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.fromdate}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                To Date
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.to_date}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assignee:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assignee}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assignee Remarks:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assignee_remarks}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assigner Remarks:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assigner_remarks}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Target Date:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.target_date}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Notes:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.taskupload_data}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                  <Typography align="right" sx={{ fontSize: 14, padding: 1 }}>
                    <Checkerverify
                      data={doc}
                      onRefresh={handleRefresh}
                      status={"2"}
                    />
                  </Typography>
                </Card>
              </Grid>
            ))}
          {taskData.checker_po && taskData.checker_po.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" style={{ color: "gray" }}>
                PurchaseOrder Uploads
              </Typography>
            </Grid>
          )}
          {taskData.checker_po &&
            taskData.checker_po.map((doc) => (
              <Grid key={doc.doc_pk} item xs={12} sm={6} md={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Issuer Name:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.issuer_name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Document Number:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.doc_no}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Basic Value:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.basic_value}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Tax:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.tax}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Total:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.total}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Validity Date:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.validity_date}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assignee:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assignee}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assignee Remarks:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assignee_remarks}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assigner Remarks:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assigner_remarks}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Target Date:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.target_date}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Notes:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.taskupload_data}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                  <Typography align="right" sx={{ fontSize: 14, padding: 1 }}>
                    <Checkerverify
                      data={doc}
                      onRefresh={handleRefresh}
                      status={"3"}
                    />
                  </Typography>
                </Card>
              </Grid>
            ))}
          {taskData.checker_rp && taskData.checker_rp.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" style={{ color: "gray" }}>
                Receipt / Proof Upload
              </Typography>
            </Grid>
          )}
          {taskData.checker_rp &&
            taskData.checker_rp.map((doc) => (
              <Grid key={doc.doc_pk} item xs={12} sm={6} md={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Issuer Name:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.issuer_name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Customer Name:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.customer_name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Receipt Number:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.receipt_no}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Invoice Number:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.invoice_no}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                From Company:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.from_company}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                To Company:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.to_company}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Payment Method:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.payment_method}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assignee:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assignee}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assignee Remarks:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assignee_remarks}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Assigner Remarks:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.assigner_remarks}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                Target Date:
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {doc.target_date}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                  <Typography align="right" sx={{ fontSize: 14, padding: 1 }}>
                    <Checkerverify
                      data={doc}
                      onRefresh={handleRefresh}
                      status={"4"}
                    />
                  </Typography>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
}
