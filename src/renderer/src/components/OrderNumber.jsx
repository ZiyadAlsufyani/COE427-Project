import "../assets/OrderNumber.css"
import StickyHeader from "./StickyHeader";

export default function OrderNumber() {
    return (
        <>
            <StickyHeader title="Order Number Page"/>
            <div className="OrderNumber">
                <h1>Order Numebr Is: 2830</h1>
                <p>Thank you, have a great meal!</p>
            </div>
        </>
    );
}