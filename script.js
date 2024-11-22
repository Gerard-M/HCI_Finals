document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchInput = document.querySelector('.search-bar input');
    const searchBar = document.querySelector('.search-bar');
    const menuIcon = document.querySelector('.menu-icon');
    const voiceSearch = document.querySelector('.voice-search');
    const customizationButton = document.querySelector('.customization-button a');
    
    // Setup suggestions
    const suggestions = document.createElement('div');
    suggestions.className = 'suggestions';
    searchBar.appendChild(suggestions);
    const suggestionList = ['appointment', 'customize', 'contact', 'services', 'about us'];

    // Event Listeners
    setupKeyboardShortcuts();
    setupSearchFunctionality();
    setupSuggestions();
    setupMenuIcon();
    setupVoiceSearch();
    setupCustomizationButton();

    // Load customization settings on init
    loadCustomizationSettings();

    // Event Handler Functions
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === 'm') {
                event.preventDefault();
                startVoiceRecognition();
            } else if (event.ctrlKey && event.key === 'b') {
                window.location.href = 'booking.html';
            }
        });
    }

    

    function setupSearchFunctionality() {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                alert('Searching for: ' + this.value);
            }
        });
    }

    function setupSuggestions() {
        searchInput.addEventListener('input', function() {
            const input = searchInput.value.toLowerCase();
            suggestions.innerHTML = '';

            if (input) {
                const filteredSuggestions = suggestionList.filter(item => 
                    item.toLowerCase().includes(input)
                );
                filteredSuggestions.forEach(suggestion => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.textContent = suggestion;
                    suggestionItem.addEventListener('click', function() {
                        searchInput.value = suggestion;
                        suggestions.innerHTML = '';
                    });
                    suggestions.appendChild(suggestionItem);
                });
            }
        });
    }

    function setupCustomizationButton() {
        customizationButton.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'var(--secondary-color)';
        });
        customizationButton.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#000';
        });
    }

    function loadCustomizationSettings() {
        const primaryColor = localStorage.getItem('primaryColor') || '#ffffff'; // Default white
        const secondaryColor = localStorage.getItem('secondaryColor') || '#000000'; // Default black
        const fontSize = localStorage.getItem('fontSize') || '16'; // Default 16px

        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor); 
        document.documentElement.style.setProperty('--font-size', fontSize + 'px');
    }

    function setupVoiceSearch() {
        voiceSearch.addEventListener('click', function() {
            startVoiceRecognition();
        });
    }

    function startVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            
            recognition.onstart = () => voiceSearch.textContent = 'Listening... 🎤';
            
            recognition.onresult = function(event) {
                const result = event.results[0][0].transcript;
                searchInput.value = result;
                voiceSearch.textContent = 'Ctrl + M 🎤';
            };
            
            recognition.onerror = () => {
                voiceSearch.textContent = 'Ctrl + M 🎤';
                alert('Speech recognition error occurred');
            };
            
            recognition.onend = () => voiceSearch.textContent = 'Ctrl + M 🎤';
            
            recognition.start();
        } else {
            alert('Speech recognition is not supported in this browser');
        }
    }
});
