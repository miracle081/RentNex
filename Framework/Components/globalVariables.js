import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [doc, setDoc] = useState("");
    const [docID, setDocID] = useState("");
    const [userUID, setUserUID] = useState("haypnTylLuU0GAttBS89uZD5MMP2");
    const [preloader, setPreloader] = useState(false);
    const [allAssts, setAllAssts] = useState([]);
    const [userInfo, setUserInfo] = useState({ image: null, firstname: "John", lastname: "Wick", email: "john@gmail.com" });

    return (
        <AppContext.Provider value={{
            doc, setDoc,
            docID, setDocID,
            userUID, setUserUID,
            userInfo, setUserInfo,
            preloader, setPreloader,
            allAssts, setAllAssts,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }