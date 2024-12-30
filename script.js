const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  console.log("Speech Recognition is supported!");

  // Initialize Speech Recognition
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US"; // Set language
  recognition.interimResults = false; // Only show final results
  recognition.continuous = true; // Keep listening for commands

  // Start listening
  recognition.start();

  recognition.onresult = (event) => {
    const speechToText = event.results[event.results.length - 1][0].transcript
      .toLowerCase()
      .trim();
    console.log("Command received:", speechToText);

    // Get all sections
    const sections = [...document.querySelectorAll("section, header")];
    let currentSectionIndex = sections.findIndex((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight;
    });

    // Handle scrolling commands
    if (speechToText.includes("go down")) {
      if (currentSectionIndex < sections.length - 1) {
        const nextSection = sections[currentSectionIndex + 1];
        nextSection.scrollIntoView({ behavior: "smooth" });
        console.log("Navigating to the next section.");
      }
    } else if (speechToText.includes("go up")) {
      if (currentSectionIndex > 0) {
        const prevSection = sections[currentSectionIndex - 1];
        prevSection.scrollIntoView({ behavior: "smooth" });
        console.log("Navigating to the previous section.");
      }
    } else {
      // Commands to navigate to specific sections
      const commands = [
        { trigger: "about", target: "#about" },
        { trigger: "skills", target: "#skills" },
        { trigger: "projects", target: "#projects" },
        { trigger: "contact", target: "#contact" },
        { trigger: "header", target: "header" },
        { trigger: "gmail", target: "a[href='mailto:ashutosh08yadav@gmail.com']" },
        { trigger: "github", target: "a[href='https://github.com/yourusername']" },
        { trigger: "linkedin", target: "a[href='https://linkedin.com/in/yourusername']" },
        { trigger: "phone", target: "a[href='tel:+918584891391']" },
        { trigger: "name", target: ".glowing-text" },
        { trigger: "iot", target: ".about-text" },
        { trigger: "portfolio", target: "header" },
        { trigger: "get in touch", target: "#contact" },
        // Add more commands as necessary
      ];

      commands.forEach((command) => {
        if (speechToText.includes(command.trigger)) {
          const element = document.querySelector(command.target);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            console.log(`Navigating to: ${command.trigger}`);
          }
        }
      });
    }

    // Restart recognition to continue listening
    recognition.start();
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    // Restart recognition in case of an error
    recognition.start();
  };

  recognition.onend = () => {
    // Restart recognition when it ends, to keep listening continuously
    recognition.start();
  };
} else {
  console.error("Speech Recognition is not supported in this browser.");
}

// Quote Typing and Deleting Animation
const quotes = [
  "Innovation is the ability to see change as an opportunity, not a threat.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Turning challenges into opportunities, one line of code at a time.",
  "The future belongs to those who code, create, and innovate.",
  "Technology is best when it brings people together."
];

let currentQuoteIndex = 0;
let currentText = '';
let typingSpeed = 100; // Speed at which text is typed
let deletingSpeed = 50; // Speed at which text is deleted
let pauseTime = 1500; // Pause time before deleting quote
let quoteTextElement = document.getElementById('quote-text');

function typeQuote() {
  let currentQuote = quotes[currentQuoteIndex];
  let index = currentText.length;
  
  if (index < currentQuote.length) {
    currentText += currentQuote.charAt(index);
    quoteTextElement.textContent = currentText;
    setTimeout(typeQuote, typingSpeed);
  } else {
    setTimeout(deleteQuote, pauseTime);
  }
}

function deleteQuote() {
  let index = currentText.length;
  
  if (index > 0) {
    currentText = currentText.slice(0, index - 1);
    quoteTextElement.textContent = currentText;
    setTimeout(deleteQuote, deletingSpeed);
  } else {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    setTimeout(typeQuote, typingSpeed);
  }
}

// Start the typing animation
typeQuote();
