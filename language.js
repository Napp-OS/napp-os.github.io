const languageKey = 'napp-os-language';
const languageSwitch = document.querySelector('.language-switch');
const languageButtons = languageSwitch.querySelectorAll('button[data-language]');
const translatedText = Array.from(document.querySelectorAll('[data-zh]'), (element) => [element, element.textContent]);
const translatedLabels = Array.from(document.querySelectorAll('[data-zh-label]'), (element) => [element, element.getAttribute('aria-label')]);
const description = document.querySelector('meta[name="description"]');
const englishDescription = description.content;

function setLanguage(language) {
  const chinese = language === 'zh-CN';
  document.documentElement.lang = language;
  description.content = chinese ? description.dataset.zhContent : englishDescription;

  for (const [element, english] of translatedText) {
    element.textContent = chinese ? element.dataset.zh : english;
  }

  for (const [element, english] of translatedLabels) {
    element.setAttribute('aria-label', chinese ? element.dataset.zhLabel : english);
  }

  for (const button of languageButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  }
}

let initialLanguage = 'en';
try {
  if (localStorage.getItem(languageKey) === 'zh-CN') initialLanguage = 'zh-CN';
} catch {
  // The selector still works when browser storage is unavailable.
}

setLanguage(initialLanguage);
for (const button of languageButtons) {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.language);
    try {
      localStorage.setItem(languageKey, button.dataset.language);
    } catch {
      // The selected language still applies to the current page.
    }
  });
}
languageSwitch.hidden = false;
