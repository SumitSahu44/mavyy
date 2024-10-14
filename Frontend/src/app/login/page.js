import "./login.css"

export default function login(){
    return(
        <div>
            <div className="login-box">
        <div className="login-header">
            <header>Login</header>
        </div>
        <div className="input-box">
            <input type="email" className="input-field" placeholder="Email" autoComplete="off" required/>
        </div>
        <div className="input-box">
            <input type="password" className="input-field" placeholder="Password" autoComplete="off" required/>
        </div>
        <div className="forgot">
            <section>
                <input type="checkbox" id="check"/>
                <label htmlFor="check">Remember Me</label>
            </section>

            <section>
                <a href="">Forgot Password</a>
            </section>
        </div>
        <div className="input-submit">
            <button className="submit-btn" id="submit-btn"></button>
            <label htmlFor="submit">Log In</label>
        </div>

        <div className="sign-up-link">
            <p>Don't have account? <a href="./signup">Sign Up</a></p>
        </div>
    </div>
        </div>
    )
}