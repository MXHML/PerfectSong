/* Storage for variables and generic functions */
loggedIn = false
const cmd_send = document.getElementById("cmd-send")

  function generateRandomString(len) {
    const possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    const values = crypto.getRandomValues(new Uint8Array(length))
    return values.reduce((acc, x) => acc + possible[x % possible.length], "")
}
async function typeWriter(target,speed,finalText){
    $(`#${target}`).text("")
    target=document.getElementById(`${target}`)
    for(let x=0;x<finalText.length;x++){
        target.innerHTML+=finalText.charAt(x)
        await sleep(speed)
    }
}
//Native sleep function !?!?!?!?!? (Code from https://www.sitepoint.com/delay-sleep-pause-wait/)
//Yes, I could've just used setTimeout(), but this allows me to use it inside an async function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  var Key =
  {
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      ESC: 27,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      HELP: 47,
      H: 72,
      K: 75,
      N: 78,
      R: 82,
      NUMERIC_PLUS: 107,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      PLUS: 187,
      MINUS: 189,
      V: 86
  }