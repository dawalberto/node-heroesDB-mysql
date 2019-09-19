const app = require('express')();
const conexion = require('./bdconfig.js');

app.get('/', (req, res) => {
	res.json({
		ok: true,
		msg: 'Bienvenido a heroes-db',
		instrucciones: 'Endpoints disponibles: • GET /heroes (devuelve todos los heroes) | ' + 
		'• GET /heroes/:id (devuelve el heroe con el id indicado) | ' +
		'• GET /heroes/nombre/:nombre (devuelve los heroes que coincidan con el nombre indicado)' + 
		'• GET /heroes/raza/:raza (devuelve los heroes que coincidad con la raza indicada)' + 
		'• GET /heroes/universo/:universo (devuelve los heroes que coincidad con el universo indicado)'
	})
})

app.get('/heroes', (req, res) => {

	conexion.query('select * from heroes', (err, result, campos) => {

		if (err) {
			res.json({
				ok: false,
				error: err
			})
		} else {
			res.json({
				ok: true,
				result
			})
		}

	})

})

app.get('/heroes/:id', (req, res) => {

	let id = req.params.id

	conexion.query('select * from heroes where id = ?', [id], (err, result, campos) => {

		if (err) {
			res.json({
				ok: false,
				error: err
			})
		} else if (result.length <= 0) {
			res.json({
				ok: false,
				msg: `No se encontró ningún heroe con el id ${id}`
			})
		} else {
			res.json({
				ok: true,
				result
			})
		}

	})

})

app.get('/heroes/nombre/:nombre', (req, res) => {

	let nom = req.params.nombre

	conexion.query('select * from heroes where name like ? or alias like ?', [`%${nom}%`, `%${nom}%`], (err, result, campos) => {

		if (err) {
			res.json({
				ok: false,
				error: err
			})
		} else if (result.length <= 0) {
			res.json({
				ok: false,
				msg: `No se encontró ningún heroe con el nombre ${nom}`
			})
		} else {
			res.json({
				ok: true,
				total: result.length,
				result
			})
		}

	})

})

app.get('/heroes/raza/:raza', (req, res) => {

	let raza = req.params.raza

	conexion.query('select * from heroes where race like ?', [`%${raza}%`], (err, result, campos) => {

		if (err) {
			res.json({
				ok: false,
				error: err
			})
		} else if (result.length <= 0) {
			res.json({
				ok: false,
				msg: `No se encontró ningún heroe con la raza ${raza}`
			})
		} else {
			res.json({
				ok: true,
				total: result.length,
				result
			})
		}

	})

})

app.get('/heroes/universo/:universo', (req, res) => {

	let universo = req.params.universo

	conexion.query('select * from heroes where universe like ?', [`%${universo}%`], (err, result, campos) => {

		if (err) {
			res.json({
				ok: false,
				error: err
			})
		} else if (result.length <= 0) {
			res.json({
				ok: false,
				msg: `No se encontró ningún heroe del universo ${universo}`
			})
		} else {
			res.json({
				ok: true,
				total: result.length,
				result
			})
		}

	})

})


module.exports = app