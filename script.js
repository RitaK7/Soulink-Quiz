
document.addEventListener("DOMContentLoaded", function () {
    const portraitOutput = document.getElementById("portrait-output");
    if (portraitOutput) {
        const params = new URLSearchParams(window.location.search);
        const language = params.get("language");
        const value = params.get("value");
        const dream = params.get("dream");

        if (language && value && dream) {
            portraitOutput.innerHTML = `
                <p><strong>Love Language:</strong> ${language}</p>
                <p><strong>Core Value:</strong> ${value}</p>
                <p><strong>Your Dream:</strong> ${dream}</p>
                <p><strong>Soul Portrait:</strong> You are a unique Soul who values ${value.toLowerCase()}, speaks in ${language.toLowerCase()}, and dreams of "${dream}". Let your path be guided by inner truth and divine connection.</p>
            `;
        } else {
            portraitOutput.innerHTML = "<p>Missing data for portrait. Please start from the beginning.</p>";
        }
    }
});
