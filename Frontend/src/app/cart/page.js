"use client";
import "./cart.css"
import "../styles/responsivefooter.css"
import "../styles/responsivenav.css"
import { useGSAP } from "@gsap/react";
import { gsap, Power3, Circ,Expo } from 'gsap';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export default function cart(){

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
                <div className="item">
                    <div className="item-img">
                        <img src="img/image2.jpeg" alt=""/>
                    </div>
                    <div className="item-info">
                        <h3>Abena</h3>
                        <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet.</p>
                        <p>$35.00</p>
                        <form action="#">
                            <input type="number" min="1" value="1"/>
                        </form>
                    </div>
                    <div className="close">
                        <i className="ri-close-line"></i>
                    </div>
                </div>

                <div className="item">
                    <div className="item-img">
                        <img src="img/image3.jpeg" alt=""/>
                    </div>
                    <div className="item-info">
                        <h3>Akuba</h3>
                        <p>Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet.</p>
                        <p>$35.00</p>
                        <form action="#">
                            <input type="number" min="1" value="1"/>
                        </form>
                       
                    </div>
                    <div className="close">
                        <i className="ri-close-line"></i>
                    </div>
                </div>
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
                            <p>$70.00</p>
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