<template>
  <div class="photo">
    <div class="photo-content" @click="uploadPhoto">
      <img id="upload-img" src="" alt="" />
    </div>
    <input id="upload-input" type="file" accept="image/*" @change="loadImg" />
  </div>
</template>
<script>
export default {
  name: 'UploadPhoto',
  methods: {
    uploadPhoto() {
      const upload = document.querySelector('#upload-input')
      upload.click()
    },
    loadImg() {
      const imgFile = document.querySelector('#upload-input')?.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(imgFile)
      reader.onload = function() {
        const img = document.querySelector('#upload-img')
        img.setAttribute("src", reader.result)
        img.style.width = '26mm'
        img.style.height = '32mm'
        img.style['object-fit'] = 'cover'
      }
    },
  }
};
</script>
<style scoped lang="scss">
.photo {
  display: flex;
  justify-content: center;
  margin: 10px;
  .photo-content {
    width: 26mm;
    height: 32mm;
    border: dashed 1px grey;
    border-radius: 4px;
    cursor: pointer;
  }
  #upload-input {
    display: none;
  }
}
</style>
