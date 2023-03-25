const express = require('express');
const app = express();
const morgan = require('morgan');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const cors = require('cors');

// DATABASE
require('./database');

app.use(morgan('dev'));
app.use(busboy());
app.use(busboyBodyParser());
app.use(express.json());
app.use(cors());

app.set('port', 8000);

/* ROTAS */
app.use('/salao', require('./src/routes/salao.routes'));
app.use('/cliente', require('./src/routes/cliente.routes'));
app.use('/servico', require('./src/routes/servico.routes'));
app.use('/colaborador', require('./src/routes/colaborador.routes'));
app.use('/horario', require('./src/routes/horario.routes'));
app.use('/agendamento', require('./src/routes/agendamento.routes'));

app.listen(app.get('port'), function () {
  console.log('WS escutando porta ' + app.get('port'));
});
