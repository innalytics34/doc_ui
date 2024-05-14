import React, { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import { postToAPI } from "../apiCall/ApiCall.js";
import PdftoIMG from '../Dashboard/pdftoimg';

const Assigntask = ({ row, onRefresh }) => {
  const [showModal, setShowModal] = useState(true);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [filetype, setfiletype] = useState('');

  const handleCloseModal = () => setShowModal(false);
  const handleClosePreviewModal = () => setShowPreviewModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file_data = {
      formData: formData,
      task_fk: row["Task ID"],
    };
    if (formData) {
      try {
        const response = await ("/doc_upload", file_data);
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please upload required documents",
      });
    }
    handleCloseModal();
    handleCloseModal();
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleInputChange = async (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const base64String = await convertFileToBase64(file);
      setFormData({
        ...formData,
        [e.target.name]: {
          fileName: file.name,
          data: base64String,
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxFileSize = 10 * 1024 * 1024;

    if (file) {
      if (file.size > maxFileSize) {
        setErrorMessage("File size exceeds 1MB.");
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Only PDF, JPEG, and PNG files are allowed.");
        return;
      }

      setErrorMessage("");
      handleInputChange(event);
    } else {
      setErrorMessage("No file selected for upload");
    }
  };

  const handlePreview = () => {
    const fileData = formData.file_upload;
    if (fileData) {
      if (fileData.data.startsWith("data:image")){
        setfiletype('image');
        setPreviewFile(fileData.data);
        setShowPreviewModal(true);
      }
      else{
        setfiletype('pdf');
        setPreviewFile(fileData.data.replace(/^data:application\/pdf;base64,/, ''));
        setShowPreviewModal(true);
      }
      
    } else {
      setErrorMessage("No file selected for preview");
    }
  };

  

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
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton style={{color: 'gray', fontWeight: 'bold'}}>
          {row["Assigner Remarks"]}
        </Modal.Header>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Modal.Body>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer>
                <Table size="small" className="custom-table">
                  <TableBody>
                    {Object.entries(row["Action"]).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell style={{color: '#034694', fontWeight: '500'}}>{key}</TableCell>
                        <TableCell style={{color: '#034694', fontWeight: '500'}}>{value}</TableCell>
                      </TableRow>
                    ))}   
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{color: 'gray', fontWeight: '200'}} >Upload File</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Upload File"
                  name="file_upload"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
              <Form.Text muted>
          Supported formats: PDF, JPEG, PNG. Max file size: 1MB.
        </Form.Text>
            </Grid>
            <Grid item xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{color: 'gray', fontWeight: '200'}}>Remarks</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Remarks"
                  name="remarks"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            onClick={handlePreview}
            className="button_css"
            disabled={!formData.file_upload}
          >
            Preview
          </Button>
          <Button
            variant="outline-primary"
            type="submit"
            className="button_css"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        show={showPreviewModal}
        onHide={handleClosePreviewModal}
        dialogClassName="modal-lg"
        centered
        style={{ zIndex: 9999 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <PdftoIMG base64string = {previewFile} file_type = {filetype}/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Assigntask;
