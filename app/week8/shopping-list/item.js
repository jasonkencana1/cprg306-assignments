import React from "react";

export default function Item({item, onSelect}) {

    const handleItemClick = () => {
        onSelect(item);
    };

    return (
        <section className="bg-blue-500 p-5 rounded">
            <h3 className="text-xl">Name : {item.name}</h3>
            <p>Quantity : {item.quantity}</p>
            <p>Category : {item.category}</p>
        </section>
    );

}