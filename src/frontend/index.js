import './stylesheets/style.css';
import closeIcon from './assets/closeIcon.svg';

const $img = document.createElement('img');
$img.src = closeIcon;
document.querySelector('body').appendChild($img);
