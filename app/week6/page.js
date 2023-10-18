"use client"

import { useState } from "react";
import ItemList from "./item-list";
import CounterDisplay from "./util/counter-display";
import NewEvent from "./new-item";
import itemData from "./items.json";

export default function Page(){

    let itemArray = itemData.map( (item) => ({...item}));

    const [counter, setCounter] = useState(0);
    const [itemListState, setItemList] = useState(itemArray);

    function handleAddItem(newItem) {
        setItemList([...itemListState, newItem]);
    }

    const incrementCounter = (currentCount) => {
        setCounter(currentCount + 1);
    }

    return (
        <main>
            <h1 className="text-4xl text-center p-5">Shopping List</h1>
            <NewEvent onAddItem={handleAddItem} />
            <ItemList itemListState={itemListState}/>
            <div>
                <CounterDisplay currentCount={counter} incrementCountFunction={incrementCounter} />
            </div>

        </main>
    );

}