const key = "dark-mode";

const toggleDarkMode = (darkMode?: boolean) => {
    if (darkMode === null || darkMode === undefined) darkMode = !isDarkMode();

    const root = document.documentElement;

    darkMode ? root.classList.add('dark-mode') : root.classList.remove('dark-mode');

    localStorage.setItem(key,JSON.stringify(darkMode));
};

const isDarkMode = () => {
    let darkMode = JSON.parse(localStorage.getItem(key)) || false;

    return darkMode;
};

const hasSetting = () => {
    const darkMode = JSON.parse(localStorage.getItem(key));

    return darkMode !== null && darkMode !== undefined;
};

export { toggleDarkMode, isDarkMode, hasSetting}