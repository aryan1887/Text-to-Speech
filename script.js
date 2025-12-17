let speech = new SpeechSynthesisUtterance(); //---SpeechSynthesisUtterance--- It is a built-in browser object that represents the text you want the computer to speak.

/* speech is now an object where you can set:
    speech.text → the text you want spoken
    speech.voice → the voice to speak in
    speech.rate → speed of speech
    speech.pitch → tone of the voice */

let voices = [];

const voiceSelect = document.querySelector("select");  // Select dropdown to choose voice

// Load voices
window.speechSynthesis.onvoiceschanged = () => {  //window.speechSynthesis.getVoices() → gets a list of all voices available in the browser.
    voices = window.speechSynthesis.getVoices();  //voices → stores this list.
    speech.voice = voices[0];   // default voice

    voices.forEach((voice, i) => {  //voices.forEach(...) → loops over all voices.
        const option = document.createElement("option");  // Creates an <option> element for each voice.
        option.value = i;  // Sets the value of the option to the index of the voice.
        option.textContent = voice.name + " (" + voice.lang + ")";  // Sets the text content of the option to the voice's name and language.
        voiceSelect.appendChild(option);  // Appends the option to the <select> element.
    });
};

// Change voice when user selects
voiceSelect.addEventListener("change", () => {  //voiceSelect → points to the <select> dropdown.  .addEventListener("change", ...) → listens for when the user selects a different voice.
    speech.voice = voices[voiceSelect.value]; //voiceSelect.value → gives the index of the voice selected (remember, we set option.value = i when filling the dropdown).
});

// Speak text
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;

    if (!speech.text.trim()) {
        alert("Write something in the textarea!");
        return;
    }

    window.speechSynthesis.speak(speech);
});
