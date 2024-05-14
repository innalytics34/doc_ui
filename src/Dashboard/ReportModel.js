import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import { postToAPI, getFromAPI } from "../apiCall/ApiCall.js";
import PdftoIMG from '../Dashboard/pdftoimg';

const ReportModel = ({ row, onRefresh }) => {
  const [showModal, setShowModal] = useState(true);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const handleCloseModal = () => setShowModal(false);
  const handleClosePreviewModal = () => setShowPreviewModal(false);
  const [filetype, setfiletype] = useState('');

  useEffect(()=>{
    async function fetchTaskData() {
        try {
            const data = {"task_fk": row['Task ID']}
            const response = await getFromAPI("/get_reportfile?data=" + JSON.stringify(data));
            setPreviewFile(response.encoded_string);
            setfiletype(response.type)
            setShowPreviewModal(true);
        } catch (error) {
          console.error("Error fetching task data:", error);
        } finally {
        }
      }
      fetchTaskData();
    }, []);

  const handleSubmit = async (e) => {
    try {
      const remarks  = document.getElementById('remarks').value;
      const data = {'remarks': remarks, 'task_fk': row["Task ID"], 'status' : 4}
      const response = await postToAPI("/checkerupdatestatus", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.message,
      });
     
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
    handleCloseModal();
    if (onRefresh) {
      onRefresh();
    }
  };


  const renderPreview = () => {
    if (previewFile && previewFile.startsWith("data:image")) {
      return (
        <img
          src={`${previewFile}`}
          alt="Preview"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      );
    } else if (previewFile && previewFile.startsWith("data:application/pdf")) {
      return (
        <iframe
          src={`${previewFile}`}
          type="application/pdf"
          width="100%"
          height="auto"
          style={{ border: "none" }}
          title="Preview PDF"
        ></iframe>
      );
    } else {
      return <p>No preview available</p>;
    }
  };

  const handleReject = async ()=>{
    try {
      const remarks  = document.getElementById('remarks').value;
      const data = {'remarks': remarks, 'task_fk': row["Task ID"], 'status' : 5}
      const response = await postToAPI("/checkerupdatestatus", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.message,
      });
     
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
    handleCloseModal();
    if (onRefresh) {
      onRefresh();
    }

  }


  return (
    <div>
      {/* Main Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="modal-lg"
        style={{ zIndex: 9999 }}
      >
        <Modal.Header closeButton style={{color: 'gray', fontWeight: '400', fontSize: 20}}>
        Assigner Remarks :  {row["Assigner Remarks"]}
        </Modal.Header>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Modal.Body>
        <h6 style={{color: 'gray', fontWeight: '400'}}>Assignee Remarks : {row["Assignee Remarks"]}</h6>
        <h6 style={{color: 'gray', fontWeight: '400'}}>Checker Remarks : {row["Checker Remarks"]}</h6>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer>
                <Table size="small" className="custom-table">
                  <TableBody>
                    {Object.entries(row["Data"]).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell style={{color: '#034694', fontWeight: '500'}}>{key}</TableCell>
                        <TableCell style={{color: '#034694', fontWeight: '500'}}>{value}</TableCell>
                      </TableRow>
                    ))}   
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={12}>
            <PdftoIMG base64string = {previewFile} file_type = {filetype}/>
            </Grid>
            {/* <Grid item xs={12} md={12}>
                <Grid item xs={12} md={4}>
                  <label>Remarks</label>
                </Grid> 
                <Grid item xs={12} md={8}>
                <textarea rows="4" cols="50" id="remarks" name="comment" form="usrform" style={{background:'#E2DED0'}}>
                  </textarea>
                </Grid>
            </Grid>  */}
          </Grid>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button
            variant="outline-primary"
            type="submit"
            className="button_css"
            onClick={handleReject}
          >
            Reject
          </Button>
          <Button
            variant="outline-primary"
            type="submit"
            className="button_css"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer> */}
      </Modal>

      
    </div>
  );
};

export default ReportModel;
