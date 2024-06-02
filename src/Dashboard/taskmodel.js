import React from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Typography from "@mui/material/Typography";

export const Modelform1 = ({ data, handleInputChange }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxFileSize = 1 * 1024 * 1024;

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
      setErrorMessage("Od.");
    }
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicPassword">
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
                    Doc Name:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.doc_name}
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
                    Name:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.name}
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
                    Doc Number:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.DocumentNumber}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Upload File (Max: 1MB)
        </Typography>
        <Form.Control
          type="file"
          accept=".pdf,.jpeg,.png"
          placeholder="Upload File"
          name="file_upload"
          onChange={handleFileChange}
          required
        />
        <Form.Text muted>
          Supported formats: PDF, JPEG, PNG. Max file size: 1MB.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
          type="text"
          placeholder="Remarks"
          name="remarks"
          onChange={handleInputChange}
        />
      </Form.Group>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </>
  );
};

export const Modelform2 = ({ handleInputChange }) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Start Date"
          name="st_dt"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="End Date"
          name="end_dt"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Upload File</Form.Label>
        <Form.Control
          type="file"
          placeholder="Upload File"
          name="file_upload"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
          type="text"
          placeholder="Remarks"
          name="remarks"
          onChange={handleInputChange}
        />
      </Form.Group>
    </>
  );
};

export const Modelform3 = ({ data, handleInputChange }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxFileSize = 1 * 1024 * 1024;

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
      setErrorMessage("Od.");
    }
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicPassword">
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
                    {data.issuer_name}
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
                    {data.doc_no}
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
                    {" "}
                    Validity Date:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.validity_date}
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
                    {" "}
                    Tax:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.tax}
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
                    {" "}
                    Total:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.total}
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
                    {data.basic_value}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Upload File (Max: 1MB)
        </Typography>
        <Form.Control
          type="file"
          accept=".pdf,.jpeg,.png"
          placeholder="Upload File"
          name="file_upload"
          onChange={handleFileChange}
          required
        />
        <Form.Text muted>
          Supported formats: PDF, JPEG, PNG. Max file size: 1MB.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
          type="text"
          placeholder="Remarks"
          name="remarks"
          onChange={handleInputChange}
        />
      </Form.Group>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </>
  );
};

export const Modelform4 = ({ data, handleInputChange }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxFileSize = 1 * 1024 * 1024;

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
      setErrorMessage("Od.");
    }
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicPassword">
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
                    {data.issuer_name}
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
                    {data.customer_name}
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
                    {" "}
                    Receipt Number:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.receipt_no}
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
                    {" "}
                    Invoice Number:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.invoice_no}
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
                    {" "}
                    From Company:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.from_company}
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
                    {data.to_company}
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
                    {data.payment_method}
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
                    Assigner:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.assignee}
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
                    {data.remarks}
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
                    {data.targetdate}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Upload File (Max: 1MB)
        </Typography>
        <Form.Control
          type="file"
          accept=".pdf,.jpeg,.png"
          placeholder="Upload File"
          name="file_upload"
          onChange={handleFileChange}
          required
        />
        <Form.Text muted>
          Supported formats: PDF, JPEG, PNG. Max file size: 1MB.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
          type="text"
          placeholder="Remarks"
          name="remarks"
          onChange={handleInputChange}
        />
      </Form.Group>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </>
  );
};

export const Modelform5 = () => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Aadhar Number</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Upload File</Form.Label>
        <Form.Control type="file" placeholder="Password" />
      </Form.Group>

      <Modal.Footer>
        <Button variant="primary" type="submit">
          Preview
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="secondary">Close</Button>
      </Modal.Footer>
    </>
  );
};
