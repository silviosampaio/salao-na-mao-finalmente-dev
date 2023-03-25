const express = require('express');
const router = express.Router();
const Salao = require('../models/salao');
const Servico = require('../models/servico');
const Horario = require('../models/horario');
const turf = require('turf');
const util = require('../util');

router.post('/', async (req, res) => {
  try {
    const salao = await new Salao(req.body).save();
    res.json({ salao });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

/*
  FAZER NA #01
*/
router.get('/servicos/:salaoId', async (req, res) => {
  try {
    const { salaoId } = req.params;
    const servicos = await Servico.find({
      salaoId,
      status: 'A',
    }).select('_id titulo');

    res.json({
      error: false,
      servicos: servicos.map((s) => ({ label: s.titulo, value: s._id })),
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

/*
  FAZER NA #01
*/
router.post('/filter/:id', async (req, res) => {
  try {
    const salao = await Salao.findById(req.params.id).select(req.body.fields);

    const distance = turf
      .distance(
        turf.point(salao.geo.coordinates),
        turf.point([-30.043858, -51.103487])
      )
      .toFixed(2);

    const horarios = await Horario.find({
      salaoId: req.params.id,
    }).select('dias inicio fim');

    const isOpened = await util.isOpened(horarios);

    res.json({ error: false, salao: { ...salao._doc, distance, isOpened } });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
