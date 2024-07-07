const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/api/v1/warga', (req, res) => {
  const sql = "SELECT * FROM warga"
  
  db.query(sql, (err, result) => {
    if (err) throw err
        response(200,result, "Menampilkan seluruh data Warga RW 02", res)
    })
})

app.get('/api/v1/warga/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM warga WHERE id = ${req.params.id}`
  // res.send(`sepsifik warga by id ${id}`)
  db.query(sql, (err, result) => {
    if (err) response(500,"invalid","error", res)
    response(200,result, `Data Warga berdasarkan ID No ${id}`, res)
})
})

app.get('/api/v1/rt', (req, res) => {
  // const sql = `SELECT 
  // nama_lengkap, tempat_lahir, jenis_kelamin, tempat_tinggal_rt, tempat_tinggal_rw 
  // FROM warga 
  // WHERE tempat_tinggal_rt = ${req.query.tempat_tinggal_rt}`
  const sql = `SELECT * FROM warga WHERE tempat_tinggal_rt = ${req.query.tempat_tinggal_rt}`

  db.query(sql, (err, result) => {
    if (err) throw err
    response(200,result, "Data Warga berdasarkan wilayah Tempat Tinggal RT", res)
})
})


app.post('/api/v1/warga', (req, res) => {
    // console.log({requestFromOutside : req.body})
    // console.log({requestFromOutside : req.body.username})
    const { nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat,
    rt, rw, kelurahan_desa, kecamatan, agama, status_perkawinan, pekerjaan,
  kewarganegaraan, no_telepon1, no_telepon2, tempat_tinggal_rt, tempat_tinggal_rw,
no_rumah, status_warga, status_tempat_tinggal } = req.body
// console.log(req.body)

    const sql = `INSERT INTO warga (nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, 
      rt, rw, kelurahan_desa, kecamatan, agama, status_perkawinan, pekerjaan, 
      kewarganegaraan, no_telepon1, no_telepon2, tempat_tinggal_rt, tempat_tinggal_rw, 
      no_rumah, status_warga, status_tempat_tinggal) VALUES (
      '${nama_lengkap}',
      '${tempat_lahir}',
      '${tanggal_lahir}',
      '${jenis_kelamin}',
      '${alamat}',
      '${rt}',
      '${rw}',
      '${kelurahan_desa}',
      '${kecamatan}',
      '${agama}',
      '${status_perkawinan}',
      '${pekerjaan}',
      '${kewarganegaraan}',
      '${no_telepon1}',
      '${no_telepon2}',
      '${tempat_tinggal_rt}',
      '${tempat_tinggal_rw}',
      '${no_rumah}',
      '${status_warga}',
      '${status_tempat_tinggal}')`

      db.query(sql, (err, result) => {
        // console.log(result)
        if (err) response(500,"invalid","error", res)
        if (result?.affectedRows){
          const data = {
            isSuccess : result.affectedRows,
            id: result.insertId
          }
          response(200, data, "Data Warga Berhasil ditambahkan", res)
        }
      })
})

app.put('/api/v1/warga/:id', (req, res) => {
  const id = req.params.id
  const { nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat,
    rt, rw, kelurahan_desa, kecamatan, agama, status_perkawinan, pekerjaan,
  kewarganegaraan, no_telepon1, no_telepon2, tempat_tinggal_rt, tempat_tinggal_rw,
no_rumah, status_warga, status_tempat_tinggal } = req.body

    const sql = `UPDATE warga SET nama_lengkap = '${nama_lengkap}', tempat_lahir = '${tempat_lahir}', 
    tanggal_lahir = '${tanggal_lahir}', jenis_kelamin = '${jenis_kelamin}', alamat = '${alamat}', rt = '${rt}', rw = '${rw}', 
    kelurahan_desa = '${kelurahan_desa}', kecamatan = '${kecamatan}', agama = '${agama}', status_perkawinan = '${status_perkawinan}', 
    pekerjaan = '${pekerjaan}', kewarganegaraan = '${kewarganegaraan}', no_telepon1 = '${no_telepon1}', no_telepon2 = '${no_telepon2}', 
    tempat_tinggal_rt = '${tempat_tinggal_rt}', tempat_tinggal_rw = '${tempat_tinggal_rw}', no_rumah = '${no_rumah}', 
    status_warga = '${status_warga}', status_tempat_tinggal = '${status_tempat_tinggal}' 
    WHERE id = ${id}`

    db.query(sql, (err, result) => {
      if (err) response(500,"invalid","error", res)
      if (result?.affectedRows){
        const data = {
          isSuccess : result.affectedRows,
          nama_lengkap : req.body.nama_lengkap,
          tempat_tinggal_rt : req.body.tempat_tinggal_rt,
          tempat_tinggal_rw : req.body.tempat_tinggal_rw
        }
        response(200, data, "Data Warga Berhasil diubah", res)
      }else{
        response(404, "Mohon Maaf Data yang anda ubah tidak ada", "Error", res)
      }
      
    })
})

app.delete('/api/v1/warga/:id', (req, res) =>{
  const id = req.params.id
  const sql = `DELETE FROM warga WHERE id = ${id}`

  db.query(sql, (err, result) => {
    if (err) response(500,"invalid","error", res)
    if (result?.affectedRows){
      const data = {
        isDeleted : result.affectedRows,
      }
      response(200, "Delete", "Data Warga Berhasil dihapus", res)
    }else {
      response(404, "User not found", "Error", res)
    }
  })
  

})


app.get('/hello', (req, res) => {
  console.log({urlParams : req.query})
  res.send("Hello")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})