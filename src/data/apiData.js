import React from "react";
import axios from "axios";


export const fetchData = async (url) => {

    try {
        const response = await axios.get(url)
        if (!response.statusText === "OK") {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.data;
        return data;
    } catch (error) {
        return [];
    }

}