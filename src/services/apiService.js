import axios from 'axios';

const postLogin = (email, password) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/login', { email, password });
};

const getAccounts = () => {
    return axios.get('https://bookstorenhom11.azurewebsites.net/accounts/accounts');
}

const postPayment = (user_name, total_price, items) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/payment', { user_name, total_price, items });
};

const postOrderStatus = (app_trans_id) => {
    return axios.post(`https://bookstorenhom11.azurewebsites.net/order-status/${app_trans_id}`, { app_trans_id });
};

const postRegister = (full_name, email, password, mobile, gender, birthday) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/accounts/register', { full_name, email, password, mobile, gender, birthday });
};
const changePass = (id_account, oldPass, newPass) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/accounts/changepass', id_account, oldPass, newPass)
}
const getImage = (idImage) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/image/${idImage}`);
};
const getGenre = () => {
    return axios.get('https://bookstorenhom11.azurewebsites.net/accounts/genre')
}
const postAddProduct = (formData) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/products/addproduct', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
// co anh
const postEditProduct = (formData) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/products/editproduct', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const getProductbyGenre = (id_genre) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/products/getproductbygenre?id_genre=${id_genre}`);
};


const getProducts = () => {
    return axios.get('https://bookstorenhom11.azurewebsites.net/products/getproducts');
};
const getProductsIfExist = () => {
    return axios.get('https://bookstorenhom11.azurewebsites.net/products/getProductsIfExist');
};

const getCountUser = () => {
    return axios.get('https://bookstorenhom11.azurewebsites.net/accounts/getCountUser');
};
const getTotalOrders = () => {
    return axios.get('https://bookstorenhom11.azurewebsites.net/order/getTotalOrders');
}
const getTotalSales = () => {
    return axios.get('https://bookstorenhom11.azurewebsites.net/order/getTotalSales');
}

const getPendingOrders = () => {
    return axios.get('https://bookstorenhom11.azurewebsites.net/order/getPendingOrders');
}

const getRecentTransactions = () =>{
    return axios.get('https://bookstorenhom11.azurewebsites.net/order/getRecentTransactions');
}


const getProductbyID = (id_book) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/products/getproductbyid/?id_book=${id_book}`);
}

const findProduct = (book_name) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/products/getproductbyname/?book_name=${book_name}`);
}

const getInfor = (id_account) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/accounts/infor/?id_account=${id_account}`);
}

const editInfor = (formData) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/accounts/editinfor', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
const getAccountbyName = (full_name) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/accounts/getusername/?full_name=${full_name}`);
}
const postAddress = (formData) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/address/addaddress', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
const editAddress = (formData) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/address/editaddress', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
const addOrderAndOrderDetail = (formData) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/order/addOrderAndOrderDetail', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
const getAddress = (id_account) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/address/getaddress/?id_account=${id_account}`);
}
const deleteProductbyID = (id_book) => {
    return axios.post(`https://bookstorenhom11.azurewebsites.net/products/deleteproduct/?id_book=${id_book}`)
}

const deleteAddress = (address_id) => {
    return axios.delete(`https://bookstorenhom11.azurewebsites.net/address/deleteaddress/?address_id=${address_id}`);
}

const addreview = (id_order, rating, review_text, created_at, id_book) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/review/addreview', { id_order, rating, review_text, created_at, id_book });
}
const deleteReview = (id) => {
    return axios.delete(`https://bookstorenhom11.azurewebsites.net/review/deleteReview/?id=${id}`);
}
const getBookReviewbyorderID = (id_order) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/review/getBookReviewbyorderID/?id_order=${id_order}`);
}

const sendmail = (emailadd, subject, htmlcontent) => {
    return axios.post(`https://bookstorenhom11.azurewebsites.net/sendmail`, { emailadd, subject, htmlcontent });
}
const getOrders = () => {
    return axios.get('https://bookstorenhom11.azurewebsites.net/order/getOrders');
}
const getOrderByID = (id_order) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/order/getOrderByID/${id_order}`);
}
const getOrderByAccountID = (id_account) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/order/getOrderByAccountID/${id_account}`);
}
const updateOrderStatus = async (id_order, status) => {
    try {
        const response = await axios.post(`https://bookstorenhom11.azurewebsites.net/order/${id_order}/status`, {
            order_status: status.order_status,
            payment_status: status.payment_status,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error.response?.data || error.message);
        throw error;
    }
};

const addReview = (formData) => {
    return axios.post('https://bookstorenhom11.azurewebsites.net/review/addReview', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const getBookReviewbyID = (id_book) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/review/getBookReviewbyID/${id_book}`);
};
const getBookAllReviewCount = (id_book) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/review/getBookAllReviewCount/${id_book}`);
};
const getBookReviewbyIdBookAndIdOrder = (id_book, id_order) => {
    return axios.get(`https://bookstorenhom11.azurewebsites.net/review/getBookReviewbyIdBookAndIdOrder/${id_book}/${id_order}`);
};

export {
    postLogin, getImage, postRegister, postAddProduct, postEditProduct,
    getProducts, getProductbyID, getGenre, getInfor, deleteProductbyID,
    getProductbyGenre, postAddress, getAddress, editAddress, deleteAddress,
    editInfor, addOrderAndOrderDetail, addreview, deleteReview, getBookReviewbyID,
    getBookReviewbyorderID, findProduct, changePass, getOrders, updateOrderStatus,
    getOrderByID, getOrderByAccountID, sendmail, getAccounts, getAccountbyName,
    postPayment, postOrderStatus, getProductsIfExist, getCountUser, getTotalOrders,
    getTotalSales, getPendingOrders, getRecentTransactions, addReview, getBookAllReviewCount, getBookReviewbyIdBookAndIdOrder
};
