import React, { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";

const PdftoIMG = ({ base64string, file_type }) => {
  const [images, setImages] = useState([]);
  const [pageRendering, setPageRendering] = useState(false);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  async function renderPdf(base64string) {
    setPageRendering(true);
    const pdfData = atob(base64string);
    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
    const imagesList = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      imagesList.push(canvas.toDataURL("image/png"));
    }

    setImages(imagesList);
    setPageRendering(false);
  }

  useEffect(() => {
    if (file_type === 'pdf') {
      renderPdf(base64string);
    }
  }, [base64string, file_type]);

  return (
    <div className="Pdf">
      <div id="pdf-main-container">
        {file_type === 'pdf' ?
          images.map((image, idx) => (
            <div key={idx} className="pdf-page">
              <img
                src={image}
                alt={`Page ${idx + 1}`}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )) :
          <img
            src={base64string}
            alt="Preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        }
        {pageRendering && <div id="page-loader" style={{textAlign: 'center'}}>
              <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              </div>}
      </div>
    </div>
  );
};

export default PdftoIMG;
