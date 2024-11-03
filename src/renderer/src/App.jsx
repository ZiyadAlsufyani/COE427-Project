import Home from './components/Home'
import OrderNumber from './components/OrderNumber'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import KitchenScreen from './components/KitchenScreen'
import OrderCompletionScreen from './components/OrderCompletionScreen'
import OrderScreen from './components/OrderScreen'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/OrderNumber" element={<OrderNumber />} />
          <Route path="/KitchenScreen" element={<KitchenScreen />} />
          <Route path="/OrderCompletionScreen" element={<OrderCompletionScreen />} />
          <Route path="/OrderScreen" element={<OrderScreen />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
