import { createContext, useState, useEffect } from "react";

export const UsersPageContext = createContext();

export function UsersPageContextProvider(props) {
    const [isPageOpen, setIsPageOpen] = useState(false);

    const pageOpen = () => {
        setIsPageOpen(true);
    }

    const pageClosed = () => {
        setIsPageOpen(false);
    }

    return (
        <UsersPageContext.Provider
            value={{
                pageOpen,
                pageClosed
            }}
        >
            {props.children}
        </UsersPageContext.Provider>
    );
}

