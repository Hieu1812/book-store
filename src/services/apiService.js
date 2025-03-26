import axios from 'axios';

const postLogin = (email, password) => {
    return axios.post('https://book-server-sable.vercel.app/login', { email, password });
};

const postPayment = (user_name, total_price, items) => {
    return axios.post('https://book-server-sable.vercel.app/payment', { user_name, total_price, items });
};

const postOrderStatus = (app_trans_id) => {
    return axios.post(`https://book-server-sable.vercel.app/order-status/${app_trans_id}`, { app_trans_id });
};

const postRegister = (full_name, email, password, mobile, gender, birthday) => {
    return axios.post('https://book-server-sable.vercel.app/accounts/register', { full_name, email, password, mobile, gender, birthday });
};
const changePass = (id_account, oldPass, newPass) => {
    return axios.post('https://book-server-sable.vercel.app/accounts/changepass', id_account, oldPass, newPass)
}
const getImage = (idImage) => {
    return axios.get(`https://book-server-sable.vercel.app/image/${idImage}`);
};
const getGenre = () => {
    return axios.get('https://book-server-sable.vercel.app/accounts/genre')
}
const postAddProduct = (formData) => {
    return axios.post('https://book-server-sable.vercel.app/products/addproduct', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
// co anh
const postEditProduct = (formData) => {
    return axios.post('https://book-server-sable.vercel.app/products/editproduct', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const getProductbyGenre = (id_genre) => {
    return axios.get(`https://book-server-sable.vercel.app/products/getproductbygenre?id_genre=${id_genre}`);
};


const getProducts = () => {
    return axios.get('https://book-server-sable.vercel.app/products/getproducts');
};

const getProductbyID = (id_book) => {
    return axios.get(`https://book-server-sable.vercel.app/products/getproductbyid/?id_book=${id_book}`);
}

const findProduct = (book_name) => {
    return axios.get(`https://book-server-sable.vercel.app/products/getproductbyname/?book_name=${book_name}`);
}

const getInfor = (id_account) => {
    return axios.get(`https://book-server-sable.vercel.app/accounts/infor/?id_account=${id_account}`);
}

const editInfor = (formData) => {
    return axios.post('https://book-server-sable.vercel.app/accounts/editinfor', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
const postAddress = (formData) => {
    return axios.post('https://book-server-sable.vercel.app/address/addaddress', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
const editAddress = (formData) => {
    return axios.post('https://book-server-sable.vercel.app/address/editaddress', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
const addOrderAndOrderDetail = (formData) => {
    return axios.post('https://book-server-sable.vercel.app/order/addOrderAndOrderDetail', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
const getAddress = (id_account) => {
    return axios.get(`https://book-server-sable.vercel.app/address/getaddress/?id_account=${id_account}`);
}
const deleteProductbyID = (id_book) => {
    return axios.delete(`https://book-server-sable.vercel.app/products/deleteproduct/?id_book=${id_book}`)
}

const deleteAddress = (address_id) => {
    return axios.delete(`https://book-server-sable.vercel.app/address/deleteaddress/?address_id=${address_id}`);
}

const addreview = (id_order, rating, review_text, created_at, id_book) => {
    return axios.post('https://book-server-sable.vercel.app/review/addreview', { id_order, rating, review_text, created_at, id_book });
}
const deleteReview = (id) => {
    return axios.delete(`https://book-server-sable.vercel.app/review/deleteReview/?id=${id}`);
}
const getBookReviewbyID = (id_book) => {
    return axios.get(`https://book-server-sable.vercel.app/review/getBookReviewbyID/?id_book=${id_book}`);
}
const getBookReviewbyorderID = (id_order) => {
    return axios.get(`https://book-server-sable.vercel.app/review/getBookReviewbyorderID/?id_order=${id_order}`);
}

const sendmail = (emailadd, subject, htmlcontent) => {
    return axios.post(`https://book-server-sable.vercel.app/sendmail`, { emailadd, subject, htmlcontent });
}
const getOrders = () => {
    return axios.get('https://book-server-sable.vercel.app/order/getOrders');
}
const getOrderByID = (id_order) => {
    return axios.get(`https://book-server-sable.vercel.app/order/getOrderByID/${id_order}`);
}
const getOrderByAccountID = (id_account) => {
    return axios.get(`https://book-server-sable.vercel.app/order/getOrderByAccountID/${id_account}`);
}
const updateOrderStatus = async (id_order, status) => {
    try {
        const response = await axios.post(`https://book-server-sable.vercel.app/order/${id_order}/status`, {
            order_status: status.order_status,
            payment_status: status.payment_status,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error.response?.data || error.message);
        throw error;
    }
};
export {
    postLogin, getImage, postRegister, postAddProduct, postEditProduct,
    getProducts, getProductbyID, getGenre, getInfor, deleteProductbyID,
    getProductbyGenre, postAddress, getAddress, editAddress, deleteAddress,
    editInfor, addOrderAndOrderDetail, addreview, deleteReview, getBookReviewbyID, sendmail,
    getBookReviewbyorderID, findProduct, changePass, getOrders, updateOrderStatus, getOrderByID, getOrderByAccountID,
    postPayment, postOrderStatus
};
