document.addEventListener("DOMContentLoaded", () => {

  // === ELEMENTS ===
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play");
  const stopBtn = document.getElementById("stop");
  const replayBtn = document.getElementById("replay");
  const icon = document.getElementById("icon");
  const cover = document.querySelector(".cover");
  const progressBar = document.getElementById("progress-bar");
  const progress = document.getElementById("progress");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");

  if (!audio || !playBtn) {
    console.warn("Reproductor no inicializado: elementos no encontrados");
    return;
  }

  let isPlaying = false;

  // === PLAY / PAUSE ===
  playBtn.addEventListener("click", () => {
    if (!isPlaying) {
      audio.play();
      cover.classList.replace("cover", "play");
      icon.classList.replace("fa-play", "fa-pause");
      isPlaying = true;
    } else {
      audio.pause();
      cover.classList.replace("play", "cover");
      icon.classList.replace("fa-pause", "fa-play");
      isPlaying = false;
    }
  });

  // === STOP ===
  stopBtn.addEventListener("click", stopAudio);

  // === REPLAY -10s ===
  replayBtn.addEventListener("click", () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });

  // === TIME UPDATE ===
  audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
      progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(audio.duration);
    }
  });

  // === SEEK BAR ===
  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    audio.currentTime = (e.clientX - rect.left) / rect.width * audio.duration;
  });

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    icon.classList.replace("fa-pause", "fa-play");
    cover.classList.replace("play", "cover");
    progress.style.width = "0%";
    currentTimeEl.textContent = "0:00";
  }

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }

});
