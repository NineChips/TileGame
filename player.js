
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor');
document.body.appendChild(cursorDot);


document.addEventListener('mousemove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
});

document.body.style.cursor = 'none'; 
