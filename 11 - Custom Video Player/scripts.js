const player = document.querySelector('.player');//sabse pehle pure player ko select kar liya then uske ek ek element ko select kiya 
const toggle = player.querySelector(".toggle");
const video = player.querySelector('.viewer');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');//ye attribute se element uthaya hai 
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

function togglePlay(e) {
    // console.log(video.play==true)
    // if (video.play===true) { video.pause();}//ye chal kyo nhi raha 
    // else {video.play();}
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;//toggle name se jo button banaya tha uske andar ke text ko update kar raha hu 
}

function handleProgress() {
    const percent = 100 * (video.currentTime / video.duration);
    progressBar.style.flexBasis = `${percent}%`;    
}

function handleRangeUpdate() {
    video[this.name] = this.value;//this.name gives the name of the element by whom this event is fired and here name of the element is volume and playbackRate which is the name of property of video this .value gives the input value 
    // const a=this.name; video.a=this .value;//alternative option ye bhi kaam nhi kar raha ?
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);//same dataset(html) mai humne custom daal di and usko integer mai convert karke use kiya
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener('timeupdate', handleProgress);//The timeupdate event is triggered when the playback position of a media element, such as an <audio> or <video> element, changes as part of its normal playback. It fires continuously as the media plays, typically multiple times per second, updating the playback position.
ranges.forEach((range) => {
    // range.addEventListener('mousemove', handleRangeUpdate);//in CSS hover and in javascript mousemove 
    range.addEventListener('change', handleRangeUpdate);//The change event is a JavaScript event that is triggered when the value of an input, select, or textarea element has been changed by the user.
})
ranges.forEach(range=>{range.addEventListener('mousemove', handleRangeUpdate)})
skipButtons.forEach((button)=>{    button.addEventListener("click", skip);})
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));//mousedown is triggered when the mouse button is pressed down.
progress.addEventListener('mousedown', () => mousedown = true);//mousemove is triggered when the mouse is moved.
progress.addEventListener('mouseup', () => mousedown = false);//mouseup is triggered when the mouse button is released.

