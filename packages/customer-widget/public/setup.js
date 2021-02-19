var body = document.getElementsByTagName('body')[0];

var host = '--public-url--';
var cssFiles = '--css-files--';
var jsFiles = '--js-files--';

window.sluginFiles = {
    css: cssFiles.map(f => `${host}/${f}`),
    js: jsFiles.map(f => `${host}/${f}`),
};

window.sluginFiles.js.forEach(file => {
    const s = document.createElement('script');
    s.setAttribute('src', file);

    body.appendChild(s);
});

window.addEventListener('load', () => {
    Slugin.render();
});
