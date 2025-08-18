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

const BASE_URL = import.meta.env.VITE_IMG;
export default function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const editorKey = import.meta.env.VITE_EDITOR_KEY;
  const editId = location.state?.id || null;

  // Final form data for server
  const [formData, setFormData] = useState({
    category: "",
    deal: "",
    productname: "",
    url: "",
    sku: "",
    images: [null, null, null, null], // blobs for server
    price: [{ id: 0, mrp: "", offerprice: "", stock: "", metric: "" }],
    description1: "",
    description2: "",
    detail: "",
    information: "",
    status: "1",
    isdeal: "0",
  });

  // For crop/preview/modal
  const [images, setImages] = useState([
    { file: null, src: null, croppedAreaPixels: null },
    { file: null, src: null, croppedAreaPixels: null },
    { file: null, src: null, croppedAreaPixels: null },
    { file: null, src: null, croppedAreaPixels: null },
  ]);
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [cropModal, setCropModal] = useState({ show: false, index: null });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const refMetric = useRef(null);

  // Fetch product data for edit
  useEffect(() => {
    if (editId) {
      const fetchProduct = async () => {
        try {
          const res = await api.get(`/products/${editId}`);
          const raw = res.data?.data || res.data;
          const normalizedPrice = (raw.price || []).map((p, idx) => ({
            id: idx,
            mrp: p.mrp || "",
            offerprice: p.offerprice || "",
            stock: p.stock || "",
            metric: p.metric || ""
          }));

          // Give both formData and preview/crop images the correct image values
          const normalizedImages = [null, null, null, null];
          (raw.images || []).forEach((img, idx) => {
            if (idx < 4) normalizedImages[idx] = img || null;
          });

          setFormData({
            category: raw.category || "",
            deal: raw.deal || "",
            productname: raw.productname || "",
            url: raw.url || "",
            sku: raw.sku || "",
            images: normalizedImages,
            price: normalizedPrice.length > 0 ? normalizedPrice
              : [{ id: 0, mrp: "", offerprice: "", stock: "", metric: "" }],
            description1: raw.description1 || "",
            description2: raw.description2 || "",
            detail: raw.detail || "",
            information: raw.information || "",
            status: raw.status?.toString() || "1",
            isdeal: raw.isdeal?.toString() || "0",
          });

          let updatedImages = [null, null, null, null];
          normalizedImages.forEach((img, idx) => {
            if (img) {
              updatedImages[idx] = {
                file: null,
                src: typeof img === "string"
                  ? (img.startsWith("http") ? img : BASE_URL + img)
                  : null,
                croppedAreaPixels: null,
              };
            } else {
              updatedImages[idx] = { file: null, src: null, croppedAreaPixels: null };
            }
          });
          setImages(updatedImages);
        } catch (err) {
          console.error("Failed to fetch product:", err);
          toast.error(err?.response?.data?.message || "Error fetching product");
        }
      };
      fetchProduct();
    } else {
      setFormData({
        category: "",
        deal: "",
        productname: "",
        url: "",
        sku: "",
        images: [null, null, null, null],
        price: [{ id: 0, mrp: "", offerprice: "", stock: "", metric: "" }],
        description1: "",
        description2: "",
        detail: "",
        information: "",
        status: "1",
        isdeal: "0",
      });
      setImages([
        { file: null, src: null, croppedAreaPixels: null },
        { file: null, src: null, croppedAreaPixels: null },
        { file: null, src: null, croppedAreaPixels: null },
        { file: null, src: null, croppedAreaPixels: null },
      ]);
    }
  }, [editId]);

  useEffect(() => {
    api.get("/master")
      .then(res => {
        if (res.data.success) setCategories(res.data.data || []);
      })
      .catch(err => console.error(err));
      api.get("/dealmaster")
      .then(res => {
        if (res.data.success) setDeals(res.data.data || []);
      })
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMetricChange = (input, id, e) => {
    const newMetrics = formData.price.map(price =>
      price.id === id ? { ...price, [input]: e.target.value } : price
    );
    setFormData({ ...formData, price: newMetrics });
  };

  const addMetric = () => {
    setFormData({
      ...formData,
      price: [...formData.price, { id: formData.price.length, mrp: "", offerprice: "", stock: "", metric: "" }],
    });
  };

  const removeMetric = (id) => {
    setFormData({
      ...formData,
      price: formData.price.filter(price => price.id !== id),
    });
  };

  // Replace/remove previous image on new selection, open modal for crop
  const handleFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      // Release any previous blob URL at this index
      if (images[index] && images[index].src && images[index].src.startsWith("blob:")) {
        URL.revokeObjectURL(images[index].src);
      }
      const options = {
        maxSizeMB: 1,
        minWidthOrHeight: 800,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const src = URL.createObjectURL(compressedFile);
        // Update preview/crop images
        const newImages = [...images];
        newImages[index] = { file: compressedFile, src, croppedAreaPixels: null };
        setImages(newImages);
        // Remove any previous file from formData.images
        const newFormImages = [...formData.images];
        newFormImages[index] = null;
        setFormData({ ...formData, images: newFormImages });
        setCropModal({ show: true, index });
      } catch (error) {
        console.error("Compression error:", error);
      }
    }
  };

  // Cropping: Save only new file in formData, update preview, release previous blob URL if needed
  const handleCropConfirm = async () => {
    if (croppedAreaPixels && cropModal.index !== null) {
      const image = new window.Image();
      image.src = images[cropModal.index].src;
      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");
      image.onload = () => {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
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
          // Release previous blob at this index
          if (images[cropModal.index] && images[cropModal.index].src && images[cropModal.index].src.startsWith("blob:")) {
            URL.revokeObjectURL(images[cropModal.index].src);
          }
          const newImages = [...images];
          newImages[cropModal.index] = {
            ...newImages[cropModal.index],
            croppedAreaPixels,
            file: blob,
            src: URL.createObjectURL(blob),
          };
          setImages(newImages);
          // For API: remove previous, set only cropped blob
          const newFormImages = [...formData.images];
          newFormImages[cropModal.index] = blob;
          setFormData({ ...formData, images: newFormImages });
          setCropModal({ show: false, index: null });
        }, "image/jpeg", 0.8);
      };
    }
  };

  const handleEditorChange = (field, content) => {
    setFormData(prev => ({ ...prev, [field]: content }));
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

  // Submit form: only most recent images included
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "price") {
        form.append("price", JSON.stringify(value));
      } else if (key === "images") {
        value.forEach(file => file && form.append("images", file));
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

             <div className="col-4">
              <label className="form-label">Select Deals</label>
              <select
                className="form-select"
                name="deal"
                value={formData.deal}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a Deal</option>
                {deals.map((de, index) => (
                  <option key={index} value={de.deals}>
                    {de.deals}
                  </option>
                ))}
              </select>
            </div>

            {/* Product info */}
            {[
              { name: "productname", label: "Product Name" },
              { name: "url", label: "URL" },
              { name: "sku", label: "SKU" },
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

            {/* Images */}
            {images.map((img, idx) => (
              <div className="col-md-4" key={idx}>
                <label className="form-label">Image {idx + 1}</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleFileChange(idx, e)}
                />
                {/* Cropped/new preview */}
                {img.croppedAreaPixels && img.file && (
                  <img
                    src={img.src ? img.src : URL.createObjectURL(img.file)}
                    alt={`Cropped Image ${idx + 1}`}
                    style={{ width: "60px", height: "60px", objectFit: "cover", marginTop: "10px" }}
                  />
                )}
                {/* Existing API image */}
                {!img.croppedAreaPixels && img.src && (
                  <img
                    src={img.src}
                    alt={`Image ${idx + 1}`}
                    style={{ width: "60px", height: "60px", objectFit: "cover", marginTop: "10px" }}
                  />
                )}
              </div>
            ))}

            {/* PRICE */}
            <div className="col-md-12 mb-3">
              <div className="d-flex gap-2">
                <div className="col-2"><label className="form-label">MRP</label></div>
                <div className="col-2"><label className="form-label">Offer Price</label></div>
                <div className="col-2"><label className="form-label">Stock</label></div>
                <div className="col-2"><label className="form-label">Metrics</label></div>
              </div>
              {formData.price.map((price) => (
                <div className="d-flex gap-2" key={price.id} ref={price.id === 0 ? refMetric : null}>
                  <div className="col-md-2 mb-2">
                    <input type="text" className="form-control" value={price.mrp} onChange={(e) => handleMetricChange("mrp", price.id, e)} required />
                  </div>
                  <div className="col-md-2 mb-2">
                    <input type="text" className="form-control" value={price.offerprice} onChange={(e) => handleMetricChange("offerprice", price.id, e)} required />
                  </div>
                  <div className="col-md-2 mb-2">
                    <input type="text" className="form-control" value={price.stock} onChange={(e) => handleMetricChange("stock", price.id, e)} required />
                  </div>
                  <div className="col-md-2 d-flex align-items-center gap-2 mb-2">
                    <input type="text" className="form-control" value={price.metric} onChange={(e) => handleMetricChange("metric", price.id, e)} required />
                    {price.id === 0 ? (
                      <div className="btn-add" role="button" onClick={addMetric}>
                        <FontAwesomeIcon icon={faAdd} />
                      </div>
                    ) : (
                      <div className="btn-remove" role="button" onClick={() => removeMetric(price.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

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

            {/* isdeal */}
            <div className="col-3">
              <label className="form-label">Is Deal</label>
              <div>
                {["1", "0"].map((val) => (
                  <div className="form-check form-check-inline" key={val}>
                    <input type="radio" className="form-check-input" id={`isdeal`+val} name="isdeal" value={val} onChange={handleInputChange} checked={formData.isdeal === val} />
                    <label className="form-check-label" htmlFor={`isdeal`+val}>{val === "1" ? "Yes" : "No"}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="col-6">
              <label className="form-label">Status</label>
              <div>
                {["1", "0"].map((val) => (
                  <div className="form-check form-check-inline" key={val}>
                    <input type="radio" className="form-check-input" id={`status`+val} name="status" value={val} onChange={handleInputChange} checked={formData.status === val} />
                    <label className="form-check-label" htmlFor={`status`+val}>{val === "1" ? "Active" : "Inactive"}</label>
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
              onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
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
