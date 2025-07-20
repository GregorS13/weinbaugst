// script.js

const translations = {}; // Object to hold loaded translations
const defaultLang = 'de';
const supportedLanguages = ['en', 'de', 'fr']; // Add all your supported languages

// Function to fetch translation data
async function fetchLanguageData(lang) {
    try {
        const response = await fetch(`./messages/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Could not load translations for ${lang}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching language data:', error);
        return {}; // Return empty object on error
    }
}

// Function to apply translations to the HTML
function applyTranslations(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });
    // Update the HTML lang attribute for better SEO and accessibility
    document.documentElement.lang = langData.languageCode || defaultLang; // Assuming you have a "languageCode" key in your JSON
}

// Function to detect browser language
function getBrowserLanguage() {
    let userLang = navigator.language || navigator.userLanguage; // Primary preference
    userLang = userLang.split('-')[0]; // Get only the two-letter language code (e.g., "en" from "en-US")

    // Check if the detected language is supported
    if (supportedLanguages.includes(userLang)) {
        return userLang;
    }

    // If not supported, try other preferred languages
    if (navigator.languages) {
        for (const lang of navigator.languages) {
            const shortLang = lang.split('-')[0];
            if (supportedLanguages.includes(shortLang)) {
                return shortLang;
            }
        }
    }

    // Fallback to default language if no supported language is found
    return defaultLang;
}

// Function to load and apply language
async function loadAndApplyLanguage(lang) {
    const langData = await fetchLanguageData(lang);
    if (Object.keys(langData).length > 0) { // Only apply if data was loaded successfully
        applyTranslations(langData);
        // Save user preference to localStorage (optional, but good for returning visitors)
        localStorage.setItem('preferredLang', lang);
    }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
    let currentLang = localStorage.getItem('preferredLang');

    if (!currentLang) {
        currentLang = getBrowserLanguage();
    }

    await loadAndApplyLanguage(currentLang);

    // Add event listeners for language switcher buttons
    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const newLang = event.target.dataset.lang;
            await loadAndApplyLanguage(newLang);
        });
    });
});