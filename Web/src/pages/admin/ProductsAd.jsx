import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBox, FaList,FaUber , FaChartBar, FaSignOutAlt, FaBars } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getProducts } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 shadow-sm bg-white position-fixed"
         style={{ top: "0", left: "250px", right: "0", height: "60px", zIndex: "1000", width: "calc(100% - 250px)" }}>
      <FaBars className="text-secondary" size={24} />
      <div className="d-flex align-items-center">
        <img src="./assets/main.png.jpg" className="rounded-circle border" alt="User" height="45px" width="50px"/>
        <div className="text-end ms-2">
          <span className="d-block fw-bold">Moni Roy</span>
          <span className="text-muted">Admin</span>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="d-flex flex-column p-3 bg-white shadow position-fixed" style={{ width: "250px", height: "100vh", top: "0", left: "0" }}>
      <h4 className="text-primary text-center">Seller Page</h4>
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-dark">
            <FaUsers className="me-2" /> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/productsad" className="nav-link text-white fw-bold bg-primary p-2 rounded">
            <FaBox className="me-2" /> Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/orderlist" className="nav-link text-dark">
            <FaList className="me-2" /> Order Lists
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/productstock" className="nav-link text-dark">
            <FaChartBar className="me-2" /> Product Stock
          </Link>
        </li>
        <li className="nav-item">
            <Link to="/customer" className="nav-link text-dark">
                <FaUber className="me-2" /> Customer
            </Link>
        </li>
      </ul>
      <hr />
      <Link to="/" className="nav-link text-danger">
        <FaSignOutAlt className="me-2" /> Logout
      </Link>
    </div>
  );
};

const ProductsAd = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = getProducts();
      const data = (await response).data;
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  const handleEdit = (id_book) => {
    navigate(`/editproducts/?id=${id_book}`);
  };


  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Header />
        <div className="container mt-5 py-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold">Products</h2>
            <Link to="/addproduct" className="btn btn-primary">Add Product</Link>
          </div>
          <div className="row mt-3">
            {loading ? (
              <Skeleton height={300} count={6} />
            ) : (
              products.map((product) => (
                <div key={product.id_book} className="col-md-4 mb-4">
                  <div className="card shadow-sm border-0 p-3 text-center">
                    <img src={product.image_data} id="prodimg" className="card-img-top mx-auto" alt={product.book_name} style={{ height: "200px", objectFit: "contain" }} />
                    <div className="card-body">
                      <h5 className="card-title text-truncate">{product.book_name}</h5>
                      <p className="text-primary fw-bold">${product.price}</p>
                      <div className="d-flex justify-content-center align-items-center">
                        <span className="text-warning me-2">★★★★☆</span>
                        <small className="text-muted">(131)</small> 
                      </div>
                      <button className="btn btn-outline-primary mt-2" onClick={() => handleEdit(product.id_book)} >Edit Product</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsAd;
