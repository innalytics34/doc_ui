import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {
  Modelform1,
  Modelform2,
  Modelform3,
  Modelform4,
  Modelform5,
} from "./taskmodel";
import { postToAPI } from "../apiCall/ApiCall.js";
import Swal from "sweetalert2";

const Test = ({ data, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewFile, setPreviewFile] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);
  const handleClosePreviewModal = () => setShowPreviewModal(false);

  const modelForms = {
    1: Modelform1,
    2: Modelform2,
    3: Modelform3,
    4: Modelform4,
    5: Modelform5,
  };
  const RenderedForm = modelForms[data.tasktype] || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file_data = {
      formData: formData,
      type: data.tasktype,
      task_fk: data.id,
    };
    if (formData) {
      try {
        const response = await postToAPI("/doc_upload", file_data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message,
        });
        if (onRefresh) {
          onRefresh();
        }
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

  const handlePreview = () => {
    const fileData = formData.file_upload;
    if (fileData) {
      setPreviewFile(fileData.data);
      setShowPreviewModal(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No file selected for preview",
      });
    }
  };

  return (
    <div>
      <button
        type="button"
        class="btn btn-outline-primary"
        onClick={handleOpenModal}
      >
        Proceed
      </button>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        style={{ zIndex: 9999 }}
      >
        <Modal.Header closeButton>
          <h5 style={{ color: "gray" }}>
            {data.doctype} | {data.target_date} | {data.assignee}
          </h5>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {RenderedForm && (
              <RenderedForm data={data} handleInputChange={handleInputChange} />
            )}
            <Button variant="outline-primary" onClick={handlePreview}>
              Preview
            </Button>
            <Button variant="outline-primary" type="submit" className="ms-2">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Preview Modal */}
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
          <img
            src={previewFile}
            alt="Preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Test;
