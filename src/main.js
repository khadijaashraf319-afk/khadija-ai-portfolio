import "../script.js";

import VapiModule from "@vapi-ai/web";

const Vapi = VapiModule.default;
const vapi = new Vapi("4081086e-d482-4756-9595-2c4ba0d281f9");

// =====================
// VAPI CONFIGURATION
// =====================

//const vapi = new Vapi("4081086e-d482-4756-9595-2c4ba0d281f9");

// =====================
// DOM ELEMENTS
// =====================

const startBtn = document.getElementById("startVoiceDemo");
const endBtn = document.getElementById("endVoiceDemo");

function setVoiceStatus(status) {
    const statusText = document.getElementById("statusText");
    const statusDot = document.querySelector(".status-dot");

    if (!statusText || !statusDot) return;

    switch (status) {
        case "ready":
            statusText.textContent = "Demo Available";
            statusDot.style.background = "#4ade80";
            break;

        case "connecting":
            statusText.textContent = "Connecting...";
            statusDot.style.background = "#fbbf24";
            break;

        case "talking":
            statusText.textContent = "Talking...";
            statusDot.style.background = "#3b82f6";
            break;

        case "ended":
            statusText.textContent = "Call Ended";
            statusDot.style.background = "#ef4444";
            break;
    }
}

// Initial state
setVoiceStatus("ready");

// =====================
// START CALL
// =====================

if (startBtn) {
    startBtn.addEventListener("click", async () => {
        try {
            setVoiceStatus("connecting");

            await vapi.start("24315963-71ed-4751-84d2-f0cc310b3ed9");

            startBtn.style.display = "none";
            endBtn.style.display = "inline-flex";

        } catch (err) {
            console.error("Vapi Start Error:", err);
            setVoiceStatus("ended");
        }
    });
}

// =====================
// END CALL
// =====================

if (endBtn) {
    endBtn.addEventListener("click", () => {
        vapi.stop();
    });
}

// =====================
// VAPI EVENTS
// =====================

vapi.on("call-start", () => {
    //console.log("Call Started");
    setVoiceStatus("talking");
});

vapi.on("call-end", () => {
    //console.log("Call Ended");

    setVoiceStatus("ready");

    if (startBtn) startBtn.style.display = "inline-flex";
    if (endBtn) endBtn.style.display = "none";
});

vapi.on("speech-start", () => {
    //console.log("User started speaking");
});

vapi.on("speech-end", () => {
    //console.log("User stopped speaking");
});

vapi.on("message", (message) => {
    console.log("Message:", message);
});

vapi.on("error", (error) => {
    console.error("Vapi Error:", error);

    setVoiceStatus("ended");

    if (startBtn) startBtn.style.display = "inline-flex";
    if (endBtn) endBtn.style.display = "none";
});