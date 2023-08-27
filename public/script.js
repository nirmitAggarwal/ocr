document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const uploadButton = document.getElementById('uploadButton');
    const outputText = document.getElementById('outputText');
    const readButton = document.getElementById('readButton');
    const searchButton = document.getElementById('searchButton');
    const copyButton = document.getElementById('copyButton');
  
    let recognizedText = '';
  
    uploadButton.addEventListener('click', async () => {
      const formData = new FormData();
      formData.append('image', imageInput.files[0]);
  
      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          recognizedText = await response.text();
          outputText.textContent = recognizedText;
          readButton.disabled = false;
          searchButton.disabled = false;
          copyButton.disabled = false;
        } else {
          console.error('Error processing image');
        }
      } catch (error) {
        console.error(error);
      }
    });
  
    readButton.addEventListener('click', () => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(recognizedText);
      synth.speak(utterance);
    });
  
    searchButton.addEventListener('click', () => {
      const searchText = encodeURIComponent(recognizedText);
      window.open(`https://www.google.com/search?q=${searchText}`);
    });
  
    copyButton.addEventListener('click', () => {
      const tempInput = document.createElement('textarea');
      tempInput.value = recognizedText;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    });
  });
  