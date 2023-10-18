"use client";

import { useState } from "react";
import Item from "./item";
//import itemData from "./items.json";

export default function ItemList({itemListState}) {
    // map JSON data to an array
    let itemArray = [...itemListState];

    let [filter, setFilter] = useState("all");
    let [sortBy, setSortBy] = useState("name");

    let sortedItemArray = [...itemListState];

    //sorting function
    sortedItemArray = sortedItemArray.sort((a, b) => {
        if ( isNaN (parseInt(a[sortBy])) ) {
            //sort alphabetically
            let nameA = a[sortBy].toUpperCase();
            let nameB = b[sortBy].toUpperCase();

            if(nameA < nameB){
                return -1;
            }
            if (nameA > nameB){
                return 1;
            }
            return 0;
        }
        else 
        {
            //sort numerically
            return a[sortBy] - b[sortBy];
        }
    });

    //filtering function
    if(filter != "all") 
    {
        sortedItemArray = sortedItemArray.filter( (item) => item.category === filter );
    }


    return (
        <div>
            <div className="flex pl-10 pt-5 pb-5 pr-10 bg-blue-300">

                <div className="flex items-center space-x-4">
                    <label className="text-gray-600 font-medium">Sort by: </label>
                    <button 
                        className={`text-white rounded-md px-3 py-1 transition duration-300 ease-in-out ${sortBy === "name" ? 'bg-blue-600' : 'bg-blue-500'}`}
                        onClick={() => setSortBy("name")}>
                                Name
                    </button>
                    <button 
                        className={`text-white rounded-md px-3 py-1 transition duration-300 ease-in-out ${sortBy === "category" ? 'bg-blue-600' : 'bg-blue-500'}`}
                        onClick={() => setSortBy("category")}>
                                Category
                    </button>
                </div>

                <div className="flex-1 ml-5">
                    <label className="mr-2 ml-5"> Filter By: </label>
                    <select
                        className="border rounded-md px-2 py-1 focus:text-black"
                        onChange={ (e) => setFilter(e.target.value) }>
                        <option value="all">All</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="produce">Produce</option>
                        <option value="household">Household</option>
                        <option value="meat">Meat</option>
                        <option value="dry goods">Dry Goods</option>
                        <option value="canned goods">Canned Goods</option>
                    </select>
                </div>
            </div>
            
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                {sortedItemArray.map( (item) => (<Item item = {item} key = {item.id} />))}
            </section>
        </div>
    );

}