import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./createInfoModal.scss"

// stocks is object with the keys: companyName, symbol, id
function CreateInfoModal({ clubName, onCreate, onCancel }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    // const [selectedStockId, setSelectedStockId] = useState(stocks[0]._id);

    async function handleSubmit(event) {
        event.preventDefault(); // stops the default action belonging to the event from occuring
        // in this case, it stops the submit button from submitting the form

        const newInfo = {
            clubName: clubName,
            title: title,
            link: link,
            // FIXED favoriteStockId: selectedStockId
        }

        // Create new user by sending a POST request to the backend 
        const createdInfo = await axios.post("http://127.0.0.1:5000/club-info", newInfo);

        if (createdInfo.status === 200 && createdInfo.data) {// User successfully created - go back to main page
            setErrorMessage("");
            onCreate();// hides modal and refreshes user list (passed in from the parent component (mainPage) so we can alter its state)
        }
        else {
            setErrorMessage("Failed to create club info");
        }
    }

    // stocks is object with the keys: companyName, symbol, id
    /*
        {
            _id: 123,
            companyName : Apple, 
            symbol: AAPL, 
        }
    */

    // Returns an array of <option> created using information from passed in stocks property
    // This will be used to create the dropdown in the modal
    // function renderStockOptions() {
    //     const options = stocks.map(function (stock) {
    //         return <option key={stock._id} value={stock._id}>{stock.companyName + "(" + stock.symbol + ")"}</option>
    //     });
    //     return options;
    // }

    return (
        <motion.div
            animate={{
                opacity: [0, 1],
            }}
            transition={{
                duration: 0.5,
            }}
            className="selected-stock flex-center"
        >
            <form className="myForm" onSubmit={handleSubmit}>
                <label>Socials</label>
                <input type="text" onChange={(event) => setTitle(event.target.value)} required />
                
                <label>Social Link</label>
                <input type="text" onChange={(event) => setLink(event.target.value)} />

                {/* <label>Favorite Stock</label>
                <select id="fav-stock" name="fav-stock" onChange={(event) => setSelectedStockId(event.target.value)}>
                {renderStockOptions()}
                </select> */}
                
                <input className="button" type="submit" value="Create Info" />
                <button className="button" type="button" onClick={onCancel}>Cancel</button>
                <p id="error-message">{errorMessage}</p>
            </form>
        </motion.div >

    );
}

export default CreateInfoModal;