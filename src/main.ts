import './app.scss'
import './styles/githubStyles.scss'
import App from './App.svelte'
import { hasSetting, isDarkMode, toggleDarkMode } from './TS/darkMode';

let startUp = true;

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function handleColorSchemeChange(event) {
  if (startUp && hasSetting()){
    startUp = false;
    toggleDarkMode(isDarkMode());
    return;
  }

  if (event.matches) {
    toggleDarkMode(true);
  } else {
    toggleDarkMode(false);
  }
  startUp = false;
}

darkModeMediaQuery.addEventListener('change',handleColorSchemeChange);

// Initial check for the preferred color scheme
handleColorSchemeChange(darkModeMediaQuery);

console.log("Welcome to aidanbleser.com! See my code here https://github.com/ieedan/aidanbleser.com! 🚀")

const app = new App({
  target: document.getElementById('app'),
})

export default app
