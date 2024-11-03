import OrderCard from "./OrderCard";
import "../assets/OrderList.css";
import { v4 as uuid } from 'uuid';
import { useState } from "react";

export default function OrderList({btnmessage, btnColor = "primary" }) {
    // Initialize state with 9 OrderCard objects, each with a unique ID
    const initialBoxes = Array.from({ length: 9 }, () => ({ id: uuid(), btnColor }));
    const [boxes, setBoxes] = useState(initialBoxes);

    function addOrderCard() {
        const newBox = { id: uuid(), btnColor };
        setBoxes([...boxes, newBox]);
    }

    function removeOrderCard(id) {
        setBoxes(boxes.filter(box => box.id !== id));
    }

    return (
        <>
            <button onClick={addOrderCard}>Add OrderCard</button>
            <div className="OrderList">
                {boxes.map((box, i) => (
                    <OrderCard orderNum={i+1} btnmessage={btnmessage} key={box.id} id={box.id} btnColor={box.btnColor} removeOrderCard={removeOrderCard} />
                ))}
            </div>
        </>
    );
}