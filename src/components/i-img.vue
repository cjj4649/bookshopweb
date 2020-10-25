<template>
    <div>
        <input id='file' type="file" @change="change($event)"/>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {}
  },
  methods: {
    change (event) {
      let form = new FormData()
      let file = document.getElementById('file').files[0]
      form.append('multipartFile', file, file.name)
      form.append('access_token', JSON.parse(sessionStorage.getItem('userinfo')).access_token)
      console.log(form)
      axios({
        method: 'post',
        url: 'http://a309200w30.goho.co/pc/picture/upload',
        data: form,
        headers: {
          'Content-Type': 'miltipt/form-data'
        }
      }).then(data => {
        console.log('data图片', data)
        console.log('data图片1', event)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// #file {
//   width: 120px;
//   height: 20px;
// }
</style>
