import React, { useState, useEffect ,Suspense} from 'react';
import { useSearchParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, Power3, Circ,Expo } from 'gsap';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import '../style/responsive-nav.css'
import '../style/responsive-footer.css'
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import './Buy.css'


const Buy=()=>{
  const [searchParams] = useSearchParams();
  const pid = searchParams.get("pid"); // Replace "paramName" with the actual parameter key
  
  const [data, setData] = useState([]); // Step 1: Initialize state for storing data
  const [quantity, setQuantity] = useState(1);           // Default quantity is 1    
  const [userId, setUserId] = useState(null); // Set this to your logged-in user ID
  const [productId, setProductId] = useState(`${pid}`);
  const [selectedSize, setSelectedSize] = useState(""); // To store selected size
  const [priceAccordingToSize, setPriceAccordingToSize] = useState("");

  const sizePriceMapping = {
    "S": 24.99,
    "M": 24.99,
    "L": 24.99,
    "XL": 34.99,
    "2XL": 34.99,
    "3XL": 34.99
  };



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

  // get userId and product details 
  useEffect(() => {
   
    const fetchData = async () => {
   
     


  //  try {
  //   const response1 = await fetch(`https://mavy-pxtx.onrender.com/user/userId`, {
  //       method: 'GET',
  //       credentials: 'include', // Ensures cookies are sent with the request
  //   });
    
  //   if (!response1.ok) {
  //       throw new Error('Error fetching user data');
  //   }
    
  //       const data1 = await response1.json();
  //       console.log(`dATA ${data1}`)
  //       setUserId(data1.userId)
  //   } catch (error) {
  //       console.error('Error fetching data:', error);
  //   }



        try {
            const response = await fetch(`https://mavy-pxtx.onrender.com/user/products?pid=${pid}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data); // Step 3: Store the fetched data in state
            setPriceAccordingToSize(data.price + ".99")

            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, [])
  





 // Function to handle the Add to Cart action
 const handleAddToCartClick = async () => {
  try {

     if(!selectedSize)
     {
       toast.error("Select Size");
       return
     }



    const authToken = localStorage.getItem('authToken');
    if(!authToken)
    {
      toast.error("User Not registered!");
      setTimeout(() => {
         window.location.href=`/signup?pid=${pid}`;
      }, 6000);
      
      return;
    }

    // Make an API call to the addToCart endpoint
    const response = await fetch('https://mavy-pxtx.onrender.com/user/addtocart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Attach token in Authorization header
      },
      body: JSON.stringify({
        productId,
        quantity,
        size: selectedSize,
      }),
      credentials: 'include', // This ensures cookies are sent along with the request
    });

    const data = await response.json();

    if (response.ok) {
      // Show success message
      
      toast.success("Product added to cart successfully!");
    } else {
      // Handle errors
      toast.error(data.message || 'Error adding product to cart');
     
    }
  } catch (error) {
    console.error('Error in adding product to cart:', error);
    toast.error('An error occurred while adding the product to the cart.');
    
  }
};

const handleSizeChange = (size) => {
  setSelectedSize(size);
  if (sizePriceMapping[size]) {
    setPriceAccordingToSize(sizePriceMapping[size]); // Update price based on size
  }

};

    return(
        <div>
          <header>
            <div className="navbar">
                <div id="nav">
                  <img src="/img/qt=q_95.jpeg" alt=""/>
                  <i ><RiMenu3Fill /></i>
                </div>
                <div id="full">
                  <a href="/"><h4>Home</h4></a>
                  <a href="./about"><h4>About</h4></a>
                  <a href="./product"><h4>Products</h4></a>
                  <a href="./cart"><h4>Cart</h4></a>
                  <a href="./login"><h4>Profile</h4></a>
                  <i><IoMdClose /></i>
                </div>
              </div>
        </header>

            <div class = "card-wrapper">
            <div class = "card">
         
            <div class = "product-imgs">
                <div class = "img-display">
                    <div class = "img-showcase">
                        <img src = {`img/${data.imageUrl?.[0] || 'default-image.jpg'}`} alt = {data.name}/>
                        <img src = {`img/${data.imageUrl?.[1] || 'default-image.jpg'}`} alt = {data.name}/>
                        <img src = {`img/${data.imageUrl?.[2] || 'default-image.jpg'}`} alt = {data.name}/>
                        <img src = {`img/${data.imageUrl?.[3] || 'default-image.jpg'}`} alt = {data.name}/>
                        
                    </div>
                </div>
                 <div class = "img-select">
                    <div class = "img-item">
                        <a href = "#" data-id = "1">
                        <img src = {`img/${data.imageUrl?.[0] || 'default-image.jpg'}`} alt = {data.name+"1"}/>
                        </a>
                    </div>
                    <div class = "img-item">
                        <a href = "#" data-id = "2">
                        <img src = {`img/${data.imageUrl?.[1] || 'default-image.jpg'}`} alt = {data.name+"2"}/>
                        </a>
                    </div>
                    <div class = "img-item">
                        <a href = "#" data-id = "3">
                        <img src = {`img/${data.imageUrl?.[2] || 'default-image.jpg'}`} alt = {data.name+"3"}/>
                        </a>
                    </div>
                    <div class = "img-item">
                        <a href = "#" data-id = "4">
                        <img src = {`img/${data.imageUrl?.[3] || 'default-image.jpg'}`} alt = {data.name+"3"}/>
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
             
              <p class = "new-price">New Price: <span>${priceAccordingToSize}</span></p>
            </div>
      
            <div class = "product-detail">
              <h2>about this item: </h2>
              <p>{data.description}</p>
              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p> */}
              <ul>
                <li>Available: <span>in stock</span></li>
                <li>Category: <span>{data.category}</span></li>
                <li>Shipping Area: <span>All over the world</span></li>
                <li>Sizes: {data.size && data.size.join(", ")}</li>
                {/* <li>Shipping Fee: <span>$9.99</span></li> */}
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

<select 
  required 
  name='size'  
  onChange={(e) => handleSizeChange(e.target.value)} // Directly call handleSizeChange
  value={selectedSize}
>
  <option value="">--Select Size--</option>
  {Array.isArray(data.size) && data.size.length > 0 ? (
    data.size.map((size, index) => (
      <option key={index} value={size}>
        {size}
      </option>
    ))
  ) : (
    <option disabled>No sizes available</option>
  )}
</select>


             <button type = "button" onClick={handleAddToCartClick} class = "btn">
              Add to Cart <i class = "fas fa-shopping-cart"></i>
            </button>
          
            </div>
      
           
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-cont">
            <div className="footer">
                <div className="company"><img src="/img/qt=q_95.jpeg" alt=""/></div>
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
           
            <div className="copyright">
                <h4>Copyright @ 2024 Mavy Scrubs</h4>
            </div>
        </div>
    </footer>
      {/* ToastContainer for displaying messages */}
      <ToastContainer />
    </div>
        
       
    )
}

const BuyWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
      < Buy/>
  </Suspense>
);

export default BuyWrapper;
