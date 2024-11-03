import '../assets/StickyHeader.css' // Import the CSS file for styles
import logo from '../assets/McDonalds-01.svg' // Import the logo
import { Link } from 'react-router-dom'

const StickyHeader = ({ title }) => {
  return (
    <header className="sticky-header">
      <div className="header-content">
        <div className="logoAndTitle">
          <img src={logo} alt="McDonald's Logo" className="logo" />
          <h1 className="title">{title}</h1>
        </div>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/OrderNumber" className="nav-link">
            Order Number
          </Link>
          <Link to="/KitchenScreen" className="nav-link">
            Kitchen Screen
          </Link>
          <Link to="/OrderCompletionScreen" className="nav-link">
            Order Completion
          </Link>
          <Link to="/OrderScreen" className="nav-link">
            Order Status
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default StickyHeader
