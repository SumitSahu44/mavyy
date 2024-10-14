"use client";
import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import "../styles/responsivefooter.css"
import "../styles/responsivenav.css"
import "./buy.css"

export default function buy(){
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  const [data, setData] = useState([]); // Step 1: Initialize state for storing data
  const [error, setError] = useState(null); // Step 2: Initialize state for errors
 
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
  


    return(
        <div>
            <div class = "card-wrapper">
            <div class = "card">
         
            <div class = "product-imgs">
                <div class = "img-display">
                    <div class = "img-showcase">
                        <img src = "../server/products_img/Abera.jpeg" alt = "shoe image"/>
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
              <input type = "number" min = "0" value = "1"/>
             <a href="cart.html"> <button type = "button" class = "btn">
              Add to Cart <i class = "fas fa-shopping-cart"></i>
            </button></a>
              <button type = "button" class = "btn">Compare</button>
            </div>
      
           
          </div>
        </div>
      </div>
    </div>
        
       
    )
}