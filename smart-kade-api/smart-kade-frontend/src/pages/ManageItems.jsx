import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../style/ManageItems.css";

const API_URL = "http://localhost:5000/api/items";
const OFFERS_URL = "http://localhost:5000/api/offers";
const BACKEND_URL = "http://localhost:5000";

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [offers, setOffers] = useState([]);

  const [showItemForm, setShowItemForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imgFile: null,
    imgPreview: "",
  });

  const [offerData, setOfferData] = useState({
    text: "",
    price: "",
    imgFile: null,
    imgPreview: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // FETCH ITEMS
  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  // FETCH OFFERS
  const fetchOffers = async () => {
    try {
      const res = await fetch(OFFERS_URL);
      const data = await res.json();
      setOffers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchOffers();
  }, []);

  // HANDLE ITEM CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgFile" && files.length > 0) {
      setFormData({
        ...formData,
        imgFile: files[0],
        imgPreview: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // HANDLE OFFER CHANGE
  const handleOfferChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgFile" && files.length > 0) {
      setOfferData({
        ...offerData,
        imgFile: files[0],
        imgPreview: URL.createObjectURL(files[0]),
      });
    } else {
      setOfferData({ ...offerData, [name]: value });
    }
  };

  // SUBMIT ITEM
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) formPayload.append(key, formData[key]);
    });

    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formPayload,
      });
      const data = await res.json();
      setMessage(data.message || "Item saved successfully!");
      setShowItemForm(false);
      setEditingId(null);
      setFormData({ name: "", price: "", category: "", description: "", imgFile: null, imgPreview: "" });
      fetchItems();
      // Hide message after 3s
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error saving item.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // SUBMIT OFFER
  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.keys(offerData).forEach((key) => {
      if (offerData[key]) formPayload.append(key, offerData[key]);
    });

    const url = editingOfferId ? `${OFFERS_URL}/${editingOfferId}` : OFFERS_URL;
    const method = editingOfferId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formPayload,
      });
      const data = await res.json();
      setMessage(data.message || "Offer saved successfully!");
      setShowOfferForm(false);
      setEditingOfferId(null);
      setOfferData({ text: "", price: "", imgFile: null, imgPreview: "" });
      fetchOffers();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error saving offer.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // EDIT ITEM
  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description,
      imgFile: null,
      imgPreview: item.img ? `${BACKEND_URL}${item.img}` : "",
    });
    setEditingId(item._id);
    setShowItemForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // EDIT OFFER
  const handleOfferEdit = (offer) => {
    setOfferData({
      text: offer.text,
      price: offer.price,
      imgFile: null,
      imgPreview: offer.img ? `${BACKEND_URL}${offer.img}` : "",
    });
    setEditingOfferId(offer._id);
    setShowOfferForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE ITEM
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this item?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setMessage(data.message || "Item deleted!");
      fetchItems();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error deleting item.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // DELETE OFFER
  const handleOfferDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this offer?")) return;
    try {
      const res = await fetch(`${OFFERS_URL}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setMessage(data.message || "Offer deleted!");
      fetchOffers();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error deleting offer.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="manage-items-page">

        {/* HERO SECTION */}
        <div className="admin-hero">
          <h1>Admin Dashboard</h1>
          <p>Manage your menu items and offers efficiently.</p>
          <p>Add, update, or remove items, upload images, and create special promotions.</p>
        </div>

        {/* MESSAGE POPUP */}
        {message && <div className="msg-popup">{message}</div>}

        {/* ACTION BUTTONS */}
        <div className="admin-actions">
          <button className="action-btn" onClick={() => setShowItemForm(!showItemForm)}>
            {showItemForm ? "Close Item Form" : "+ Add New Menu Item"}
          </button>
          <button className="action-btn offer" onClick={() => setShowOfferForm(!showOfferForm)}>
            {showOfferForm ? "Close Offer Form" : "+ Create Offer"}
          </button>
        </div>

        {/* ITEM FORM */}
        {showItemForm && (
          <form className="item-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
            <input type="file" name="imgFile" accept="image/*" onChange={handleChange} />
            {formData.imgPreview && (
              <div className="img-preview-container">
                <img src={formData.imgPreview} alt="Preview" className="preview-img" />
              </div>
            )}
            <button type="submit" className="submit-btn">Save Item</button>
          </form>
        )}

        {/* OFFER FORM */}
        {showOfferForm && (
          <form className="item-form" onSubmit={handleOfferSubmit}>
            <input type="text" name="text" placeholder="Offer Text" value={offerData.text} onChange={handleOfferChange} required />
            <input type="number" name="price" placeholder="Offer Price" value={offerData.price} onChange={handleOfferChange} required />
            <input type="file" name="imgFile" accept="image/*" onChange={handleOfferChange} />
            {offerData.imgPreview && (
              <div className="img-preview-container">
                <img src={offerData.imgPreview} alt="Preview" className="preview-img" />
              </div>
            )}
            <button type="submit" className="submit-btn">Save Offer</button>
          </form>
        )}

        {/* MENU ITEMS LIST */}
        <h2 className="section-title">Menu Items</h2>
        <div className="items-grid">
          {items.map(item => (
            <div key={item._id} className="item-card">
              <img src={item.img ? `${BACKEND_URL}${item.img}` : "/images/default.jpg"} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <p className="price">Rs {item.price}</p>
              <div className="item-actions">
                <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* OFFERS LIST */}
        <h2 className="section-title">Offers</h2>
        <div className="items-grid">
          {offers.map(offer => (
            <div key={offer._id} className="item-card">
              <img src={offer.img ? `${BACKEND_URL}${offer.img}` : "/images/default.jpg"} alt={offer.text} />
              <p>{offer.text}</p>
              <p className="price">Rs {offer.price}</p>
              <div className="item-actions">
                <button className="edit-btn" onClick={() => handleOfferEdit(offer)}>Edit</button>
                <button className="delete-btn" onClick={() => handleOfferDelete(offer._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default ManageItems;
