import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarKModeContext = createContext();

function DarkModeProvider({ children }) {
    const defaultValuePrefersByUser = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        defaultValuePrefersByUser,
        'isDarkMode'
    );
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    function toggleDarkMode() {
        setIsDarkMode((prev) => !prev);
    }
    return (
        <DarKModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarKModeContext.Provider>
    );
}

function useDarkMode() {
    const context = useContext(DarKModeContext);
    if (context === undefined)
        throw new Error('DarkModeContext was used outside of DarkModeProvider');
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
