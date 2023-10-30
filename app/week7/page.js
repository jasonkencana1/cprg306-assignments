"use client"

import React from "react";
import { useState } from "react";
import ItemList from "./item-list";
import NewEvent from "./new-item";
import itemData from "./items.json";
import MealIdeas from "./meal-ideas";

export default function Page(){

    let itemArray = itemData.map( (item) => ({...item}));

    const [itemListState, setItemList] = useState(itemArray);
    const [selectedItemName, setSelectedItemName] = useState("");
    
    function cleanUpItemName(itemName) {
        const cleanedName = itemName.split(",")[0].trim().replace(/\p{Emoji}/gu, "");
        return cleanedName;
    }

    function handleAddItem(newItem) {
        setItemList([...itemListState, newItem]);
    }

     function handleItemSelect(item) {
        setSelectedItemName(cleanUpItemName(item.name));
    }

    return (
        <main>
            <h1 className="text-4xl text-center p-5">Shopping List</h1>
            <div className="flex">
            <div className="w-1/2 pr-2">
                <NewEvent onAddItem={handleAddItem} />    
                <ItemList itemListState={itemListState} onItemSelect={handleItemSelect}/>
            </div>
            <div className="w-1/2 pl-2">
                <MealIdeas ingredient={selectedItemName} />
            </div>
            </div>
        </main>
    );

}