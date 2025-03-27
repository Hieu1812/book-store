import React, { useEffect, useState, useCallback } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAddress, addOrderAndOrderDetail, postPayment, postOrderStatus } from "../services/apiService";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const storedUser = JSON.parse(sessionStorage.getItem("user"))?.data;
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [paymentWindow, setPaymentWindow] = useState(null);
  const [appTransId, setAppTransId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await getAddress(storedUser.id_account);
      setAddress(response.data);
      setSelectedAddress(response.data[0]);
    };
    fetchAddress();
  }, [storedUser.id_account]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (paymentWindow) {
        paymentWindow.close();
      }
    };
  }, [paymentWindow]);

  const EmptyCart = () => (
    <div className="container text-center py-5">
      <h4 className="display-5">No item in Cart</h4>
      <Link to="/" className="btn btn-outline-dark mx-4">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
    </div>
  );

  const ShowCheckout = () => {
    let originalSubtotal = 0;
    let discountedSubtotal = 0;
    let totalSavings = 0;
    let shipping = 0;
    let totalItems = 0;
    const vatRate = 0.10; // 10% VAT

    state.map((item) => {
      const originalItemTotal = parseInt(item.price * item.qty);
      const discountedItemTotal = parseInt(item.price * item.qty * (1 - item.discount / 100));

      originalSubtotal += originalItemTotal;
      discountedSubtotal += discountedItemTotal;
      totalSavings += (originalItemTotal - discountedItemTotal);
      return totalItems += item.qty;
    });

    // Calculate VAT
    const vatAmount = Math.round(discountedSubtotal * vatRate);
    const finalTotal = discountedSubtotal + shipping + vatAmount;

    const handleSubmit = async (event) => {
      event.preventDefault();

      const order = {
        id_account: storedUser.id_account,
        address_id: selectedAddress.address_id,
        payment_status: 'pending',
        order_status: 'pending',
        order_details: state.map((item) => ({
          id_book: item.id_book,
          qty: item.qty,
          price: item.price,
          discount: item.discount,
        })),
      };

      if (selectedPayment === 'cod') {
        addOrderAndOrderDetail(order).then((response) => {
          if (response.status === 200) {
            sessionStorage.setItem('order', JSON.stringify(response.data));
            navigate('/OrderSuccess', { state: { order: order } });
          } else {
            navigate('/OrderFail');
          }
        });
      } else if (selectedPayment === 'zalopay') {
        const user_name = storedUser.full_name;
        const total_price = finalTotal;
        const items = order.order_details;

        try {
          const response = await postPayment(user_name, total_price, items);
          if (response.status === 200 && response.data.data.return_code === 1) {
            const newWindow = window.open(response.data.data.order_url, '_blank');
            setPaymentWindow(newWindow);
            setAppTransId(response.data.app_trans_id);

            const orderCheckInterval = setInterval(async () => {
              try {
                const statusResponse = await postOrderStatus(response.data.app_trans_id);
                const { return_code } = statusResponse.data;
                console.log('Checking order status:', statusResponse.data);

                switch (return_code) {
                  case 1: // Success
                    clearInterval(orderCheckInterval);
                    const orderResponse = await addOrderAndOrderDetail(order);
                    sessionStorage.setItem('order', JSON.stringify(orderResponse.data));
                    if (newWindow && !newWindow.closed) {
                      newWindow.close();
                    }
                    navigate('/OrderSuccess', { state: { order: order } });
                    break;

                  case 2: // Failed
                    clearInterval(orderCheckInterval);
                    if (newWindow && !newWindow.closed) {
                      newWindow.close();
                    }
                    navigate('/OrderFail');
                    break;

                  case 3: // Processing
                    if (newWindow.closed) {
                      clearInterval(orderCheckInterval);
                      const finalCheck = await postOrderStatus(response.data.app_trans_id);
                      if (finalCheck.data.return_code === 3) {
                        navigate('/OrderFail');
                      }
                    }
                    break;
                }
              } catch (error) {
                console.error('Error checking order status:', error);
                clearInterval(orderCheckInterval);
                navigate('/OrderFail');
              }
            }, 1000);

            // Set timeout for payment window (5 minutes)
            setTimeout(() => {
              clearInterval(orderCheckInterval);
              if (newWindow && !newWindow.closed) {
                newWindow.close();
              }
              navigate('/OrderFail');
            }, 300000);
          } else {
            navigate('/OrderFail');
          }
        } catch (error) {
          console.error('Payment error:', error);
          navigate('/OrderFail');
        }
      }
    };

    return (
      <div className="container py-5">
        <div className="row my-4">

          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Checkout Information</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {address.length > 0 ? (
                    <>
                      <h5 className="mb-3">Select Delivery Address</h5>
                      <div className="address-list mb-4">
                        {address.map((item) => (
                          <div
                            key={item.address_id}
                            className={`card mb-2 border ${selectedAddress === item ? 'border-primary shadow' : 'border-gray'}`}
                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                            onClick={() => setSelectedAddress(item)}
                          >
                            <div className="card-body p-3">
                              <div className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  name="address"
                                  value={item.address_id}
                                  className="me-3"
                                  checked={selectedAddress === item}
                                  onChange={() => setSelectedAddress(item)}
                                  style={{ cursor: 'pointer' }}
                                />
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-start">
                                    <h6 className="mb-1 text-dark fw-bold">{item.full_name}</h6>
                                    <span className="badge bg-light text-muted">{item.phone_number}</span>
                                  </div>
                                  <p className="mb-1 text-muted">
                                    {item.ward}, {item.district}, {item.province}
                                  </p>
                                  <small className="text-secondary">Detailed Address: {item.detailed_address}</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <h5 className="mb-3">Select Payment Method</h5>
                      <div className="list-group mb-4">
                        <label className={`list-group-item list-group-item-action ${selectedPayment === 'cod' ? 'active' : ''}`} style={{ cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="payment"
                            value="cod"
                            className="d-none"
                            checked={selectedPayment === 'cod'}
                            onChange={() => setSelectedPayment('cod')}
                          />
                          Cash on Delivery
                        </label>

                        <label className={`list-group-item list-group-item-action ${selectedPayment === 'zalopay' ? 'active' : ''}`} style={{ cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="payment"
                            value="zalopay"
                            className="d-none"
                            checked={selectedPayment === 'zalopay'}
                            onChange={() => setSelectedPayment('zalopay')}
                          />
                          ZaloPay Payment
                        </label>
                      </div>

                      <button className="w-100 btn btn-primary" type="submit">
                        Place Order
                      </button>
                    </>
                  ) : (
                    <div className="no-address-container">
                      <p>You don't have any saved addresses. Please add an address.</p>
                      <button className="w-100 btn btn-primary" onClick={() => navigate("/AddressBook")}>
                        Go to Add Address
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Subtotal ({totalItems} items)
                    <span>{originalSubtotal.toLocaleString("vi-VN")}<sup>₫</sup></span>
                  </li>

                  {totalSavings > 0 && (
                    <li className="list-group-item d-flex justify-content-between align-items-center text-success px-0">
                      Discount
                      <span>-{totalSavings.toLocaleString("vi-VN")}<sup>₫</sup></span>
                    </li>
                  )}

                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>{shipping.toLocaleString("vi-VN")}<sup>₫</sup></span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    VAT (10%)
                    <span>{vatAmount.toLocaleString("vi-VN")}<sup>₫</sup></span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">

                    <div>
                      <strong>Total</strong>
                    </div>
                    <span>
                      <strong className="text-danger h5">{finalTotal.toLocaleString("vi-VN")}<sup>₫</sup></strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar user={storedUser} />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;