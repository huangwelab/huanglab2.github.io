// rewrite-links.js
document.addEventListener('DOMContentLoaded', function () {
  const currentDomain = window.location.protocol + "//" + window.location.host;

  document.querySelectorAll('a[href]').forEach(link => {
    const originalHref = link.getAttribute('href');

    if (originalHref && originalHref.startsWith('https://www.huangwelab.com')) {
      const newHref = originalHref.replace('https://www.huangwelab.com', currentDomain);
      link.setAttribute('href', newHref);
    }
  });
});