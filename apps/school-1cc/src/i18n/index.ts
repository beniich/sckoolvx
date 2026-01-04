import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import ru from './locales/ru.json';

// Ressources de traduction
const resources = {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de },
    ru: { translation: ru },
};

// Langues supportées avec métadonnées
export const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

i18n
    .use(LanguageDetector) // Détecte automatiquement la langue du navigateur
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en', // Langue par défaut si non détectée
        lng: localStorage.getItem('language') || 'en', // Utiliser la langue sauvegardée ou anglais
        interpolation: {
            escapeValue: false, // React gère déjà l'échappement XSS
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'language',
        },
    });

// Fonction pour changer de langue
export const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
};

// Export par défaut pour l'import dans main.tsx
export default i18n;
