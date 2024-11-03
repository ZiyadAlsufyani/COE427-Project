import '../assets/OrderNumber.css'
import StickyHeader from './StickyHeader'

export default function OrderNumber() {
  return (
    <>
      <StickyHeader title="Order Number Page" />
      <div className="OrderNumber">
        <h1>Order Numebr Is: {Math.floor(Math.random() * (1000 - 100 + 1)) + 100}</h1>
        <p>Thank you, have a great meal!</p>
      </div>
    </>
  )
}
