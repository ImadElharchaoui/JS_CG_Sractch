export class SoundSystem {
    constructor() {
        this.sounds = []; 
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)(); // idont know why i will check it later
        this.playingSources = new Map();
    }

    async addSound(name, url) {
        try {
            // Fetch the audio file as an array buffer
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();

            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

            this.sounds.push({ name, audio: audioBuffer });
            console.log(`Sound ${name} added successfully!`);
        } catch (error) {
            console.error("Error loading or decoding audio:", error);
        }
    }

    playOnce(name) {
        const sound = this.sounds.find(s => s.name === name);
        if (!sound) {
            console.error(`Sound ${name} not found.`);
            return;
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = sound.audio;
        source.connect(this.audioContext.destination);
        source.start(0);
    }

    playLoop(name) {
        console.log(this.sounds)
        console.log("loop", name)
        const sound = this.sounds.find(s => s.name === name);
        if (!sound) {
            console.error(`Sound ${name} not found.`);
            return;
        }
        console.log("loop")
        const source = this.audioContext.createBufferSource();
        source.buffer = sound.audio;
        source.loop = true; 
        source.connect(this.audioContext.destination);
        source.start(0);


        this.playingSources.set(name, source);
    }

    stopSound(name) {

        const source = this.playingSources.get(name);
        if (source) {
            source.stop();
        } else {
            console.error(`Sound ${name} is not currently playing.`);
        }
    }
}
