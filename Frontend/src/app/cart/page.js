"use client";
import "./cart.css";
import "../styles/responsivefooter.css";
import "../styles/responsivenav.css";
import React, { useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap, Power3, Circ, Expo } from 'gsap';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export default function Cart() {
    const [userId, setUserId] = useState(null); // Set this to your logged-in user ID 
    const [cartItems, setCartItems] = useState([]); // Contains productId and quantity
    const [productsDetails, setProductsDetails] = useState([]); // Contains fetched product details
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [totalBill, setTotalBill] = useState(null);

    useGSAP(() => {
        let menu = document.querySelector("#nav i");
        let close = document.querySelector("#full i");

        let first = gsap.timeline();

        first.to("#full", {
            right: 0,
            duration: 0.5
        });

        first.from("#full h4", {
            x: 150,
            duration: 0.6,
            stagger: 0.2,
            opacity: 0
        });

        first.from("#full i", {
            opacity: 0
        });

        first.pause();

        menu.addEventListener("click", function () {
            first.play();
        });

        close.addEventListener("click", function () {
            first.reverse();
        });
    });

    // Fetch user data, cart items, and product details
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch userId
                const response1 = await fetch(`https://mavy-pxtx.onrender.com/user/userId`, {
                    method: 'GET',
                    credentials: 'include', // Ensures cookies are sent with the request
                });
                
                if (!response1.ok) {
                    throw new Error('Error fetching user data');
                }
                
                const data1 = await response1.json();
                setUserId(data1.userId);

                // Fetch cart items
                const response2 = await fetch(`https://mavy-pxtx.onrender.com/user/cart`, {
                    method: 'GET',
                    credentials: 'include', // Ensures cookies are sent with the request
                });
                
                if (!response2.ok) {
                    throw new Error('Error fetching cart data');
                }
                
                const cartData = await response2.json();
                setCartItems(cartData); // Store cart items
                
                // Fetch product details for each productId
                const fetchedProductDetails = await Promise.all(
                    cartData.map(async (item) => {
                        const productResponse = await fetch(`https://mavy-pxtx.onrender.com/user/products?pid=${item.productId}`, {
                            method: 'GET',
                            credentials: 'include'
                        });
                        
                        if (!productResponse.ok) {
                            throw new Error(`Error fetching product data for ID ${item.productId}`);
                        }
                        
                        const productDetails = await productResponse.json();
                        return {
                            productDetails,
                            quantity: item.quantity
                        };
                    })
                );

                setProductsDetails(fetchedProductDetails);
                console.log("Fetched product details: ", fetchedProductDetails);

                // Calculate total bill
                let total = 0;
                fetchedProductDetails.forEach(element => {
                    total += element.quantity * element.productDetails.price;
                });
                setTotalBill(total);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);

    // Handle checkout
    const handleCheckout = async () => {
        try {
            const response = await fetch('https://mavy-pxtx.onrender.com/user/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies
                body: JSON.stringify({
                    userId,
                    cartItems,
                    totalBill
                })
            });

            const result = await response.json();
            if (result.url) {
                // Redirect to Stripe Checkout page
                window.location.href = result.url;
            } else {
                console.error("Error creating Stripe Checkout session");
            }
            if (response.ok) {
              
                // Call cartDelete API to clear the cart after successful order placement
                    const deleteResponse = await fetch(`https://mavy-pxtx.onrender.com/user/cartDelete/${userId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include', // Include cookies
                    });

                    if (deleteResponse.ok) {
                        console.log("Cart items cleared successfully.");
                        setCartItems([]); // Clear cart items in the frontend
                    } else {
                        console.error("Error clearing the cart:", await deleteResponse.json());
                    }
                } else {
                    alert(result.message || "Error during checkout...");
                }


        } catch (error) {
            console.error('Error during checkout:::', error);
            alert("Error occurred while placing the order.");
        }
    };

    return (
        <div>
            <header>
                <div className="navbar">
                    <div id="nav">
                        <img src="img/qt=q_95.jpeg" alt="" />
                        <i><RiMenu3Fill /></i>
                    </div>
                    <div id="full">
                        <a href="/"><h4>Home</h4></a>
                        <a href="./about"><h4>About</h4></a>
                        <a href="./product"><h4>Products</h4></a>
                        <a href="#"><h4>Cart</h4></a>
                        <a href="./login"><h4>Profile</h4></a>
                        <i><IoMdClose /></i>
                    </div>
                </div>
            </header>

            <div className="cart-container">
                <div className="cart-heading">
                    <h1>My Cart</h1>
                </div>
                <div className="cart-item">
                    <div className="cart-left">
                        {isLoading ? (
                            <p>Loading your cart...</p> // Show loading indicator while data is being fetched
                        ) : (
                            productsDetails.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                productsDetails.map((item, index) => (
                                    <div className="item" key={index}>
                                        <div className="item-img">
                                            <img src={item.productDetails.imageUrl ? `img/${item.productDetails.imageUrl}` : 'img/abena.jpeg'}
                                                 alt={item.productDetails.imageUrl || 'Fallback image'} />
                                        </div>
                                        <div className="item-info">
                                            <h3>{item.productDetails.name}</h3>
                                            <p>{item.productDetails.description}</p>
                                            <p>${item.productDetails.price}</p>
                                            <form action="#">
                                                <label>Qty:</label>
                                                <input type="number" min="1" value={item.quantity}
                                                       onChange={(e) => console.log('Handle quantity change')} />
                                            </form>
                                        </div>
                                        <div className="close">
                                            <i className="ri-close-line"></i>
                                        </div>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                    <div className="cart-right">
                        <h2>Cart Total</h2>
                        <div className="c-info">
                            <div className="c-r-info">
                                <div>
                                    <p>Cost Subtotal</p>
                                    <p>Shipping Cost</p>
                                    <p>Discount</p>
                                    <h4>Total Cost</h4>
                                </div>
                            </div>
                            <div className="c-l-info">
                                <div>
                                    <p>${totalBill}</p>
                                    <p>$9</p>
                                    <p>N/A</p>
                                    <h4>${totalBill + 9}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="order-btn">
                            <button onClick={handleCheckout}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="footer-cont">
                    <div className="footer">
                        <div className="company"><img src="img/qt=q_95.jpeg" alt="" /></div>
                        <div className="cust-care">
                            <h3>Customer Care</h3>
                            <ul>
                                <li><a href="#">Contact Us</a></li>
                                <li>Call +91 123 456 789</li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>
                        <div className="link">
                            <h3>Links</h3>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Product</a></li>
                            </ul>
                        </div>
                        <div className="social">
                            <h3>Follow Us</h3>
                            <ul>
                                <li><a href="#">Instagram</a></li>
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Twitter</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
