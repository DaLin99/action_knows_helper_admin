/**
 * @author: xiaoqingb
 * @date: 2021/3/27 10:12 上午
 * @lastEditors: xiaoqingb
 * @lastEditTime: 2021/3/27 10:12 上午
 * @Description:
 */

const uploadImg = async(e, that, obj, key) => {
  const Bucket = 'xqbzheng-1300584219';
  const Region = 'ap-guangzhou';
  const SecretId = 'AKIDve9XfEyiRxubz9wmEb8PORElCNQGnw96';
  const SecretKey = 'qUtGw7tkMipjaCdbQZSs0zoPyHYbZOrb';
  // cdn已引入
  const cos = new COS({
    SecretId,
    SecretKey
  })
  cos.putObject({
    Bucket, /* 必须 */
    Region, /* 存储桶所在地域，必须字段 */
    Key: `image/${e.name}`, /* 必须 */
    StorageClass: 'STANDARD',
    Body: e.raw, // 上传文件对象
    onProgress: function(progressData) {
      console.log(JSON.stringify(progressData));
    }
  }, function(err, data) {
    if (data) {
      that.$set(that[obj], key, `https://${data.Location}`);
    }
  });
}

export default {
  uploadImg
}
