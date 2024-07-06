function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const gradient = `linear-gradient(to right, ${color1}, ${color2})`;
    document.getElementById('gradient-preview').style.background = gradient;
    document.getElementById('gradient-code').value = `background: ${gradient};`;
}

function copyToClipboard() {
    const copyText = document.getElementById('gradient-code');
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Copied to clipboard: ' + copyText.value);
}

document.getElementById('generate-btn').addEventListener('click', generateGradient);
document.getElementById('copy-btn').addEventListener('click', copyToClipboard);

generateGradient();
