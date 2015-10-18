// variables
var leftchannel = [];
var rightchannel = [];
var recorder = null;
var recording = false;
var recordingLength = 0;
var volume = null;
var audioInput = null;
var sampleRate = null;
var audioContext = null;
var context = null;
var outputString;
var fd = new FormData();
var titleBlop = null;
var articleBlop = null;

// feature detection 
if (!navigator.getUserMedia)
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia){
        navigator.getUserMedia({audio:true}, success, function(e) {
            alert('Error capturing audio.');
        });
    } else alert('getUserMedia not supported in this browser.');

// Disable stop button in the beginning
$(document).ready(function() {
    $("#titleStop").prop('disabled', true);
    $("#articleStop").prop('disabled', true);
});

// Start recording title
$(document).on("click", "#titleMic", function() {
    var _this = $("#titleMic img");
    var current = _this.attr("src");
    var swap = _this.attr("data-swap");
    _this.attr("src", swap).attr("data-swap", current);

    if (/pause/i.test(current)) {
        recording = false;
        $("#titleStop").prop('disabled', false);
        $("button").prop('disabled', false);
    } else if (/Ready/i.test($('#titleFlag').text())) {
        recording = true;
        // reset the buffers for the new recording
        leftchannel.length = rightchannel.length = 0;
        recordingLength = 0;
        $('#titleFlag').text('Recording now...');
        $("button").prop('disabled', true);
        $(this).prop('disabled', false);
    } else {
        recording = true;
        $("button").prop('disabled', true);
        $(this).prop('disabled', false);
    }
});

// Start recording article
$(document).on("click", "#articleMic", function() {

    var _this = $("#articleMic img");
    var current = _this.attr("src");
    var swap = _this.attr("data-swap");
    _this.attr("src", swap).attr("data-swap", current);

    if (/pause/i.test(current)) {
        recording = false;
        $("#articleStop").prop('disabled', false);
        $("button").prop('disabled', false);
    } else if (/Ready/i.test($('#articleFlag').text())) {
        recording = true;
        // reset the buffers for the new recording
        leftchannel.length = rightchannel.length = 0;
        recordingLength = 0;
        $('#articleFlag').text('Recording now...');
        $("button").prop('disabled', true);
        $(this).prop('disabled', false);
    } else {
        recording = true;
        $("button").prop('disabled', true);
        $(this).prop('disabled', false);
    }
});         

// Click to stop recording title
$(document).on("click", "#titleStop", function() {
    $("#titleMic").prop('disabled', true);
    $("#titleStop").prop('disabled', true);
    // we stop recording
    recording = false;

    $('#titleFlag').text('Building mp3 file...');

    // we flat the left and right channels down
    var leftBuffer = mergeBuffers ( leftchannel, recordingLength );
    var rightBuffer = mergeBuffers ( rightchannel, recordingLength );
    // we interleave both channels together
    var interleaved = interleave ( leftBuffer, rightBuffer );

    // we create our wav file
    var buffer = new ArrayBuffer(44 + interleaved.length * 2);
    var view = new DataView(buffer);

    // RIFF chunk descriptor
    writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 44 + interleaved.length * 2, true);
    writeUTFBytes(view, 8, 'WAVE');
    // FMT sub-chunk
    writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    // stereo (2 channels)
    view.setUint16(22, 2, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 4, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    // data sub-chunk
    writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);

    // write the PCM samples
    var lng = interleaved.length;
    var index = 44;
    var volume = 1;
    for (var i = 0; i < lng; i++){
        view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
        index += 2;
    }
    // our final binary blob
    titleBlop = new Blob ( [ view ], { type : 'audio/mp3' } );

    // let's save it locally
    $('#titleFlag').text('Handing off the file now...');
});

