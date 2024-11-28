import React, { useEffect, useState } from 'react';
import axios from 'axios';






const handleLogin = async (username, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/login/', {
      username,
      password,
    });
    console.log(response.data.message); // Login successful
  } catch (error) {
    console.error(error.response.data.error); // Handle errors
  }
};

// Example Usage
handleLogin('myusername', 'mypassword');




const csrfToken = getCookie("csrftoken");  // A function to get the CSRF token from cookies
fetch("/api/secure-endpoint/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
    },
    body: JSON.stringify({ data: "example" })
});




export function getCsrfToken() {
    return document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}





const api = axios.create({
    withCredentials: true,  // Important for sending cookies
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken'
});

// Example POST request
const makePostRequest = async (url, data) => {
    const csrfToken = getCsrfToken();
    
    try {
        const response = await api.post(url, data, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
        return response.data;
    } catch (error) {
        console.error('Request failed', error);
    }
};






function submitData(data) {
    const csrfToken = getCookie("csrftoken");  // A utility function to fetch the CSRF token
    fetch("/api/secure-endpoint/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log("Response:", data))
        .catch(error => console.error("Error:", error));
}




function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split("=");
            if (cookie[0] === name) {
                cookieValue = decodeURIComponent(cookie[1]);
                break;
            }
        }
    }
    return cookieValue;
}






const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <strong>{product.name}</strong>: ${product.price}
                            <p>{product.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Products Available.</p>
            )}
        </div>
    );
};

export default ProductList;
