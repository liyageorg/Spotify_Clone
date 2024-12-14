document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll('.songlistplay i');
    const progressBar = document.getElementById("myProgressbar");
    const playPauseBottomButton = document.querySelector('.bottom .fa-play-circle');
    let currentAudio = null;
    let currentButton = null;
    let isPlaying = false;
    let progressInterval = null; // Track progress interval

    // Function to update the progress bar
    function updateProgress() {
        if (currentAudio && currentAudio.duration) {
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.value = progress;
        }
    }

    // Event listener for range slider to seek through the audio
    progressBar.addEventListener('input', () => {
        if (currentAudio) {
            const seekTime = (progressBar.value / 100) * currentAudio.duration;
            currentAudio.currentTime = seekTime;
        }
    });

    // Function to play/pause the audio
    function toggleAudio(audio, button) {
        if (audio.paused) {
            audio.play();
            button.classList.replace('fa-play-circle', 'fa-pause-circle');
            isPlaying = true;
            progressInterval = setInterval(updateProgress, 100); // Start interval on play
        } else {
            audio.pause();
            button.classList.replace('fa-pause-circle', 'fa-play-circle');
            isPlaying = false;
            clearInterval(progressInterval); // Stop updating progress bar when paused
        }
    }

    // Event listener for the play buttons in the song list
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const songItem = button.closest('.songItem');
            const audio = songItem.querySelector('audio');

            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentButton) {
                    currentButton.classList.replace('fa-pause-circle', 'fa-play-circle');
                }
            }

            toggleAudio(audio, button);

            currentAudio = audio.paused ? null : audio;
            currentButton = audio.paused ? null : button;

            if (isPlaying) {
                playPauseBottomButton.classList.replace('fa-play-circle', 'fa-pause-circle');
            } else {
                playPauseBottomButton.classList.replace('fa-pause-circle', 'fa-play-circle');
            }
        });
    });

    // Event listener for the bottom play/pause button
    playPauseBottomButton.addEventListener('click', () => {
        if (currentAudio) {
            toggleAudio(currentAudio, currentButton);
            updateBottomButtonState();
        }
    });

    function updateBottomButtonState() {
        if (currentAudio && !currentAudio.paused) {
            playPauseBottomButton.classList.replace('fa-play-circle', 'fa-pause-circle');
        } else {
            playPauseBottomButton.classList.replace('fa-pause-circle', 'fa-play-circle');
        }
    }
});
