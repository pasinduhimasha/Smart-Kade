import { useState, useEffect } from "react";
import "../style/Menu.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { jsPDF } from "jspdf";

const categories = ["All", "Sea Food", "Italian", "Chinese", "Sri Lankan", "Desserts"];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // popup states
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const BACKEND_URL = "http://localhost:5000";

  // ================= FETCH DATA =================

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/items`);
      setMenuItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/offers`);
      setOffers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchMenuItems();
      await fetchOffers();
      setLoading(false);
    };
    load();
  }, []);

  // ================= FILTER =================

const filteredMenu = menuItems.filter(item => {
  const matchesCategory =
    selectedCategory === "All" ||
    item.category.toLowerCase() === selectedCategory.toLowerCase();

  const matchesSearch =
    item.name.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
});


  // ================= POPUP =================

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCustomer({ name: "", phone: "", address: "" });
  };

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // ================= BILL GENERATION =================

  const downloadBill = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Smart Kade - Purchase Bill", 20, 20);

    doc.setFontSize(12);
    doc.text(`Customer Name: ${customer.name}`, 20, 40);
    doc.text(`Phone: ${customer.phone}`, 20, 50);
    doc.text(`Address: ${customer.address}`, 20, 60);

    doc.text("Item Details:", 20, 80);
    doc.text(`Item: ${selectedItem.name || selectedItem.text}`, 20, 90);
    doc.text(`Price: $${selectedItem.price}`, 20, 100);

    doc.text("Thank you for your purchase!", 20, 130);

    doc.save("SmartKade_Bill.pdf");
    closeModal();
  };

  if (loading) return <p>Loading menu...</p>;

  return (
    <>
      <Navbar />

      <div className="menu-page">
        <h1 className="menu-title">Our Menu</h1>

        {/* Categories */}
        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a dish..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* MENU ITEMS */}
        <div className="menu-grid">
          {filteredMenu.length > 0 ? (
            filteredMenu.map(item => (
              <div key={item._id} className="menu-card">
                <img
                  src={item.img ? `${BACKEND_URL}${item.img}` : "/images/default.jpg"}
                  alt={item.name}
                  className="menu-img"
                />

                <div className="card-content">
                  <h3>{item.name}</h3>
                
                  {item.description && <p className="description">{item.description}</p>}
                   <p className="price">RS {item.price}</p>
                  <button className="buy-btn" onClick={() => openModal(item)}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items">No dishes found.</p>
          )}
        </div>

        {/* OFFERS */}
        <h2 className="section-title">Today's Offers</h2>
        <div className="offers-container">
          {offers.length === 0 ? (
            <p className="empty-msg">No offers available.</p>
          ) : (
            offers.map(offer => (
              <div key={offer._id} className="offer-card">
                {offer.img ? (
                  <img
                    src={`${BACKEND_URL}${offer.img}`}
                    alt={offer.text}
                    className="offer-img"
                  />
                ) : (
                  <div className="offer-img-placeholder">No Image</div>
                )}

                <div className="offer-text">{offer.text}</div>
                <div className="offer-price">Rs {offer.price}</div>

                <button className="offer-btn" onClick={() => openModal(offer)}>
                  Get Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    {/* POPUP MODAL */}
{showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Enter Your Details</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={customer.name}
        onChange={handleCustomerChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={customer.phone}
        onChange={handleCustomerChange}
      />

      <textarea
        name="address"
        placeholder="Address"
        value={customer.address}
        onChange={handleCustomerChange}
        required
      />

      <div className="modal-actions">
        <button
          className="buy-btn"
          onClick={() => {
            if (!customer.name || !customer.address) {
              alert("Please fill in Name and Address!");
              return;
            }
            downloadBill();
          }}
        >
          Buy & Download Bill
        </button>

        <button className="close-btn" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Menu;
