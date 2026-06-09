document.addEventListener("DOMContentLoaded", () => {
    initAudioReader();
    initPixCopier();
});

function initAudioReader() {
    const btnAudio = document.getElementById("btn-audio");
    if (!btnAudio) return;

    let isPlaying = false;
    const synth = window.speechSynthesis;
    let utterance = null;

    btnAudio.addEventListener("click", () => {
        if (isPlaying) {
            synth.cancel();
            updateButtonState(false);
        } else {
            const textTargets = document.querySelectorAll(".read-target");
            let textToRead = "";

            textTargets.forEach((element) => {
                textToRead += (element.textContent || "") + ". ";
            });

            if (textToRead.trim().length === 0) return;

            utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = "pt-BR";
            utterance.rate = 1.0;

            utterance.onend = () => { updateButtonState(false); };
            utterance.onerror = () => { updateButtonState(false); };

            synth.speak(utterance);
            updateButtonState(true);
        }
    });

    function updateButtonState(playing) {
        isPlaying = playing;
        const icon = btnAudio.querySelector("i");
        const span = btnAudio.querySelector("span");

        if (playing) {
            if (icon) icon.className = "fa-solid fa-square-stop";
            if (span) span.textContent = "Parar Leitura";
            btnAudio.classList.add("playing");
        } else {
            if (icon) icon.className = "fa-solid fa-volume-high";
            if (span) span.textContent = "Ouvir Página";
            btnAudio.classList.remove("playing");
        }
    }
}

function initPixCopier() {
    const btnCopiar = document.getElementById("btn-copiar-pix");
    const chaveElement = document.getElementById("pix-chave");

    if (!btnCopiar || !chaveElement) return;

    btnCopiar.addEventListener("click", () => {
        const chavePix = chaveElement.textContent || "";
        
        navigator.clipboard.writeText(chavePix).then(() => {
            const textoOriginal = btnCopiar.textContent;
            btnCopiar.textContent = "Chave Copiada! ✓";
            btnCopiar.style.backgroundColor = "#16a34a";

            setTimeout(() => {
                btnCopiar.textContent = textoOriginal;
                btnCopiar.style.backgroundColor = "";
            }, 2000);
        }).catch(err => {
            console.error("Erro ao copiar chave: ", err);
        });
    });
}