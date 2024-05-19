export default function uploadFile(file) {
  const splittedName = file.originalname.split('.')
  const format = splittedName[splittedName.length - 1]
  const filePath = `./public/uploads/${
    file.fieldname + '-' + Date.now()
  }.${format}`
  try {
    file.mv(filePath, (err) => {
      if (err) {
        return {
          message: 'No se pudo subir el archivo'
        }
      }
    })
    return {
      ok: true,
      pdf: filePath.split('./')[1].split('public')[1]
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'No se pudo subir el archivo'
    }
  }
}
