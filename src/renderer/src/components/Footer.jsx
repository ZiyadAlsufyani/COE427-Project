import Button from '@mui/joy/Button'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { Link } from 'react-router-dom'
import '../assets/Footer.css'

const Footer = ({ selectedCount }) => {
  return (
    <footer className="Footer">
      <Link to="/OrderNumber">
        <Button size="lg" endDecorator={<KeyboardArrowRight />} color="success">
          Go to checkout ({selectedCount})
        </Button>
      </Link>
    </footer>
  )
}

export default Footer
