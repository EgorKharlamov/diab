export const setTheme = (mode:string) => {
  const html = document.getElementsByTagName('html');
  html[0].removeAttribute('data-theme');
  if (mode !== 'default') {
    html[0].setAttribute('data-theme', mode);
  }
};
