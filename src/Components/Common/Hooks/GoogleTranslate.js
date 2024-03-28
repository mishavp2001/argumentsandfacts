import { useEffect } from 'react';

function useGoogleTranslateScript() {
    useEffect(() => {
        const addScript = document.createElement('script');
        addScript.setAttribute(
            'src',
            '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        );
        document.body.appendChild(addScript);
        // debugger
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,es,ru',//here include all languages that you need
                },
                'google_translate_element'
            );
        };
    }, []);
}

export default useGoogleTranslateScript;