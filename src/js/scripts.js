import Compare from './modules/compare';

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

new Compare(document.querySelector('.compare'));
