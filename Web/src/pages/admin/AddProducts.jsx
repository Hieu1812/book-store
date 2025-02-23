import React,{useState} from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBox, FaList, FaChartBar, FaSignOutAlt, FaBars, FaUber } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { postAddProduct } from "../../services/apiService";

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
          <Link to="/products_ad" className="nav-link text-white fw-bold bg-primary p-2 rounded">
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

const AddProductForm = () => {
  const navigate = useNavigate();
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [genres, setGenres] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [yearOfPublication, setYearOfPublication] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const upload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!bookId || !bookName || !genres || !author || !publisher || !yearOfPublication || !price || !discount || !stock || !content) {
      setError("Please fill all the fields!");
      setLoading(false);
      return;
    }
    try {
      const res = await postAddProduct(bookId, bookName, genres, author, publisher, yearOfPublication, price, discount, stock, content);
      console.log(res);
      navigate("/productsad");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="fw-bold">Add New Product</h2>
      <div className="bg-light p-4 rounded shadow-sm">
        <form onSubmit={upload}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Book ID</label>
              <input type="text" className="form-control" value={bookId} onChange={(e) => setBookId(e.target.value)} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Book Name</label>
              <input type="text" className="form-control" value={bookName} onChange={(e) => setBookName(e.target.value)}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Genres</label>
              <select className="form-select" value={genres} onChange={(e) => setGenres(e.target.value)}>
                <option>Select Genre</option>
                <option>Novel</option>
                <option>Adventure</option>
                <option>Fiction</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Author</label>
              <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Publisher</label>
              <input type="text" className="form-control" value={publisher} onChange={(e) => setPublisher(e.target.value)}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Year of Publication</label>
              <input type="text" className="form-control" value={yearOfPublication} onChange={(e) => setYearOfPublication(e.target.value)}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Price</label>
              <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Discount %</label>
              <input type="text" className="form-control" value={discount} onChange={(e) => setDiscount(e.target.value)}/>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Stock</label>
              <input type="text" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)}/>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Select Pictures</label>
            <input type="file" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea className="form-control" rows="5" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <Link to="/products_ad"><button type="button" className="btn btn-secondary">Cancel</button></Link>
            <button type="submit" className="btn btn-primary">Add Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddProducts = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Header />
        <AddProductForm />
      </div>
    </div>
  );
};

export default AddProducts;
