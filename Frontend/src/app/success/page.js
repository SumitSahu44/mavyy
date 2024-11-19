"use client";
import { useEffect } from 'react';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import './success.css';
const PaymentSuccess = () => {
    useEffect(() => {
        const checkPaymentStatus = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const sessionId = queryParams.get('session_id');

            try {
                // const response = await fetch(`http://localhost:4000/user/verify-payment?session_id=${sessionId}`);
                // const result = await response.json();

                // if (result.paymentStatus === 'paid') {
                // Clear the cart
                const deleteResponse = await fetch('http://localhost:4000/user/cartClear', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (deleteResponse.ok) {
                    console.log("Cart items cleared successfully.");
                } else {
                    console.error("Error clearing the cart:", await deleteResponse.json());
                }
                // }
            } catch (error) {
                console.error('Error verifying payment status:', error);
            }
        };

        checkPaymentStatus();
    }, []);

    return (
        <div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="message-box _success">
                            <i className="fa fa-check-circle" aria-hidden="true"><IoCheckmarkDoneCircle className='success-icon' /></i>
                            <h2> Your payment was successful </h2>
                            <p> Thank you for your payment. we will <br />
                                be in contact with more details shortly
                                
                             </p>
                             <h6>Back to Home <a href='./'>CLick Here</a> </h6>
                        </div>
                    </div>
                </div>
                {/* <hr /> */}
           </div>
        </div>
    );
};

export default PaymentSuccess;
