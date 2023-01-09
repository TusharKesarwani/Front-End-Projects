"use strict";

var screenConstraints = { video: true, audio: true };
var micConstraints = { audio: true };

var shareBtn = document.querySelector("button#shareScreen");
var recBtn = document.querySelector("button#rec");
var stopBtn = document.querySelector("button#stop");

var videoElement = document.querySelector("video");
var dataElement = document.querySelector("#data");
var downloadLink = document.querySelector("a#downloadLink");

videoElement.controls = false;

var mediaRecorder;
var chunks = [];
var count = 0;
var localStream = null;
var micNumber = 0;

function onShareScreen() {
  if (!navigator.mediaDevices.getDisplayMedia) {
    alert("navigator.mediaDevices.getDisplayMedia not supported on your browser, use the latest version of Chrome");
  } else {
    if (window.MediaRecorder == undefined) {
      alert("MediaRecorder not supported on your browser, use the latest version of Firefox or Chrome");
    } else {
      navigator.mediaDevices.getDisplayMedia(screenConstraints).then(function(screenStream) {
        //check if there's a microphone
        navigator.mediaDevices.enumerateDevices().then(function(devices) {
          devices.forEach(function(device) {
            if (device.kind == "audioinput") {
              micNumber++;
            }
          });

          if (micNumber == 0) {
            //no audio inputs present on device/pc
            onCombinedStreamAvailable(screenStream);
          } else {
            //audio inputs present, let's get access
            navigator.mediaDevices.getUserMedia(micConstraints).then(function(micStream) {

              //create a new stream in which to pack everything together
              var composedStream = new MediaStream();

              //add the screen video stream
              screenStream.getVideoTracks().forEach(function(videoTrack) {
                composedStream.addTrack(videoTrack);
              });

              //if system audio has been shared
              if (screenStream.getAudioTracks().length > 0) {
                //merge the system audio with the mic audio
                var context = new AudioContext();
                var audioDestination = context.createMediaStreamDestination();

                const systemSource = context.createMediaStreamSource(screenStream);
                const systemGain = context.createGain();
                systemGain.gain.value = 1.0;
                systemSource.connect(systemGain).connect(audioDestination);
                console.log("added system audio");

                if (micStream && micStream.getAudioTracks().length > 0) {
                  const micSource = context.createMediaStreamSource(micStream);
                  const micGain = context.createGain();
                  micGain.gain.value = 1.0;
                  micSource.connect(micGain).connect(audioDestination);
                  console.log(" added mic audio");
                }

                audioDestination.stream.getAudioTracks().forEach(function(audioTrack) {
                  composedStream.addTrack(audioTrack);
                });
              } else {
                //add just the mic audio
                micStream.getAudioTracks().forEach(function(micTrack) {
                  composedStream.addTrack(micTrack);
                });
              }

              onCombinedStreamAvailable(composedStream);

            })
              .catch(function(err) {
              log("navigator.getUserMedia error: " + err);
            });
          }
        })
          .catch(function(err) {
          log(err.name + ": " + err.message);
        });
      })
        .catch(function(err) {
        log("navigator.getDisplayMedia error: " + err);
      });
    }
  }
}

function onCombinedStreamAvailable(stream) {
  localStream = stream;
  localStream.getTracks().forEach(function(track) {
    if (track.kind == "audio") {
      track.onended = function(event) {
        log("audio track.onended Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
      };
    }
    if (track.kind == "video") {
      track.onended = function(event) {
        log("video track.onended Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
      };
    }
  });

  videoElement.srcObject = localStream;
  videoElement.play();
  videoElement.muted = true;
  recBtn.disabled = false;
  shareBtn.disabled = true;

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new AudioContext();
  } catch (e) {
    log("Web Audio API not supported.");
  }
}

function onBtnRecordClicked() {
  if (localStream == null) {
    alert("Could not get local stream from mic/camera");
  } else {
    recBtn.disabled = true;
    stopBtn.disabled = false;

    
    log("Start recording...");
    if (typeof MediaRecorder.isTypeSupported == "function") {
      if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
        var options = { mimeType: "video/webm;codecs=vp9" };
      } else if (MediaRecorder.isTypeSupported("video/webm;codecs=h264")) {
        var options = { mimeType: "video/webm;codecs=h264" };
      } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
        var options = { mimeType: "video/webm;codecs=vp8" };
      }
      log("Using " + options.mimeType);
      mediaRecorder = new MediaRecorder(localStream, options);
    } else {
      log("isTypeSupported is not supported, using default codecs for browser");
      mediaRecorder = new MediaRecorder(localStream);
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    };

    mediaRecorder.onerror = function(e) {
      log("mediaRecorder.onerror: " + e);
    };

    mediaRecorder.onstart = function() {
      log("mediaRecorder.onstart, mediaRecorder.state = " + mediaRecorder.state);

      localStream.getTracks().forEach(function(track) {
        if (track.kind == "audio") {
          log("onstart - Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
        }
        if (track.kind == "video") {
          log("onstart - Video track.readyState=" + track.readyState + ", track.muted=" + track.muted);
        }
      });
    };

    mediaRecorder.onstop = function() {
      log("mediaRecorder.onstop, mediaRecorder.state = " + mediaRecorder.state);

      var blob = new Blob(chunks, { type: "video/webm" });
      chunks = [];

      var videoURL = window.URL.createObjectURL(blob);

      downloadLink.href = videoURL;
      videoElement.src = videoURL;
      downloadLink.innerHTML = "Download video file";

      var rand = Math.floor(Math.random() * 10000000);
      var name = "video_" + rand + ".webm";

      downloadLink.setAttribute("download", name);
      downloadLink.setAttribute("name", name);
    };

    mediaRecorder.onwarning = function(e) {
      log("mediaRecorder.onwarning: " + e);
    };

    mediaRecorder.start(10);

    localStream.getTracks().forEach(function(track) {
      log(track.kind + ":" + JSON.stringify(track.getSettings()));
      console.log(track.getSettings());
    });
  }
}

function onBtnStopClicked() {
  mediaRecorder.stop();
  videoElement.controls = true;
  recBtn.disabled = false;
  stopBtn.disabled = true;
}

function onStateClicked() {
  if (mediaRecorder != null && localStream != null) {
    log("mediaRecorder.state=" + mediaRecorder.state);
    log("mediaRecorder.mimeType=" + mediaRecorder.mimeType);
    log("mediaRecorder.videoBitsPerSecond=" + mediaRecorder.videoBitsPerSecond);
    log("mediaRecorder.audioBitsPerSecond=" + mediaRecorder.audioBitsPerSecond);

    localStream.getTracks().forEach(function(track) {
      if (track.kind == "audio") {
        log("Audio: track.readyState=" + track.readyState + ", track.muted=" + track.muted);
      }
      if (track.kind == "video") {
        log("Video: track.readyState=" + track.readyState + ", track.muted=" + track.muted);
      }
    });
  }
}

function log(message) {
  dataElement.innerHTML = dataElement.innerHTML + "<br>" + message;
  console.log(message);
}