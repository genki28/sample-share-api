const toBlob = (base64) => {
  const decodedData = atob(base64.replace(/^.*,/, ''));
  const buffers = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; i++) {
    buffers[i] = decodedData.charCodeAt(i);
  }
  try {
    const blob = new Blob([buffers.buffer], {
      type: 'image/png',
    });
    return blob;
  } catch (e) {
    return null;
  }
}

window.onload = function () {
  html2canvas(document.getElementById("capture")).then(canvas => {
    const img = canvas.toDataURL("image/png")
    console.log(img, 'img')
    document.getElementById('download').href = img;
  })

  const shareButton = document.getElementById('share');
  shareButton.addEventListener('click', async () => {
    html2canvas(document.getElementById("capture")).then(canvas => {
      const img = canvas.toDataURL("image/png")
      const blob = toBlob(img);
      const imageFile = new File([blob], 'image.png', { type: 'image/png' })

      const shareData = {
        title: '共有のテストするよ',
        text: 'This is the image you wanted to share',
        url: '',
        files: [imageFile],
      };
      navigator.share(shareData).then(() => {}).catch(e => console.error(e))
    })
  });
}
