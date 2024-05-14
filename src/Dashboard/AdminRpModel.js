import React, { useEffect, useState } from "react";
import {Modal} from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import {getFromAPI } from "../apiCall/ApiCall.js";
import PdftoIMG from '../Dashboard/pdftoimg'

const AdminRpModel = ({ row, onRefresh }) => {
  const [showModal, setShowModal] = useState(true);
  const [previewFile, setPreviewFile] = useState(null);
  const handleCloseModal = () => setShowModal(false);
  const [filetype, setfiletype] = useState(0);
  

  useEffect(()=>{
    async function fetchTaskData() {
        try {
            const data = {"task_fk": row['Task ID']}
            const response = await getFromAPI("/get_reportfile?data=" + JSON.stringify(data));
            setPreviewFile(response.encoded_string);
            setfiletype(response.type)
        } catch (error) {
          console.error("Error fetching task data:", error);
        } finally {
        }
      }
      fetchTaskData();
    }, []);

  
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
        <Modal.Body>
        <h6 style={{color: 'gray', fontWeight: '400'}}>Assignee Remarks : {row["Assignee Remarks"]}</h6>
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
              {row['Status'] !== 'Assigned to Assignee' ? (<PdftoIMG base64string = {previewFile} file_type = {filetype}/>):
              <div style={{textAlign:'center'}}>Document not yet uploaded</div>}
            </Grid>
          </Grid>
        </Modal.Body>
      </Modal>

      
    </div>
  );
};

export default AdminRpModel;