
"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter
import "./login.css"

export default function login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        const formData = {
            email,
            password,
        };

        try {
            // Step 3: Make POST request to backend API
            const response = await fetch('http://localhost:4000/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include' // Include cookies0 
            });

            const data = await response.json();
               console.log("data"+ response)
            if (response.ok) {
                alert("User Login successfully!");

             router.push('/product'); // Redirect to buy page after success
            } else {
                alert(data.message  || "User Not Found!");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error occurred while Login the user.");
        }
    };

    return(
        <div>
        <div className="login-box">
            <div className="login-header">
                <header>Login</header>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <input
                        type="email"
                        name="email"
                        className="input-field"
                        placeholder="Email"
                        autoComplete="off"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        className="input-field"
                        placeholder="Password"
                        autoComplete="off"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="forgot">
                    <section>
                        <input type="checkbox" id="check" />
                        <label htmlFor="check">Remember Me</label>
                    </section>
                    <section>
                        <a href="">Forgot Password</a>
                    </section>
                </div>
                <div className="input-submit">
                    <button type="submit" className="submit-btn">
                        Log In
                    </button>
                </div>
            </form>
            <div className="sign-up-link">
                <p>Don't have an account? <a href="./signup">Sign Up</a></p>
            </div>
        </div>
    </div>
    )
}
