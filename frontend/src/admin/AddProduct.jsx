import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import AdminHeader from "../comp/AdminHeader";
import { Editor } from "@tinymce/tinymce-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";
import Cropper from "react-easy-crop";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import imageCompression from 'browser-image-compression';
import { toast } from "react-toastify";
export default function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const editorKey = import.meta.env.VITE_EDITOR_KEY;
  const editId = location.state?.id || null;

  // Form data state
  const [formData, setFormData] = useState({
    category: "",
    productname: "",
    url: "",
    sku: "",
    mrp: "",
    offerprice: "",
    images: [null, null, null, null], // final cropped files
    metrics: [{ id: 0, value: "" }],
    description1: "",
    description2: "",
    detail: "",
    information: "",
    status: "1",
  });

  // Image objects for crop modal
  const [images, setImages] = useState([
    { file: null, src: null, croppedAreaPixels: null },
    { file: null, src: null, croppedAreaPixels: null },
    { file: null, src: null, croppedAreaPixels: null },
    { file: null, src: null, croppedAreaPixels: null },
  ]);

  const [categories, setCategories] = useState([]);
  const [cropModal, setCropModal] = useState({ show: false, index: null });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const imgRef = useRef(null);
  const refMetric = useRef(null);

  // Fetch categories from API
  useEffect(() => {
    api
      .get("/master")
      .then((res) => {
        if (res.data.success) setCategories(res.data.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Metrics handlers
  const handleMetricChange = (id, e) => {
    const newMetrics = formData.metrics.map((metric) =>
      metric.id === id ? { ...metric, value: e.target.value } : metric
    );
    setFormData({ ...formData, metrics: newMetrics });
  };

  const addMetric = () => {
    setFormData({
      ...formData,
      metrics: [...formData.metrics, { id: formData.metrics.length, value: "" }],
    });
  };

  const removeMetric = (id) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((metric) => metric.id !== id),
    });
  };

  // Handle file selection and open crop modal
  const handleFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1, // Max size in MB
        minWidthOrHeight: 800,
        maxWidthOrHeight: 800, // Resize to max 800px
        useWebWorker: true, // Offload to web worker for better performance
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const src = URL.createObjectURL(compressedFile);
        console.log("Compressed image src:", src);
        const newImages = [...images];
        newImages[index] = { file: compressedFile, src, croppedAreaPixels: null };
        setImages(newImages);
        setCropModal({ show: true, index });
      } catch (error) {
        console.error("Compression error:", error);
      }
    }
  };

  // Generate cropped image
  const handleCropConfirm = async () => {
    if (croppedAreaPixels && cropModal.index !== null) {
      const image = new Image();
      image.src = images[cropModal.index].src;
      const canvas = document.createElement("canvas");
      canvas.width = 500; // Fixed width
      canvas.height = 500; // Fixed height
      const ctx = canvas.getContext("2d");

      image.onload = () => {
        // Calculate the scale based on the original image size
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        // Draw the cropped and resized portion
        ctx.drawImage(
          image,
          croppedAreaPixels.x * scaleX,
          croppedAreaPixels.y * scaleY,
          croppedAreaPixels.width * scaleX,
          croppedAreaPixels.height * scaleY,
          0,
          0,
          500,
          500
        );

        canvas.toBlob((blob) => {
          const newImages = [...images];
          newImages[cropModal.index].croppedAreaPixels = croppedAreaPixels;
          newImages[cropModal.index].file = blob;

          const newFormImages = [...formData.images];
          newFormImages[cropModal.index] = blob;

          setImages(newImages);
          setFormData({ ...formData, images: newFormImages });
          setCropModal({ show: false, index: null });
        }, "image/jpeg", 0.8); // Quality set to 80%
      };
    }
  };

  // TinyMCE change
  const handleEditorChange = (field, content) => {
    setFormData((prev) => ({ ...prev, [field]: content }));
  };

  const editorConfig = {
    toolbar_mode: "sliding",
    menubar: false,
    height: 200,
    plugins: [
      "advlist", "autolink", "lists", "link", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "insertdatetime", "wordcount",
    ],
    toolbar:
      "undo redo | blocks fontfamily fontsize | " +
      "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | link image media table | " +
      "charmap | removeformat ",
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "metrics") {
        // Convert metrics array to JSON string
        form.append("metrics", JSON.stringify(value.map(m => m.value)));
      } else if (key === "images") {
        value.forEach((file, idx) => file && form.append("images", file));
      } else {
        form.append(key, value);
      }
    });

    if (editId) form.append("id", editId);

    try {
      if (!editId) {
        const res = await api.post("/products", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(res.data.message || "Product created successfully!");
        navigate("/admin/listproduct", { state: { message: res.data.message } });
      } else {
        const res = await api.patch(`/products/${editId}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(res.data.message || "Product updated successfully!");
        navigate("/admin/listproduct", { state: { message: res.data.message } });
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error submitting form");
    }
  };


  return (
    <>
      <AdminHeader page="Add Product" />
      <form className="card border-top border-0 border-4 border-primary" onSubmit={handleSubmit}>
        <div className="card-body p-4">
          <h5 className="mb-0 text-uppercase">{editId ? "Edit Product" : "Add Product"}</h5>
          <hr />
          <div className="row g-3">
            {/* Category */}
            <div className="col-4">
              <label className="form-label">Select Category</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>

            {/* Product info */}
            {[
              { name: "productname", label: "Product Name" },
              { name: "url", label: "URL" },
              { name: "sku", label: "SKU" },
              { name: "mrp", label: "MRP" },
              { name: "offerprice", label: "Offer Price" },
            ].map((field, idx) => (
              <div className="col-md-4" key={idx}>
                <label className="form-label">{field.label}</label>
                <input
                  type="text"
                  className="form-control"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}

            {/* Metrics */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Metrics</label>
              {formData.metrics.map((metric) => (
                <div className="d-flex align-items-center gap-2 mb-2" key={metric.id} ref={metric.id === 0 ? refMetric : null}>
                  <input type="text" className="form-control" value={metric.value} onChange={(e) => handleMetricChange(metric.id, e)} required />
                  {metric.id === 0 ? (
                    <div className="btn-add" role="button" onClick={addMetric}>
                      <FontAwesomeIcon icon={faAdd} />
                    </div>
                  ) : (
                    <div className="btn-remove" role="button" onClick={() => removeMetric(metric.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Images */}
            {images.map((img, idx) => (
              <div className="col-md-4" key={idx}>
                <label className="form-label">Image {idx + 1}</label>
                <input type="file" className="form-control" accept="image/*" onChange={(e) => handleFileChange(idx, e)} />
                {img.croppedAreaPixels && img.file && (
                  <img
                    src={URL.createObjectURL(img.file)}
                    alt={`Cropped Image ${idx + 1}`}
                    style={{ width: "60px", height: "60px", objectFit: "cover", marginTop: "10px" }}
                  />
                )}
              </div>
            ))}

            {/* TinyMCE editors */}
            {[
              { name: "description1", label: "Description 1" },
              { name: "description2", label: "Description 2" },
              { name: "detail", label: "Product Details" },
              { name: "information", label: "Additional Information" },
            ].map((field, idx) => (
              <div className="col-md-12" key={idx}>
                <label className="form-label">{field.label}</label>
                <Editor
                  apiKey={editorKey}
                  init={editorConfig}
                  value={formData[field.name]}
                  onEditorChange={(c) => handleEditorChange(field.name, c)}
                />
              </div>
            ))}

            {/* Status */}
            <div className="col-6">
              <label className="form-label">Status</label>
              <div>
                {["1", "0"].map((val) => (
                  <div className="form-check form-check-inline" key={val}>
                    <input type="radio" className="form-check-input" name="status" value={val} onChange={handleInputChange} checked={formData.status === val} />
                    <label className="form-check-label">{val === "1" ? "Active" : "Inactive"}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </form>

      {/* Crop Modal */}
      <Modal show={cropModal.show} onHide={() => setCropModal({ show: false, index: null })} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "498px", position: "relative" }}>
          {cropModal.index !== null && images[cropModal.index].src && (
            <Cropper
              image={images[cropModal.index].src}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
              style={{ containerStyle: { maxHeight: "498px", maxWidth: "498px", minHeight: "498px", minWidth: "498px" } }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCropModal({ show: false, index: null })}>Cancel</Button>
          <Button variant="primary" onClick={handleCropConfirm}>Crop</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}