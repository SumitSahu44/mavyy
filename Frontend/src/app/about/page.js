"use client";
import "./page.css"
import "../styles/responsivefooter.css"
import "../styles/responsivenav.css"
import { useGSAP } from "@gsap/react";
import { gsap, Power3, Circ,Expo } from 'gsap';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";


export default function about(){

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
            </div>
            <div id="full">
                  <a href="/"><h4>Home</h4></a>
                  <a href="#"><h4>About</h4></a>
                  <a href="./product"><h4>Products</h4></a>
                  <a href="./cart"><h4>Cart</h4></a>
                  <a href="./login"><h4>Profile</h4></a>
              <i><IoMdClose /></i>
            </div>
          </div>
    </header>

    <section>
        <div className="story">
            <p id="first">Our Story</p>
            <h1>Crafted with Care: Fine <br/>Materials, Thoughtful Design </h1>
            <p id="second">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, ea. Ipsum voluptatem, quibusdam dicta, minima exercitationem magnam, sapiente molestiae odit eum veritatis rem enim eligendi. Alias voluptate adipisci incidunt atque.</p>
        </div>
    </section>

    <section>
        <div className="about-container">
            <div className="about">
                <div className="about-img">
                    <img src="img/image3 (1).jpeg" alt=""/>
                </div>
                <div className="about-content">
                    <p id="head">Our Product Quality</p>
                    <h2>We Make Things Comfy, <br/>Pretty, and Fancy</h2>
                    <p id="subhead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque repellat ipsa laudantium!</p>
                    <div className="bottom-section">
                        <div>
                            <h4>100% Cotton</h4>
                            <p>Lorem ipsum dolor sit amet consectetur <br/> adipisicing elit. Similique, porro!</p>
                        </div>
                        <div>
                            <h4>Breathable Fabric</h4>
                            <p>Lorem ipsum dolor sit amet consectetur <br/> adipisicing elit. Similique, porro!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div className="about-info">
            <div className="a-img-gallery">
                <img src="img/image4.jpeg" alt=""/>
                <h3>Attention to Details</h3>
                <p>We hand pick the right Kente to match the uniform style</p>
            </div>

            <div className="a-img-gallery">
                <img src="img/image0 (1).jpeg" alt=""/>
                <h3>Choice of Kente Cloth</h3>
                <p>Our vision is to bring vibrant colors into your medical scrub wear</p>
            </div>
        </div>
    </section>
    <footer>
        <div className="footer-cont">
            <div className="footer">
                <div className="company">
                    <img src="img/qt=q_95.jpeg" alt=""/>
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
                        <li><a href="#">About</a></li>
                        <li><a href="#">Products</a></li>
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
    );
}