import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  TagPicker,
  Drawer,
  Modal,
  Icon,
  Checkbox,
  DatePicker,
  Button,
  Notification,
} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import {
  allHorarios,
  addHorario,
  removeHorario,
  updateHorario,
  allServicos,
  filterColaboradores,
  saveHorario,
} from '../../store/modules/horario/actions';
import util from '../../services/util';
import colors from '../../data/colors.json';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const HorariosAtendimento = () => {
  const dispatch = useDispatch();
  const {
    horario,
    horarios,
    form,
    components,
    behavior,
    servicos,
    colaboradores,
  } = useSelector((state) => state.horario);

  const diasDaSemana = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
  ];

  const diasSemanaData = [
    new Date(2021, 3, 11, 0, 0, 0, 0),
    new Date(2021, 3, 12, 0, 0, 0, 0),
    new Date(2021, 3, 13, 0, 0, 0, 0),
    new Date(2021, 3, 14, 0, 0, 0, 0),
    new Date(2021, 3, 15, 0, 0, 0, 0),
    new Date(2021, 3, 16, 0, 0, 0, 0),
    new Date(2021, 3, 17, 0, 0, 0, 0),
  ];

  const setHorario = (key, value) => {
    dispatch(
      updateHorario({
        horario: { ...horario, [key]: value },
      })
    );
  };

  const setComponents = (component, state) => {
    dispatch(
      updateHorario({
        components: { ...components, [component]: state },
      })
    );
  };

  const onHorarioClick = (horario) => {
    dispatch(
      updateHorario({
        horario,
        behavior: 'update',
      })
    );
    setComponents('drawer', true);
  };

  const save = () => {
    if (
      !util.allFields(horario, [
        'dias',
        'inicio',
        'fim',
        'especialidades',
        'colaboradores',
      ])
    ) {
      // DISPARAR O ALERTA
      Notification.error({
        placement: 'topStart',
        title: 'Calma lá!',
        description: 'Antes de prosseguir, preencha todos os campos!',
      });
      return false;
    }

    if (behavior === 'create') {
      dispatch(addHorario());
    } else {
      dispatch(saveHorario());
    }
  };

  const remove = () => {
    // PERFORM REMOVE
    dispatch(removeHorario());
  };

  const formatEventos = () => {
    let listaEventos = [];

    horarios.map((hor, index) => {
      hor.dias.map((dia) => {
        listaEventos.push({
          resource: { horario: hor, backgroundColor: colors[index] },
          title: `${hor.especialidades.length} espec. e ${hor.colaboradores.length} colab. disponíveis`,
          start: new Date(
            diasSemanaData[dia].setHours(
              parseInt(moment(hor.inicio).format('HH')),
              parseInt(moment(hor.inicio).format('mm'))
            )
          ),
          end: new Date(
            diasSemanaData[dia].setHours(
              parseInt(moment(hor.fim).format('HH')),
              parseInt(moment(hor.fim).format('mm'))
            )
          ),
        });
      });
    });

    return listaEventos;
  };

  useEffect(() => {
    dispatch(allHorarios());
    dispatch(allServicos());
  }, []);

  useEffect(() => {
    dispatch(filterColaboradores());
  }, [horario.especialidades]);

  return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer
        show={components.drawer}
        size="sm"
        onHide={() => setComponents('drawer', false)}
      >
        <Drawer.Body>
          <h3>Criar novo horario de atendimento</h3>
          <div className="row mt-3">
            <div className="col-12">
              <b>Dias da semana</b>
              <TagPicker
                size="lg"
                block
                value={horario.dias}
                data={diasDaSemana.map((label, value) => ({ label, value }))}
                onChange={(value) => {
                  setHorario('dias', value);
                }}
              />
              <Checkbox
                disabled={horario.dias.length === diasDaSemana.length}
                checked={horario.dias.length === diasDaSemana.length}
                onChange={(v, selected) => {
                  if (selected) {
                    setHorario(
                      'dias',
                      diasDaSemana.map((label, value) => value)
                    );
                  } else {
                    setHorario('dias', []);
                  }
                }}
              >
                {' '}
                Selecionar Todos
              </Checkbox>
            </div>
            <div className="col-6 mt-3">
              <b className="d-block">Horário Inicial</b>
              <DatePicker
                block
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                value={horario.inicio}
                onChange={(e) => {
                  setHorario('inicio', e);
                }}
              />
            </div>
            <div className="col-6 mt-3">
              <b className="d-block">Horário Final</b>
              <DatePicker
                block
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                value={horario.fim}
                onChange={(e) => {
                  setHorario('fim', e);
                }}
              />
            </div>
            <div className="col-12 mt-3">
              <b>Especialidades disponíveis</b>
              <TagPicker
                size="lg"
                block
                data={servicos}
                value={horario.especialidades}
                onChange={(e) => {
                  setHorario('especialidades', e);
                }}
              />
              <Checkbox
                disabled={horario.especialidades.length === servicos.length}
                checked={horario.especialidades.length === servicos.length}
                onChange={(v, selected) => {
                  if (selected) {
                    setHorario(
                      'especialidades',
                      servicos.map((s) => s.value)
                    );
                  } else {
                    setHorario('especialidades', []);
                  }
                }}
              >
                {' '}
                Selecionar Todas
              </Checkbox>
            </div>
            <div className="col-12 mt-3">
              <b>Colaboradores disponíveis</b>
              <TagPicker
                size="lg"
                block
                data={colaboradores}
                disabled={horario.especialidades.length === 0}
                value={horario.colaboradores}
                onChange={(e) => {
                  setHorario('colaboradores', e);
                }}
              />
              <Checkbox
                disabled={horario.colaboradores.length === colaboradores.length}
                checked={horario.colaboradores.length === colaboradores.length}
                onChange={(v, selected) => {
                  if (selected) {
                    setHorario(
                      'colaboradores',
                      colaboradores.map((s) => s.value)
                    );
                  } else {
                    setHorario('colaboradores', []);
                  }
                }}
              >
                {' '}
                Selecionar Todos
              </Checkbox>
            </div>
          </div>
          <Button
            loading={form.saving}
            color={behavior === 'create' ? 'green' : 'primary'}
            size="lg"
            block
            onClick={() => save()}
            className="mt-3"
          >
            Salvar Horário de Atendimento
          </Button>
          {behavior === 'update' && (
            <Button
              loading={form.saving}
              color="red"
              size="lg"
              block
              onClick={() => setComponents('confirmDelete', true)}
              className="mt-1"
            >
              Remover Horário de Atendimento
            </Button>
          )}
        </Drawer.Body>
      </Drawer>

      <Modal
        show={components.confirmDelete}
        onHide={() => setComponents('confirmDelete', false)}
        size="xs"
      >
        <Modal.Body>
          <Icon
            icon="remind"
            style={{
              color: '#ffb300',
              fontSize: 24,
            }}
          />
          {'  '} Tem certeza que deseja excluir? Essa ação será irreversível!
        </Modal.Body>
        <Modal.Footer>
          <Button loading={form.saving} onClick={() => remove()} color="red">
            Sim, tenho certeza!
          </Button>
          <Button
            onClick={() => setComponents('confirmDelete', false)}
            appearance="subtle"
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        <div className="col-12">
          <div className="w-100 d-flex justify-content-between">
            <h2 className="mb-4 mt-0">Horarios de Atendimento</h2>
            <div>
              <button
                onClick={() => setComponents('drawer', true)}
                className="btn btn-primary btn-lg"
              >
                <span className="mdi mdi-plus"></span> Novo Horario
              </button>
            </div>
          </div>

          <Calendar
            localizer={localizer}
            onSelectEvent={(e) => {
              const { horario } = e.resource;
              onHorarioClick(horario);
            }}
            onSelectSlot={(slotInfo) => {
              const { start, end } = slotInfo;
              dispatch(
                updateHorario({
                  horario: {
                    ...horario,
                    dias: [moment(start).day()],
                    inicio: start,
                    fim: end,
                  },
                })
              );
              setComponents('drawer', true);
            }}
            formats={{
              dateFormat: 'dd',
              dayFormat: (date, culture, localizer) =>
                localizer.format(date, 'dddd', culture),
            }}
            events={formatEventos()}
            eventPropGetter={(event, start, end, isSelected) => {
              return {
                style: {
                  backgroundColor: event.resource.backgroundColor,
                  borderColor: event.resource.backgroundColor,
                },
              };
            }}
            date={diasSemanaData[moment().day()]}
            view={components.view}
            selectable={true}
            popup={true}
            toolbar={false}
            style={{ height: 600 }}
          />
        </div>
      </div>
    </div>
  );
};

export default HorariosAtendimento;
