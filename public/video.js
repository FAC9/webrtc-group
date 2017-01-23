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

var directory = {
  // jen: sendMessage,
  // nori: sendMessage
};

var registerUser = function (from, callback) {
  if (Object.keys(directory).indexOf(from) === -1) {
    directory[from] = callback;
  }
}

onEventListenerOfSomeKind = registerUser("jen", sendMessage);
onEventListenerOfSomeKind = registerUser("nori", sendMessage);

var sendMessage = function (friend, connectionType, data) {
  if (directory.hasOwnProperty(friend)) {
    var target = directory[friend];

  }


  }

}



signalingChannel.onmessage = function (evt) {
   if (!pc)
       start(false);

   var signal = JSON.parse(evt.data);
   if (signal.sdp)
       pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
   else
       pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
};
