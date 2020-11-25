import React, { useState } from "react";
import logo from "./logo.svg";
import "./index.css";

const App = () => {
    const initialData = [
        { itemName: "Apple", quantity: 1, id: "item1" },
        { itemName: "Banana", quantity: 3, id: "item2" },
        { itemName: "Fazer", quantity: 2, id: "item3" },
        { itemName: "Pizza", quantity: 1, id: "item4" },
        { itemName: "Milk", quantity: 1, id: "item5" },
        { itemName: "Watermelon", quantity: 25, id: "item6" },
        { itemName: "Olut", quantity: 5, id: "item7" },
        { itemName: "Coffee", quantity: 3, id: "item8" },
        { itemName: "Sugar", quantity: 2, id: "item9" },
        { itemName: "Tea", quantity: 3, id: "item10" }
    ];
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const initialList = shuffleArray(initialData).slice(0,5);
    
    const [items, setItems] = useState(initialList);
    const [inputValue, setInputValue] = useState("");
    const [inputAmount, setInputAmount] = useState("");

    const addItemButton = () => {
        if (!inputValue || !inputAmount) {
            return;
        }
        const newItem = {
            itemName: inputValue,
            quantity: inputAmount,
            id: String(new Date())
        };

        const newItems = [...items, newItem];

        setItems(newItems);
        setInputValue("");
        setInputAmount("");
    };

    const deleteItemButton = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    function handleNameChange({ target: { value } }) {
        setInputValue(value);
    }
    function handleAmountChange({ target: { value } }) {
        setInputAmount(value);
    }

    function handleEditName(id, value) {
        setItems(
            items.map((item) =>
            item.id === id ? { ...item, itemName: value } : item
            )
        );
    }

    function handleEditAmount(id, value) {
        setItems(
            items.map((item) =>
            item.id === id ? { ...item, quantity: value } : item
            )
        );
    }

    return (
        <div className="app-background">
            <div className="header">
                <div className="logo">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className="title">
                    <h1>Shopping List</h1>
                </div>
            </div>
            <div className="container">
            <div className="item-list-container">
                <h2>Current Products</h2>
                {items.map((item) => (
                <div className="item" key={item.id}>
                    <Editable
                    onSubmit={(value) => handleEditName(item.id, value)}
                    value={item.itemName}
                    >
                    {item.itemName}
                    </Editable>
                    <Editable
                    onSubmit={(value) => handleEditAmount(item.id, value)}
                    value={item.quantity}
                    >
                    {item.itemName}
                    </Editable>
                    <button
                    className="button button-delete"
                    onClick={(e) => deleteItemButton(item.id)}
                    >
                    remove
                    </button>
                </div>
                ))}
            </div>
            <div className="add-item-container">
                <h2>Add New Products</h2>
                <div className="add-item">
                <input
                    value={inputValue}
                    onChange={handleNameChange}
                    className="add-item-input"
                    placeholder="Add an item"
                />
                <input
                    value={inputAmount}
                    onChange={handleAmountChange}
                    className="add-item-amount"
                    placeholder="Amount"
                    type="number"
                />
                <button className=" button button-add" onClick={addItemButton}>
                    add
                </button>
                </div>
            </div>
            </div>
        </div>
)   ;
};

const Editable = ({ value, onSubmit }) => {
    const [editting, setEditting] = useState(false);
    const [draft, setDraft] = useState(value);

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            setEditting(false);
            onSubmit(draft);
        }
    }
    function handleOnBlur() {
        setEditting(false);
        onSubmit(draft);

    }

    return editting ? (
        <input
            className="add-item-input"
            value={draft}
            onChange={({ target: { value } }) => setDraft(value)}
            onKeyDown={handleKeyDown}
            onBlur={handleOnBlur}
        />
        ) : (
        <span onClick={() => setEditting(true)}>{value}</span>
    );
};

export default App;
