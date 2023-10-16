import { useState, useRef } from 'react'
import AWS from 'aws-sdk'

const BtnUpload = () => {
  const [imageFile, setImageFile]: any = useState(null)
  const [imageSrc, setImageSrc]: any = useState(null)
  const inputRef = useRef<any>(null)

  const onUpload = (e: any) => {
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()

    // 확장자 제한
    if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
      alert('jpg, png, jpg 파일만 업로드가 가능합니다.')
      return
    }

    // 파일 리더
    const reader = new FileReader()
    reader.readAsDataURL(file)

    // 파일 업로드
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        // 이미지 경로 선언
        setImageSrc(reader.result || null)
        // 이미지 파일 선언
        setImageFile(file)
        resolve()
      }
    })
  }

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
        Key: `upload/${imageFile.name}`,
        Body: imageFile,
      },
    })

    const response = await upload.promise()
  }

  return (
    <div>
      <input
        accept="image/*"
        multiple
        type="file"
        // ref={el => (inputRef.current[0] = el)}
        onChange={(e) => onUpload(e)}
      />
      <button
        type="button"
        onClick={() => {
          if (!imageSrc) {
            alert('이미지를 등록해 주세요.')
            return
          }

          const formData = new FormData()
          formData.append('file', imageFile)
          formData.append('name', imageFile.name)

          uploadS3(formData)
        }}
      >
        업로드!
      </button>
    </div>
  )
}

export default BtnUpload
