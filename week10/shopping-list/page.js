"use client";
import { useUserAuth } from "../_utils/auth-context";
import { useState, useEffect } from "react";
import ItemList from "./item-list";
import NewEvent from "./new-item";
import MealIdeas from "./meal-ideas";
import React from 'react';
import {getItemsByUser, addItemToUser} from "../_services/shopping-list-service";

const ShoppingListPage = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  let itemArray = itemData.map( (item) => ({...item}));

  const [itemListState, setItemList] = useState(itemArray);
  const [selectedItemName, setSelectedItemName] = useState("");
  
  function cleanUpItemName(itemName) {
      const cleanedName = itemName.split(",")[0].trim().replace(/\p{Emoji}/gu, "");
      return cleanedName;
  }

  async function handleAddItem(newItem) {
    try {
      if (user) {
        const userId = user.uid;
        const newItemId = await addItemToUser(userId, newItem);
        newItem.id = newItemId;
        setItemList([...itemListState, newItem]);
      }
    } catch (error) {
      console.error('Error adding item: ', error);
    }
  }

   function handleItemSelect(item) {
      setSelectedItemName(cleanUpItemName(item.name));
  }

  const loadItems = async () => {
    try {
      if (user) {
        const userId = user.uid;

        const items = await getItemsByUser(userId);

        setItemList(items);
      }
    } catch (error) {
      console.error('Error loading items: ', error);
    }
  };

  useEffect(() => {
    loadItems();
  }, [user]);

  return (
    <main>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
          <h1 className="text-center p-5">Shopping List</h1>
            <div className="flex">
            <div className="w-1/2">
                <NewEvent onAddItem={handleAddItem} />    
                <ItemList itemListState={itemListState} onItemSelect={handleItemSelect}/>
            </div>
            <div className="w-1/2 pl-2">
                <MealIdeas ingredient={selectedItemName} />
            </div>
            </div>
        </div>
      ) : (
        <div>
          <button onClick={handleSignIn}>Sign In with GitHub</button>
        </div>
      )}
    </main>
  );
};

export default ShoppingListPage;
