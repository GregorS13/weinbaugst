import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

const updateGtagConsent = () => {
    const consentMode = {
        'analytics_storage': window.CookieConsent.acceptedService('analytics_storage', 'analytics') ? 'granted' : 'denied',
    };
    window.gtag('consent', 'update', consentMode);
    localStorage.setItem('consentMode', JSON.stringify(consentMode));
};

CookieConsent.run({
    onFirstConsent: updateGtagConsent,
    onConsent: updateGtagConsent,
    onChange: updateGtagConsent,
    cookie: {expiresAfterDays: 14},
    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {
            autoClear: {
                cookies: [
                    {name: /^_ga/},
                    {name: '_gid'},
                ],
            },
            services: {
                analytics_storage: {
                    label: 'Enables storage related to analytics.',
                },
            },
        }
    },

    language: {
        default: 'en',
        autoDetect: 'browser',
        translations: {
            en: {
                consentModal: {
                    title: 'We use cookies',
                    description: 'For any queries in relation to our policy on cookies and your choices, please refer to our <a href="datenschutz.html">Cookie Policy</a>',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage Individual preferences'
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    sections: [
                        {
                            title: 'Performance and Analytics',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'More information',
                            description: 'For any queries in relation to our policy on cookies and your choices, please refer to our <a href="datenschutz.html">Cookie Policy</a>',
                        }
                    ]
                }
            },
            de: {
                consentModal: {
                    title: 'Wir verwenden Cookies',
                    description: 'Weitere information finden Sie unter unserer <a href="datenschutz.html">Cookie-Richtlinie</a>',
                    acceptAllBtn: 'Alle akzeptieren',
                    acceptNecessaryBtn: 'Nur notwendige akzeptieren',
                    showPreferencesBtn: 'Cookie-Einstellungen verwalten'
                },
                preferencesModal: {
                    title: 'Cookie-Einstellungen verwalten',
                    acceptAllBtn: 'Alle akzeptieren',
                    acceptNecessaryBtn: 'Nur notwendige akzeptieren',
                    savePreferencesBtn: 'Aktuelle Auswahl akzeptieren',
                    closeIconLabel: 'Schließen',
                    sections: [
                        {
                            title: 'Leistungs- und Analyse-Cookies',
                            description: 'Diese Cookies sammeln Informationen darüber, wie Sie unsere Website nutzen. Alle Daten sind anonymisiert und können nicht verwendet werden, um Sie zu identifizieren.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'Weitere Informationen',
                            description: 'Weitere information finden Sie unter unserer <a href="datenschutz.html">Cookie-Richtlinie</a>',
                        }
                    ]
                }
            }
        }
    }
});

