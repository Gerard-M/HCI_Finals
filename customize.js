document.addEventListener('DOMContentLoaded', function() {
    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    const fontSizeInput = document.getElementById('font-size');
    const fontSizeValue = document.getElementById('font-size-value');
    const previewContent = document.querySelector('.preview-content');
    const form = document.getElementById('customizeForm');

    function updatePreview() {
        const primaryColor = primaryColorInput.value;
        const secondaryColor = secondaryColorInput.value;
        const fontSize = fontSizeInput.value;

        // Only update preview content
        previewContent.style.backgroundColor = primaryColor;
        previewContent.style.color = secondaryColor;
        previewContent.querySelector('h1').style.color = secondaryColor;
        previewContent.querySelector('.preview-button').style.backgroundColor = secondaryColor;
        previewContent.querySelector('.preview-button').style.color = primaryColor;
        previewContent.style.fontSize = `${fontSize}px`;

        fontSizeValue.textContent = `${fontSize}px`;
    }

    function applyChanges() {
        const primaryColor = primaryColorInput.value;
        const secondaryColor = secondaryColorInput.value;
        const fontSize = fontSizeInput.value;

        // Update CSS variables to affect whole page
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    }

    primaryColorInput.addEventListener('input', updatePreview);
    secondaryColorInput.addEventListener('input', updatePreview);
    fontSizeInput.addEventListener('input', updatePreview);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        applyChanges();
        alert('Changes applied successfully!');
    });

    // Initial preview update
    updatePreview();
});