import { translations } from '../assets/languages/languages.json';

function translate( field: string, lang: string) {
    return translations[field][lang];
};

export default translate;