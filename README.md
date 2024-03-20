

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# A list of methods you can use with audio

```bash
const audio = document.querySelector("audio");

audio.play(); // Starts playing the audio.

audio.pause(); // Pauses the audio.

audio.canPlayType("audio/mpeg"); // Returns a Boolean value indicating whether the browser can play MP3 audio.

audio.load(); // Loads the audio file.

audio.controls = true; // Displays the audio controls.

audio.loop = true; // Loops the audio.

audio.muted = true; // Mutes the audio.

audio.volume = 0.5; // Sets the audio volume to 50%.

audio.currentTime = 10; // Sets the current playback position to 10 seconds.

audio.duration; // Gets the duration of the audio file.
```