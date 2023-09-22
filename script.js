document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const uploadButton = document.getElementById('uploadButton');
    const uploadedImage = document.getElementById('uploadedImage');
    let isImageUploaded = false;
    let isEnlightened = false;

    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                uploadedImage.src = reader.result;
                isImageUploaded = true;
                isEnlightened = false;
            };
            reader.readAsDataURL(file);
        }
    });

    uploadButton.addEventListener('click', () => {
        if (isImageUploaded && !isEnlightened) {
            adjustBrightness(uploadedImage);
            isEnlightened = true;
        } else if (!isImageUploaded) {
            alert('请先选择并上传一张图片。');
        }
    });

    function adjustBrightness(image) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            // 增加亮度，可以根据需要调整增加的值
            data[i] += 90; // 红色通道
            data[i + 1] += 90; // 绿色通道
            data[i + 2] += 90; // 蓝色通道
        }

        ctx.putImageData(imageData, 0, 0);
        uploadedImage.src = canvas.toDataURL();
    }
});
