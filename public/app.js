(function () {
  var options = {
    video: {width: 1280, height: 720},
    audio: true
  };

  navigator.mediaDevices.getUserMedia(options).then( function(avStream) {
    var videoId = 1;
    var video = document.getElementById("video-display-"+videoId);
    video.srcObject = avStream;
    video.onloadedmetadata = function(e) {
        video.play();
    }
  }).catch(function(err) {
      console.log(err.name + ": " + err.message);
  });

  // Create an endpoints database
  var endpoints = {};
  // Create a listener callback
  // When targeting across browsers, you have no access to the other broswer's DOM

  var listenerCb = function(userId, to, message) {
    switch (to.data) {
      case "NEW_CALL": console.log("yay");// peerToPeerConnection
      break;
      default: console.log(":(")
      break;

    }
  }
  // Create a signalling channel
  var signallingChannel = {
    registerUser: function(userId, userInfo, listenerCb) {
      endpoints[userId] = {
        name: userInfo.name,
        data: userInfo.data || {},
        cb: listenerCb
      }
      registerUser(userId, {name: userId, data: "NEW_CALL"}, cb)
    },
    // to be implemented properly!!!
    send: function(from, to, message) {
      if (endpoints[to]) {
        endpoints[to].cb(from, endpoints[to], message);
      }
      else {
        console.log("user not found ", to);
      }
    }
  }
  // Register all users
  signallingChannel.registerUser("user1", {name: "Marina", data: "NEW_CALL"}, listenerCb);
  signallingChannel.registerUser("user2", {name: "Will", data: "NEW_CALL"}, listenerCb);
  signallingChannel.registerUser("user3", {name: "Nick", data: "BUSY"}, listenerCb);
  signallingChannel.registerUser("user4", {name: "Marko"}, listenerCb);
  // Setup event listeners for all users
  document.querySelector('.call-btn-user1').addEventListener('click', function() {
    var target = document.getElementById("user1"+"-dropdown").value;
    // var newPar = document.createElement("p");
    // newPar.innerHTML = "From " + userId + " " + message;
    // document.getElementById("user"+target).appendChild(newPar);
    signallingChannel.send('user1', "user"+target, 'hello world')
  });
  document.querySelector('.call-btn-user2').addEventListener('click', function() {
    signallingChannel.send('user2','hello world')
  });
  document.querySelector('.call-btn-user3').addEventListener('click', function() {
    signallingChannel.send('user3','hello world')
  });
  document.querySelector('.call-btn-user4').addEventListener('click', function() {
    signallingChannel.send('user4','hello world')
  });
})();
