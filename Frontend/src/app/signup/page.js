"use client";
import React, { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; // Import useRouter
import "./signup.css"

export default function signup() {

    const searchParams = useSearchParams();
    const pid = searchParams ? searchParams.get('pid') : null;;
  
    
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const router = useRouter(); // Initialize useRouter


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        if (!isChecked) {
            alert("You must agree to the terms and conditions.");
            return;
        }

        const formData = {
            name,
            email,
            password,
        };

        try {
            // Step 3: Make POST request to backend API
            const response = await fetch('https://mavy-pxtx.onrender.com/user/signup', {
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
                alert("User registered successfully!");

             router.push(pid ? `/buy?pid=${pid}` : '/'); // Redirect to buy page after success
            } else {
                alert(data.message  || "Error during registration.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error occurred while registering the user.");
        }
    };


    return (
        <div>
            <div className="signup-container">
                <div className="signup-header">
                    <header>Sign Up</header>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Username"
                            value={name}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div>
                        <section>
                            <input
                                type="checkbox"
                                id="check"
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                            />
                            <label htmlFor="check">Agree to terms & conditions</label>
                        </section>
                    </div>

                    <div className="input-submit">
                        <button className="submit-btn" id="submit-btn" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
