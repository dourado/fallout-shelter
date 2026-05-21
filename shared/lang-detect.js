if (!localStorage.getItem('lang_pref')) {
  if (navigator.language && navigator.language.toLowerCase().indexOf('pt') === 0) {
    localStorage.setItem('lang_pref', 'pt');
    location.replace('/pt-br' + location.pathname + location.search);
  } else {
    localStorage.setItem('lang_pref', 'en');
  }
}
