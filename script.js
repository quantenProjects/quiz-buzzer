
var tens = 0;
var frag = window.location.hash.substr(1);
var timeout = 30;
if (! isNaN(parseInt(frag))) {
    timeout = parseInt(frag)*10;
}

function button(buttonid) {
    for (const element of document.getElementsByClassName("button")) {
        element.setAttribute("disabled", "disabled");
        element.style.opacity = "10%"
    }
    document.getElementById(buttonid).style.opacity = "100%"
    tens = timeout
    setTimeout(timer, 100)
}

function set_timer(time) {
    document.getElementById("timer").innerText = (time/10).toFixed(1) + " sec"

}

function timer() {
   if (tens <= 0) {
       buzzer()
   } else {
       tens -= 1;
       setTimeout(timer, 100)
       set_timer(tens)
   }
}


function buzzer() {
    beep(500, 440, 250)
    setTimeout(reset, 1000)
}


function reset() {
    for (const element of document.getElementsByClassName("button")) {
        element.removeAttribute("disabled");
        element.style.opacity = "100%"
    }
    set_timer(timeout)
}

set_timer(timeout)

// below from https://ourcodeworld.com/articles/read/1627/how-to-easily-generate-a-beep-notification-sound-with-javascript

// The browser will limit the number of concurrent audio contexts
// So be sure to re-use them whenever you can
const myAudioContext = new AudioContext();

/**
 * Helper function to emit a beep sound in the browser using the Web Audio API.
 * 
 * @param {number} duration - The duration of the beep sound in milliseconds.
 * @param {number} frequency - The frequency of the beep sound.
 * @param {number} volume - The volume of the beep sound.
 * 
 * @returns {Promise} - A promise that resolves when the beep sound is finished.
 */
function beep(duration, frequency, volume){
    return new Promise((resolve, reject) => {
        // Set default duration if not provided
        duration = duration || 200;
        frequency = frequency || 440;
        volume = volume || 100;

        try{
            let oscillatorNode = myAudioContext.createOscillator();
            let gainNode = myAudioContext.createGain();
            oscillatorNode.connect(gainNode);

            // Set the oscillator frequency in hertz
            oscillatorNode.frequency.value = frequency;

            // Set the type of oscillator
            oscillatorNode.type= "square";
            gainNode.connect(myAudioContext.destination);

            // Set the gain to the volume
            gainNode.gain.value = volume * 0.01;

            // Start audio with the desired duration
            oscillatorNode.start(myAudioContext.currentTime);
            oscillatorNode.stop(myAudioContext.currentTime + duration * 0.001);

            // Resolve the promise when the sound is finished
            oscillatorNode.onended = () => {
                resolve();
            };
        }catch(error){
            reject(error);
        }
    });
}
