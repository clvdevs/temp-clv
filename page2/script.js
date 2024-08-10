const socket = io('http://localhost:3001');

window.onload = () => {
    const codeMirror = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        mode: 'text/x-c++src', // Change to 'text/x-csrc' for C
        theme: 'default',
        lineNumbers: true
    });

    document.getElementById('run-code').addEventListener('click', () => {
        const code = codeMirror.getValue();
        const language = document.querySelector('input[name="language"]:checked').value; 
        if (!code) {
            alert('Please enter some code to run.');
            return;
        }
        socket.emit('code', { code, language });
    });

    socket.on('visualize', (data) => {
        visualizeCodeLogic(data);
    });

    socket.on('output', (output) => {
        document.getElementById('output-terminal').textContent = output;
    });

    socket.on('video', (videoUrl) => {
        const videoElement = document.getElementById('generated-video');
        videoElement.src = videoUrl;

        const downloadButton = document.getElementById('download-video');
        downloadButton.href = videoUrl;
        downloadButton.download = 'code-logic-video.mp4';
    });
};
