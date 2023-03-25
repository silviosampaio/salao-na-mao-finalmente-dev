const express = require('express');
const router = express.Router();
const Horario = require('../models/horario');
const ColaboradorServico = require('../models/relationship/colaboradorServico');
const moment = require('moment');
var _ = require('lodash');

router.post('/', async (req, res) => {
  try {
    // VERIFICAR SE EXISTE ALGUM HORARIO, NAQUELE DIA, PRAQUELE SALÃO

    // SE NÃO HOVER, CADASTRA
    await new Horario(req.body).save();

    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.get('/salao/:salaoId', async (req, res) => {
  try {
    const { salaoId } = req.params;

    const horarios = await Horario.find({
      salaoId,
    });

    res.json({ error: false, horarios });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.put('/:horarioId', async (req, res) => {
  try {
    const { horarioId } = req.params;
    const horario = req.body;

    // SE NÃO HOVER, ATUALIZA
    await Horario.findByIdAndUpdate(horarioId, horario);

    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.post('/colaboradores', async (req, res) => {
  try {
    const colaboradores = await ColaboradorServico.find({
      servicoId: { $in: req.body.servicos },
      status: 'A',
    })
      .populate('colaboradorId', 'nome')
      .select('colaboradorId -_id');

    const listaColaboradores = _.uniqBy(colaboradores, (c) =>
      c.colaboradorId._id.toString()
    ).map((c) => ({ label: c.colaboradorId.nome, value: c.colaboradorId._id }));

    res.json({ error: false, colaboradores: listaColaboradores });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

router.delete('/:horarioId', async (req, res) => {
  try {
    const { horarioId } = req.params;
    await Horario.findByIdAndDelete(horarioId);
    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
