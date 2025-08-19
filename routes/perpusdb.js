const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM buku', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

// get
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM buku WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Data buku tidak ditemukan');
        res.json(results[0]);
    });
});

// post
router.post('/', (req, res) => {
    const { judul, penulis, deskripsi } = req.body;
    if (!judul || !penulis || !deskripsi) {
        return res.status(400).send('Data buku tidak boleh kosong');
    }

    db.query('INSERT INTO buku (judul, penulis, deskripsi) VALUES (?, ?, ?)', [judul.trim(), penulis.trim(), deskripsi.trim()], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        const newBook = { id: results.insertId, judul: judul.trim(), penulis: penulis.trim(), deskripsi: deskripsi.trim()};
        res.status(201).json(newBook);
    });
});

// put
router.put('/:id', (req, res) => {
    const { judul, penulis, deskripsi } = req.body;

    db.query('UPDATE buku SET judul = ?, penulis = ?, deskripsi = ?,  WHERE id = ?', [judul, penulis, deskripsi, req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Data buku tidak ditemukan');
        res.json({ id: req.params.id, judul, penulis, deskripsi });
    });
});

// delete
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM buku WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Data buku tidak ditemukan');
        res.status(204).send();
    });
});

module.exports = router;