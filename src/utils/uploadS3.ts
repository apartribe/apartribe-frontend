import AWS from 'aws-sdk'

const uploadS3 = async (formData: any) => {
  const REGION = process.env.REACT_APP_REGION
  const ACESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID
  const SECRET_ACESS_KEY_ID = process.env.REACT_APP_SECRET_ACCESS_KEY_ID

  AWS.config.update({
    region: REGION,
    accessKeyId: ACESS_KEY_ID,
    secretAccessKey: SECRET_ACESS_KEY_ID,
  })

  const upload = new AWS.S3.ManagedUpload({
    params: {
      ACL: 'public-read',
      Bucket: 'apartribe-image',
      Key: `upload/${formData.name}`,
      Body: formData,
    },
  })

  const response = await upload.promise()
  return response
}

export default uploadS3
