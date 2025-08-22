const express = require('express');
const router = express.Router();

const db = require('../config/db');

/* GET users. */
router.get('/', async function (req, res, next) {
  const [rows] = await db.query("SELECT * FROM datasiswa");
  return res.json({
    data: rows
  })
});

/* POST users. */
router.post('/', async (req, res) => {
  const { kode, nama, alamat, tanggal, jurusan } = req.body;
  if (!kode || !nama || !alamat || !tanggal || !jurusan) {
    return res.status(400).json({
      message: "Silahkan isi semua data!!",
    })
  }

  const [result] = await db.query("INSERT INTO datasiswa (kode, nama, alamat, tanggal, jurusan) VALUES (?, ?, ?, ?, ?)", [kode, nama, alamat, tanggal, jurusan]);

  return res.json({
    message: "Data berhasil ditambahkan",
    id: result.insertId
  })
})

/* PUT users. */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { kode, nama, alamat, tanggal, jurusan } = req.body;

  await db.query("UPDATE datasiswa SET kode=?, nama=?, alamat=?, tanggal=?, jurusan=? WHERE id=?", [kode, nama, alamat, tanggal, jurusan, id]);

  if (!kode || !nama || !alamat || !tanggal || !jurusan) {
    return res.status(400).json({
      message: "Silahkan isi semua data!!",
    })
  }
  return res.json({
    message: "Data berhasil diubah",
    data: id
  })
})

/* DELETE users. */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Error, ID tidak ditemukan!"
    })
  }

  await db.query("DELETE FROM datasiswa WHERE id=?", [id]);
  return res.json({
    data: "Data berhasil dihapus!",
    id
  })
})

module.exports = router;
