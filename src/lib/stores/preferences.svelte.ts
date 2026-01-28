import { MediaQuery } from 'svelte/reactivity';
import { localStorage } from './localStorage.svelte';

const prefersDark = new MediaQuery('prefers-color-scheme: dark').current;

const darkMode = localStorage('baseline:darkmode', prefersDark);

export default { darkMode };
