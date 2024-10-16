"use client";
import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import "../styles/responsivefooter.css"
import "../styles/responsivenav.css"
import "./buy.css"
import product from '../product/page';

export default function buy(){
  
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  
  const [data, setData] = useState([]); // Step 1: Initialize state for storing data
  const [message, setMessage] = useState('');
  const [cartDetails, setCartDetails] = useState(null);  // Store cart details (product and quantity)
  const [quantity, setQuantity] = useState(1);           // Default quantity is 1    
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('67100e4f93f286ae10f1bcb6'); // Set this to your logged-in user ID
  const [productId, setProductId] = useState(`${pid}`);
  useEffect(() => {
    
   
    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = [...imgs];
    let imgId = 1;
    
    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });
  
    function slideImage(){
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }
    
    window.addEventListener('resize', slideImage);
  }, []);

  // get product details 
  useEffect(() => {
   
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/user/products?pid=${pid}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data); // Step 3: Store the fetched data in state
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, [])
  


// add to cart function 
  // useEffect that will trigger the POST request when cartDetails change
  useEffect(() => {
    if (cartDetails) {
      const addToCart = async () => {
        try {

          
          const response = await fetch('http://localhost:4000/user/addtocart', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, productId, quantity }),
        });

          if (response.ok) {
            setMessage('Product added to cart successfully!');
          } else {
            setMessage('Failed to add product to cart.');
          }
        } catch (error) {
          console.error('Error in adding product to cart:', error);
   setError('An error occurred while adding the product to the cart.');
   setMessage('');
        }
      };

      // Trigger the addToCart function inside useEffect
      addToCart();
    }
  }, [cartDetails]); // Only run useEffect when cartDetails changes







 // Function to handle the Add to Cart action
 const handleAddToCartClick = async () => {
  try {
    if (!userId || !productId || !quantity) {
      setError('All fields are required');
      setMessage('');
      return;
    }
    // Make an API call to the addToCart endpoint
    const response = await fetch('http://localhost:4000/user/addtocart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Show success message
      setMessage('Product added to cart successfully!');
      setError('');
    } else {
      // Handle errors
      setError(data.message || 'Error adding product to cart');
      setMessage('');
    }
  } catch (error) {
    console.error('Error in adding product to cart:', error);
    setError('An error occurred while adding the product to the cart.');
    setMessage('');
  }
};


    return(
        <div>
            <div class = "card-wrapper">
            <div class = "card">
         
            <div class = "product-imgs">
                <div class = "img-display">
                    <div class = "img-showcase">
                        <img src = "img/image0.jpeg" alt = "shoe image"/>
                        <img src = "img/image1.jpeg" alt = "shoe image"/>
                        <img src = "img/image2.jpeg" alt = "shoe image"/>
                
                    </div>
                </div>
                 <div class = "img-select">
                    <div class = "img-item">
                        <a href = "#" data-id = "1">
                        <img src = "img/image0.jpeg" alt = "shoe image"/>
                        </a>
                    </div>
                    <div class = "img-item">
                        <a href = "#" data-id = "2">
                        <img src = "img/image1.jpeg" alt = "shoe image"/>
                        </a>
                    </div>
                    <div class = "img-item">
                        <a href = "#" data-id = "3">
                        <img src = "img/image2.jpeg" alt = "shoe image"/>
                        </a>
                    </div>
                  </div>
            </div>
              
          <div class = "product-content">
            <h2 class = "product-title">{data.name}</h2>
            <a href = "#" class = "product-link"></a>
            <div class = "product-rating">
              <i class = "fas fa-star"></i>
              <i class = "fas fa-star"></i>
              <i class = "fas fa-star"></i>
              <i class = "fas fa-star"></i>
              <i class = "fas fa-star-half-alt"></i>
              <span>4.7(21)</span>
            </div>
      
            <div class = "product-price">
             
              <p class = "new-price">New Price: <span>${data.price}</span></p>
            </div>
      
            <div class = "product-detail">
              <h2>about this item: </h2>
              <p>{data.description}</p>
              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p> */}
              <ul>
                <li>Available: <span>in stock</span></li>
                <li>Category: <span>Cloth</span></li>
                <li>Shipping Area: <span>All over the world</span></li>
                <li>Shipping Fee: <span>$9.99</span></li>
              </ul>
            </div>
      
            <div class = "purchase-info">
              {/* <input type = "number" min = "0" placeholder='1'/> */}
              <input
          type="hidden"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your user ID"
        />

         
                  <input
                    type="hidden"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Enter product ID"
                  />

              <input 
                type="number" 
                min="1" 
                name="quantity"
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
              />


             <button type = "button" onClick={handleAddToCartClick} class = "btn">
              Add to Cart <i class = "fas fa-shopping-cart"></i>
            </button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
              {/* <button type = "button" class = "btn">Compare</button> */}
            </div>
      
           
          </div>
        </div>
      </div>
    </div>
        
       
    )
}