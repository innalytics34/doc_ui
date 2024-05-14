import { getFromAPI } from "../apiCall/ApiCall.js";
import PreviewIcon from '@mui/icons-material/Preview';
import React, { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import {Modal} from "react-bootstrap";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Checkermodel from '../Dashboard/checkermodel.js';
import ExportExcel from '../Dashboard/ExportExcel.js';
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableSortLabel,
} from "@mui/material";

function Checkerdata() {
  const [taskData, setTaskData] = useState(null);
  // const [getemplst, setemplst] = useState(null);
  const [taskstatus, setTaskstatus] = useState(null);
  const [selectedTask, setSelectedTask] = useState(0);
  const [getreports, setReports] = useState([]);
  const [getheader, setheader] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  // const [previewFile,  setPreviewFile] = useState(null);
  // const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [getmodel, setmodel] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [selectedHeader, setSelectedHeader] = useState(null);



    async function fetchTaskData() {
      try {
        const response1 = await getFromAPI("/task_list");
        setTaskData(response1.task_lst);
        // const response2 = await getFromAPI("/emp_details_list");
        // setemplst(response2.emp_details_lst);
        const response3 = await getFromAPI("/taskstatuslist");
        setTaskstatus(response3.ts_lst);
        var data = {task_type: 0, taskstatus: 0};
        const response = await getFromAPI("/get_checkerdata?data=" + JSON.stringify(data));
        setReports(response.reports);
        setheader(response.header);
      } catch (error) {
        console.error("Error fetching task data:", error);
      } finally {
      }
    }
  

  useEffect(() => {
    fetchTaskData();
  }, []);

  const handleRefresh = () => {
    fetchTaskData();
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    var data = {task_type: selectedTask, taskstatus: selectedStatus};
    const response = await getFromAPI("/get_checkerdata?data=" + JSON.stringify(data));
    setReports(response.reports);
    setheader(response.header);
  };

  const handleSort = (header) => {
    setSortBy(header);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedReports = [...getreports].sort((a, b) => {
    if (sortBy === null) return 0;
    const aValue = String(a[sortBy]); // Convert to string
    const bValue = String(b[sortBy]); // Convert to string
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
  
  const handleClosePreviewModal = () => setShowPreviewModal(false);

 

  // const handleChangeEmployee = (event) => {
  //   setSelectedEmployee(event.target.value);
  // };

  const handleChangeTask = (event) => {
    setSelectedTask(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleDocumentClick = (row, header) => {
    setSelectedRow(row);
    // setSelectedHeader(header);
    if (getmodel) {
      setmodel(false);
    } else {
      setmodel(true);
    }
  };

  // const renderPreview = () => {
  //   if (previewFile && previewFile.startsWith("data:image")) {
  //     return (
  //       <img
  //         src={`${previewFile}`}
  //         alt="Preview"
  //         style={{ maxWidth: "100%", height: "auto" }}
  //       />
  //     );
  //   } else if (previewFile && previewFile.startsWith("data:application/pdf")) {
  //     return (
  //       <iframe
  //         src={`${previewFile}`}
  //         type="application/pdf"
  //         width="100%"
  //         height="auto"
  //         style={{ border: "none" }}
  //         title="Preview PDF"
  //       ></iframe>
  //     );
  //   } else {
  //     return <p>No preview available</p>;
  //   }
  // };


 
  return (
    <>
       <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="task-select-label">Select Task</InputLabel>
            <Select
              labelId="task-select-label"
              id="task-select"
              value={selectedTask}
              onChange={handleChangeTask}
              label="Select Task"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              }}
              size="small"
            >
              <MenuItem value="0">
                All
              </MenuItem>
              {taskData &&
                taskData.map((task) => (
                  <MenuItem key={task.tasklist_pk} value={task.tasklist_pk}>
                    {task.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-select-label">Select Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={selectedStatus}
              onChange={handleChangeStatus}
              label="Select Status"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              }}
              size="small"
            >
              <MenuItem value="0">
                All
              </MenuItem>
              {taskstatus &&
                taskstatus.map((task) => (
                  <MenuItem key={task.ts_pk} value={task.ts_pk}>
                    {task.ts_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} md={3}>
          <Button variant="contained" type="submit" className="button_css">
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
      <ExportExcel excelData={getreports} fileName="report"/>
    </form>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="tableheader">
            <TableRow>
              <TableCell>
                <TableSortLabel sx={{ color: 'white',fontWeight: 'bold' }}
                  active={sortBy === null}
                  direction={sortOrder}
                  onClick={() => handleSort(null)}
                >
                  S.No
                </TableSortLabel>
              </TableCell>
              {getheader.map((header, index) => (
                <TableCell key={index} sx={{ color: 'white',fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  <TableSortLabel
                    active={sortBy === header}
                    direction={sortOrder}
                    onClick={() => handleSort(header)}
                  >
                    {header}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedReports && sortedReports.length > 0 ? (
              sortedReports.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{rowIndex + 1}</TableCell>
                  {getheader.map((header, headerIndex) => {
                     if (header === 'Document') {
                        return (
                          <TableCell key={headerIndex} sx={{ cursor: 'pointer',whiteSpace: 'nowrap' }} onClick={() => handleDocumentClick(row, header)}>
                            <PreviewIcon />
                          </TableCell>
                        );
                      }
                    if (header === 'Action') {
                      return (
                        <TableCell key={headerIndex} sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => handleDocumentClick(row, header)}>
                          <ArrowCircleRightIcon sx={{ color: '#088F8F', width: 30, height: 30 }} />
                        </TableCell>
                      );
                    } else {
                      return <TableCell key={headerIndex} sx={{ whiteSpace: 'nowrap' }}>{row[header]}</TableCell>;
                    }
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell style={{color:'gray', textAlign: 'center', fontWeight: 'bold'}} colSpan={getheader.length + 1}>No data available</TableCell>
              </TableRow>
            )}
        </TableBody>
        </Table>
      </TableContainer>
      <Modal
        show={showPreviewModal}
        onHide={handleClosePreviewModal}
        dialogClassName="modal-xl"
        centered
        style={{ zIndex: 9999 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
      </Modal>
      {getmodel && <Checkermodel row={selectedRow}  onRefresh={handleRefresh}/>}
    </>
  );
}

export default Checkerdata;
