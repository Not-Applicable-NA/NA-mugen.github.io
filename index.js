window.onload = function(){
    const loadelem = document.querySelector('#loading');
    loadelem.setAttribute('class', 'loadscr-fadeout');
    loadelem.addEventListener('animationend', () => {
        loadelem.remove();
    });
}