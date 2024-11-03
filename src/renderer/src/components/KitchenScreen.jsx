import StickyHeader from "./StickyHeader";
import OrderList from "./OrderList"
import KitchenFooter from "./KitchenFooter"

export default function KitchenScreen() {
    return (
        <>
            <StickyHeader title="Kitchen Screen" />
            <OrderList btnmessage="Ready"/>
        </>
    );
}