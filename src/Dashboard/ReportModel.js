import React, { useEffect, useState } from "react";
import {Modal } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { getFromAPI } from "../apiCall/ApiCall.js";
import PdftoIMG from '../Dashboard/pdftoimg';

const ReportModel = ({ row }) => {
  const [showModal, setShowModal] = useState(true);
  // const [showPreviewModal, setShowPreviewModal] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [filetype, setFiletype] = useState('');

  const handleCloseModal = () => setShowModal(false);
  // const handleClosePreviewModal = () => setShowPreviewModal(false);

  useEffect(() => {
    async function fetchTaskData() {
      try {
        const data = { "task_fk": row['Task ID'] };
        const response = await getFromAPI("/get_reportfile?data=" + JSON.stringify(data));
        setPreviewFile(response.encoded_string);
        setFiletype(response.type);
        // setShowPreviewModal(true);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    }

    fetchTaskData();
  }, [row]); // Empty dependency array ensures this runs once on mount

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
        <Modal.Header closeButton style={{ color: 'gray', fontWeight: '400', fontSize: 20 }}>
          Assigner Remarks : {row["Assigner Remarks"]}
        </Modal.Header>
        {/* {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} */}
        <Modal.Body>
          <h6 style={{ color: 'gray', fontWeight: '400' }}>Assignee Remarks : {row["Assignee Remarks"]}</h6>
          <h6 style={{ color: 'gray', fontWeight: '400' }}>Checker Remarks : {row["Checker Remarks"]}</h6>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer>
                <Table size="small" className="custom-table">
                  <TableBody>
                    {Object.entries(row["Data"]).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell style={{ color: '#034694', fontWeight: '500' }}>{key}</TableCell>
                        <TableCell style={{ color: '#034694', fontWeight: '500' }}>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={12}>
              <PdftoIMG base64string={previewFile} file_type={filetype} />
            </Grid>
          </Grid>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReportModel;
