"use client";
import "./product.css"
import "../styles/responsivefooter.css"
import "../styles/responsivenav.css"
import { useGSAP } from "@gsap/react";
import { gsap, Power3, Circ,Expo } from 'gsap';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
export default function product(){

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
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/user/products`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // setStudents(data);
                console.log(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])
    
    return(

        <div>
            <header>
        <div className="navbar">
            <div id="nav">
              <img src="img/qt=q_95.jpeg" alt=""/>
              <i ><RiMenu3Fill /></i>
            </div>
            <div id="full">
                  <a href="/"><h4>Home</h4></a>
                  <a href="./about"><h4>About</h4></a>
                  <a href="#"><h4>Products</h4></a>
                  <a href="./cart"><h4>Cart</h4></a>
                  <a href="./login"><h4>Profile</h4></a>
              
              <i><IoMdClose /></i>
            </div>
          </div>
    </header>


    <section>
        <div className="item-section">
            <div className="p-heading"><h1>Featured Products</h1></div>
            <div className="item-cont">
                <div className="item">
                    <div className="product-img " id="p-img1">
                        
                    </div>
                    <div className="product-info">
                        <h3>Abena</h3>
                        <p>$35.00</p>
                        <a href="buy.html"><button>Buy Now</button></a>
                    </div>
                </div>
                
                <div className="item">
                    <div className="product-img" id="p-img2">
                       
                    </div>
                    <div className="product-info">
                        <h3>Akuba</h3>
                        <p>$35.00</p>
                        <a href="buy2.html"><button>Buy Now</button></a>
                    </div>
                </div>
        </div>
        </div>
    </section>

    <footer>
        <div className="footer-cont">
            <div className="footer">
                <div className="company">
                    <img src="/img/qt=q_95.jpeg" alt=""/>
                </div>
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
                        <li><a href="about.html">About</a></li>
                        <li><a href="product.html">Products</a></li>
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
        </div>
    )
}