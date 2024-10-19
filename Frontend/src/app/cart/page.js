"use client";
import "./cart.css"
import "../styles/responsivefooter.css"
import "../styles/responsivenav.css"
import React, { useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap, Power3, Circ,Expo } from 'gsap';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export default function cart(){
    const [userId, setUserId] = useState(null); // Set this to your logged-in user ID 
    const [cartItems, setCartItems] = useState([]); // Contains productId and quantity
    const [productsDetails, setProductsDetails] = useState([]); // Contains fetched product details
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [totalBill, setTotalBill] = useState(null)
    useGSAP(()=>{
        let menu=document.querySelector("#nav i");
    let close=document.querySelector("#full i");
    
    let first=gsap.timeline()
    
    first.to("#full",{
    right:0,
    duration:0.5
    })
    
    first.from("#full h4",{
    x:150,
    duration:0.6,
    stagger:0.2,
    opacity:0
    })
    
    first.from("#full i",{
    opacity:0
    } )
    
    
    first.pause()
    
    
    menu.addEventListener("click",function(){
    first.play()
    })
    
    close.addEventListener("click",function(){
    first.reverse()
    })
    
    })

    // loding use effect 
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch user data, cart items, and product details here
            try {
                const response1 = await fetch(`http://localhost:4000/user/userId`, {
                    method: 'GET',
                    credentials: 'include', // Ensures cookies are sent with the request
                });
                
                if (!response1.ok) {
                    throw new Error('Error fetching user data');
                }
                
                    const data1 = await response1.json();
                    setUserId(data1.userId)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            
                //    get all products from cart 
                try {
                    const response = await fetch(`http://localhost:4000/user/cart`, {
                        method: 'GET',
                        credentials: 'include', // Ensures cookies are sent with the request
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const cartData = await response.json();
                    setCartItems(cartData);// Step 3: Store the fetched data in state

                    // Fetch product details for each productId
                   const fetchedProductDetails = await Promise.all(
                    cartData.map(async (item) => {
                    const productResponse = await fetch(`http://localhost:4000/user/products?pid=${item.productId}`, {
                        method: 'GET',
                        credentials: 'include'
                    });

                    if (!productResponse.ok) {
                        throw new Error(`Error fetching product data for ID ${item.productId}`);
                    }

                    const productDetails = await productResponse.json(); // Assuming product API returns the product details
                    //   const productDetailsString = JSON.stringify(productDetails, null, 2); // Create a new variable for the stringified version
                
                    return {
                        productDetails, // Include product details from API
                        quantity: item.quantity, // Include quantity from cart
                    };
                    })

                );

                setProductsDetails(fetchedProductDetails); // Store the fetched product details
                console.log("Fetched product details: ", fetchedProductDetails); // Log the fetched details
                let totalBill = 0;
                fetchedProductDetails.forEach(element => {
                    totalBill += element.quantity * element.productDetails.price
                 });
                 setTotalBill(totalBill)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }


            setIsLoading(false); // Set loading to false after data is fetched
         
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false); // Set loading to false even if there's an error
          }
        };
      
        fetchData();
      }, []);
      


    return(
        <div>
             <header>
        <div className="navbar">
            <div id="nav">
              <img src="img/qt=q_95.jpeg" alt=""/>
              <i ><RiMenu3Fill /></i>
              {/* <RiMenu3Fill /> */}
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

            
                            
                        <div className="item">
                        <div className="item-img">
                            <img  src={item.productDetails.imageUrl ? `img/${item.productDetails.imageUrl}` : 'img/abena.jpeg'}
                                  alt={item.productDetails.imageUrl || 'Fallback image'}/>
                        </div>
                        <div className="item-info">
                            <h3>{item.productDetails.name}</h3>
                            <p>{item.productDetails.description}</p>
                            <p>${item.productDetails.price}</p>
                            <form action="#">
                                <label>Qty:</label>
                                <input type="number" min="1" value={item.quantity}
                                    onChange={(e) => console.log('Handle quantity change')} // Handle quantity change logic here
                                />
                            </form>
                            
                              
                        </div>
                        <div className="close">
                            <i className="ri-close-line"></i>
                        </div>
                    </div>
          )
          )
          )
    )
        }
               

                
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
                            <p>$9.99</p>
                            <p>N/A</p>
                            <h4>$79.99</h4>
                        </div>
                    </div>
                   </div>
                   <div className="order-btn">
                    <button>Place Order</button>
                </div>
            </div>
        </div>
    </div>


    <footer>
        <div class="footer-cont">
            <div class="footer">
                <div class="company"><img src="img/qt=q_95.jpeg" alt=""/></div>
                <div class="cust-care">
                    <h3>Customer Care</h3>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li>Call +91 123 456 789</li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div class="link">
                    <h3>Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Product</a></li>
                    </ul>
                </div>
                <div class="social">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                    </ul>
                </div>
            </div>
           
            <div class="copyright">
                <h4>Copyright @ 2024 Mavy Scrubs</h4>
            </div>
        </div>
    </footer>
        </div>
    )
}