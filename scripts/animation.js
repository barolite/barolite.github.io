document.addEventListener("DOMContentLoaded", () => {
  const colors = [
    'var(--rosewater)',
    'var(--flamingo)',
    'var(--pink)',
    'var(--mauve)',
    'var(--red)',
    'var(--maroon)',
    'var(--peach)',
    'var(--yellow)',
    'var(--green)',
    'var(--teal)',
    'var(--sky)',
    'var(--sapphire)',
    'var(--blue)',
    'var(--lavender)',
    'var(--text)',
    'var(--surface1)',
    'var(--surface1)'
  ];

  const p2 = document.getElementById('p2');

  function setRandomColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    p2.style.setProperty('--g2', `conic-gradient(at 12.5% 62.5%,#0000 75%,${randomColor} 0)`);
  }

  setRandomColor();
  setInterval(setRandomColor, 2000);
});