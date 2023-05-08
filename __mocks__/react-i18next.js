module.exports = {
  useTranslation: () => {
    return {
      t: (str, object) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
};
