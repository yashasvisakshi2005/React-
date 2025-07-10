let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener("load", () => {
    wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = true;

recognition.onresult = (event) => {
    console.log("Recognition result:", event.results);
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    console.log("Transcript:", transcript);
    console.log("Processed message:", transcript.toLowerCase().trim());
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase().trim());
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    speak("Sorry, I couldn't access the microphone. Please check permissions.");
    btn.style.display = "flex";
    voice.style.display = "none";
};

btn.addEventListener("click", () => {
    console.log("Starting recognition..."); // Debug
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    console.log("Command received:", message); 
    recognition.stop(); 
    btn.style.display = "flex";
    voice.style.display = "none";
    if (message.includes("hello") || message.includes("hey")) {
        speak("hello, how can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Yashasvi Sakshi");
    } else if (message.includes("open youtube") || message.includes("open you tube") || message.includes("youtube")) {
        speak("Opening YouTube...");
        let youtubeWindow = window.open("https://www.youtube.com/", "_blank");
        
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening an online calculator...");
        window.open("https://www.google.com/search?q=calculator", "_blank");
    } else if (message.includes("open gmail")) {
        speak("Opening Gmail...");
        window.open("https://mail.google.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "numeric" });
        speak(date);
    } else {
        speak(`This is what I found on the internet regarding ${message}`);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}