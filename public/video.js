var promise = navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
});
/*promise.then((avStream) => {
  // Find my video tag…
  video = document.createElement('video');
  attachMediaStream(video, avStream);
  video.play();
  // Add video tag to DOM
  videoContainer.append(video);
}).catch(() => {});*/
promise.then((avStream) => {
   video = document.getElementsByClassName('video')[0];
    video.srcObject = avStream;
    video.play();
   });
