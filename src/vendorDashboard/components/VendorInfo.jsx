import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";

const VendorInfo = () => {
  const [vendor, setVendor] = useState();
  const vendorId = localStorage.getItem("vendorId");
  const getVendorHandler = async () => {
    try {
      const response = await fetch(
        `${API_URL}/vendor/single-vendor/${vendorId}`
      );
      const newVendorData = await response.json();
      setVendor(newVendorData.vendor ?? []);
      console.log(newVendorData);
    } catch (error) {
      console.error("failed to fetch vendor data", error);
      alert("failed to fetch vendor data");
    }
  };
  const deleteProductById = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        //setProducts(products.filter((product) => product._id !== productId));
        confirm("are you sure, you want to delete?");
        alert("Product deleted Successfully");
      }
    } catch (error) {
      console.error("Failed to delete product");
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    getVendorHandler();
    console.log("this is useEffect");
  }, []);
  return (
    <div className="vendorInfoSection">
      <div className="vendorDetails">
        <h2>Vendor Details</h2>
        <p>
          <strong>Name:</strong> {vendor?.username}
        </p>
        <p>
          <strong>Email:</strong> {vendor?.email}
        </p>
      </div>

      <div className="firmDetails">
        <h2>Firm Details</h2>
        <img
          src={`${API_URL}/uploads/${vendor?.firm[0]?.image}`}
          alt={vendor?.firm[0]?.firmName}
          style={{ width: "50px", height: "50px" }}
        />
        <p>
          <strong>Firm Name:</strong> {vendor?.firm[0]?.firmName}
        </p>
        <p>
          <strong>Address:</strong> {vendor?.firm[0]?.area}
        </p>
      </div>

      <div className="productDetails">
        <h2>Products</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {vendor?.firm[0]?.products.map((item) => {
              return (
                <>
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>₹{item.price}</td>
                    <td>
                      {item.image && (
                        <img
                          src={`${API_URL}/uploads/${item.image}`}
                          alt={item.productName}
                          style={{ width: "50px", height: "50px" }}
                        />
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteProductById(item._id)}
                        className="deleteBtn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorInfo;
