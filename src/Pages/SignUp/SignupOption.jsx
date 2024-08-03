import { Link } from 'react-router-dom';
import './SignupOption.css'; // Import the CSS file for styling

const SignupOption = () => {
    return (
        <div className="signup-page">
            <h1 className="signup-title">Sign Up</h1>
            <p className="signup-subtitle">Choose your role to get started:</p>
            <div className="signup-links">
                <Link to="/signup/doctor" className="signup-link doctor">
                    <span className="icon">👨‍⚕️</span> Doctor
                </Link>
                <Link to="/signup/patient" className="signup-link patient">
                    <span className="icon">🧑‍⚕️</span> Patient
                </Link>
            </div>
        </div>
    );
};

export default SignupOption;