// Click to stop recording article
$(document).on("click", "#articleStop", function() {
    $("#articleMic").prop('disabled', true);
    $("#articleStop").prop('disabled', true);
    // we stop recording
    recording = false;

    $('#articleFlag').text('Building mp3 file...');

    // we flat the left and right channels down
    var leftBuffer = mergeBuffers ( leftchannel, recordingLength );
    var rightBuffer = mergeBuffers ( rightchannel, recordingLength );
    // we interleave both channels together
    var interleaved = interleave ( leftBuffer, rightBuffer );

    // we create our wav file
    var buffer = new ArrayBuffer(44 + interleaved.length * 2);
    var view = new DataView(buffer);

    // RIFF chunk descriptor
    writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 44 + interleaved.length * 2, true);
    writeUTFBytes(view, 8, 'WAVE');
    // FMT sub-chunk
    writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    // stereo (2 channels)
    view.setUint16(22, 2, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 4, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    // data sub-chunk
    writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);

    // write the PCM samples
    var lng = interleaved.length;
    var index = 44;
    var volume = 1;
    for (var i = 0; i < lng; i++){
        view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
        index += 2;
    }
    // our final binary blob
    articleBlop = new Blob ( [ view ], { type : 'audio/mp3' } );

    // let's save it locally
    $('#articleFlag').text('Handing off the file now...');
});

$(document).on("click", "#titleReset", function() {
    $("#titleMic").prop('disabled', false);
    $("#titleStop").prop('disabled', false);
    titleBlop = null;
    leftchannel.length = rightchannel.length = 0;
    recordingLength = 0;
});

$(document).on("click", "#articleReset", function() {
    $("#articleMic").prop('disabled', false);
    $("#articleStop").prop('disabled', false);
    articleBlop = null;
    leftchannel.length = rightchannel.length = 0;
    recordingLength = 0;
});

$(document).on("click", "#upload", function() {
    fd.append("titleFile", titleBlop);
    fd.append("articleFile", articleBlop);
    var cate = $('#category').val();
    fd.append("category", cate);

    $.ajax({
        type: 'POST',
        url: 'http://ec2-52-89-34-199.us-west-2.compute.amazonaws.com/webservice_final.php',
        data: fd,
        processData: false,
        contentType: false
    }).done(function(data) {
        console.log(data);
    });
});

function interleave(leftChannel, rightChannel){
    var length = leftChannel.length + rightChannel.length;
    var result = new Float32Array(length);

    var inputIndex = 0;

    for (var index = 0; index < length; ){
        result[index++] = leftChannel[inputIndex];
        result[index++] = rightChannel[inputIndex];
        inputIndex++;
    }
    return result;
}

function mergeBuffers(channelBuffer, recordingLength){
    var result = new Float32Array(recordingLength);
    var offset = 0;
    var lng = channelBuffer.length;
    for (var i = 0; i < lng; i++){
        var buffer = channelBuffer[i];
        result.set(buffer, offset);
        offset += buffer.length;
    }
    return result;
}

function writeUTFBytes(view, offset, string){ 
    var lng = string.length;
    for (var i = 0; i < lng; i++){
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

function success(e){
    // creates the audio context
    audioContext = window.AudioContext || window.webkitAudioContext;
    context = new audioContext();

    // we query the context sample rate (varies depending on platforms)
    sampleRate = context.sampleRate;

    console.log('succcess');

    // creates a gain node
    volume = context.createGain();

    // creates an audio node from the microphone incoming stream
    audioInput = context.createMediaStreamSource(e);

    // connect the stream to the gain node
    audioInput.connect(volume);

    /* From the spec: This value controls how frequently the audioprocess event is 
       dispatched and how many sample-frames need to be processed each call. 
       Lower values for buffer size will result in a lower (better) latency. 
       Higher values will be necessary to avoid audio breakup and glitches */
    var bufferSize = 2048;
    recorder = context.createScriptProcessor(bufferSize, 2, 2);

    recorder.onaudioprocess = function(e){
        if (!recording) return;
        var left = e.inputBuffer.getChannelData (0);
        var right = e.inputBuffer.getChannelData (1);
        // we clone the samples
        leftchannel.push (new Float32Array (left));
        rightchannel.push (new Float32Array (right));
        recordingLength += bufferSize;
        console.log('recording');
    }

    // we connect the recorder
    volume.connect (recorder);
    recorder.connect (context.destination); 
}
