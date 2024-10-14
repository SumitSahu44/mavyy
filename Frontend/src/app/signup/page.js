import "./signup.css"

export default function signup(){
    return(
        <div>
             <div className="signup-container">
        <div className="signup-header">
            <header>Sign Up</header>
        </div>

        <div className="input-box">
            <input type="text" className="input-field" placeholder="Username" autoComplete="off" required/>
        </div>
        <div className="input-box">
            <input type="email" className="input-field" placeholder="Email" autoComplete="off" required/>
        </div>
        <div className="input-box">
            <input type="password" className="input-field" placeholder="Password" autoComplete="off" required/>
        </div>
        <div className="input-box">
            <input type="password" className="input-field" placeholder="Confirm Password" autoComplete="off" required/>
        </div>

        <div>
            <section>
                <input type="checkbox" id="check"/>
                <label htmlFor="check">Agree to terms & conditions</label>
            </section>
        </div>

        <div className="input-submit">
            <button class="submit-btn" id="submit-btn"></button>
            <label htmlFor="submit">Sign Up</label>
        </div>
    </div>
        </div>
    )
}