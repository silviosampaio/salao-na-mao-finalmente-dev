import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
  updateServico,
  addServico,
  saveServico,
  allServicos,
  removeArquivo,
  resetServico,
  removeServico,
} from '../../store/modules/servico/actions';
import util from '../../services/util';

import {
  DatePicker,
  Drawer,
  Nav,
  Badge,
  Uploader,
  Icon,
  Button,
  Notification,
  Tag,
  Modal,
} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import Table from '../../components/Table';

const ServicosProdutos = () => {
  const dispatch = useDispatch();
  const { servico, servicos, form, components, behavior } = useSelector(
    (state) => state.servico
  );

  const setServico = (key, value) => {
    dispatch(
      updateServico({
        servico: { ...servico, [key]: value },
      })
    );
  };

  const setComponents = (component, state) => {
    dispatch(
      updateServico({
        components: { ...components, [component]: state },
      })
    );
  };

  const save = () => {
    if (
      !util.allFields(servico, [
        'titulo',
        'preco',
        'comissao',
        'duracao',
        'descricao',
        'status',
        'arquivos',
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
      dispatch(addServico());
    } else {
      dispatch(saveServico());
    }
  };

  const edit = (servico) => {
    dispatch(
      updateServico({
        servico,
        behavior: 'update',
      })
    );

    setComponents('drawer', true);
  };

  const remove = (servicoId) => {
    // PERFORM REMOVE
    dispatch(removeServico(servicoId));
  };

  useEffect(() => {
    dispatch(allServicos());
  }, []);

  return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer
        show={components.drawer}
        size="sm"
        onHide={() => setComponents('drawer', false)}
      >
        <Drawer.Body>
          <h3>{behavior === 'create' ? 'Criar' : 'Atualizar'} serviço</h3>
          <div className="row mt-3">
            <div className="form-group col-6">
              <b className="">Título</b>
              <input
                type="text"
                className="form-control"
                placeholder="Titulo do serviço"
                value={servico.titulo}
                onChange={(e) => {
                  setServico('titulo', e.target.value);
                }}
              />
            </div>
            <div className="form-group col-3">
              <b className="">R$ Preço</b>
              <input
                type="number"
                className="form-control"
                placeholder="Preço do serviço"
                value={servico.preco}
                onChange={(e) => setServico('preco', e.target.value)}
              />
            </div>
            <div className="form-group col-3">
              <b className="">Recorr. (dias)</b>
              <input
                type="number"
                className="form-control"
                placeholder="Recorrência do serviço"
                value={servico.recorrencia}
                onChange={(e) => setServico('recorrencia', e.target.value)}
              />
            </div>
            <div className="form-group col-4">
              <b className="">% Comissão</b>
              <input
                type="number"
                className="form-control"
                placeholder="Comissão do serviço"
                value={servico.comissao}
                onChange={(e) => setServico('comissao', e.target.value)}
              />
            </div>
            <div className="form-group col-4">
              <b className="d-block">Duração</b>
              <DatePicker
                block
                format="HH:mm"
                value={servico.duracao}
                hideMinutes={(min) => ![0, 30].includes(min)}
                onChange={(e) => {
                  setServico('duracao', e);
                }}
              />
            </div>
            <div className="form-group col-4">
              <b className="">Status</b>
              <select
                className="form-control"
                value={servico.status}
                onChange={(e) => setServico('status', e.target.value)}
              >
                <option value="A">Ativo</option>
                <option value="I">Inativo</option>
              </select>
            </div>

            <div className="form-group col-12">
              <b className="">Descrição</b>
              <textarea
                rows="5"
                className="form-control"
                placeholder="Descrição do serviço..."
                value={servico.descricao}
                onChange={(e) => setServico('descricao', e.target.value)}
              ></textarea>
            </div>

            <div className="form-group col-12">
              <b className="d-block">Imagens do serviço</b>
              <Uploader
                multiple
                autoUpload={false}
                listType="picture"
                defaultFileList={servico.arquivos.map((s, i) => ({
                  name: s?.caminho,
                  fileKey: i,
                  url: `${util.AWS.bucketURL}/${s?.caminho}`,
                }))}
                onChange={(files) => {
                  const arquivos = files
                    .filter((f) => f.blobFile)
                    .map((f) => f.blobFile);

                  setServico('arquivos', arquivos);
                }}
                onRemove={(file) => {
                  if (behavior === 'update' && file.url) {
                    dispatch(removeArquivo(file.name));
                  }
                }}
              >
                <button>
                  <Icon icon="camera-retro" size="lg" />
                </button>
              </Uploader>
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
            Salvar Serviço
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
              Remover Serviço
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
            <h2 className="mb-4 mt-0">Serviços e Produtos</h2>
            <div>
              <button
                onClick={() => {
                  dispatch(
                    updateServico({
                      behavior: 'create',
                    })
                  );
                  dispatch(resetServico());
                  setComponents('drawer', true);
                }}
                className="btn btn-primary btn-lg"
              >
                <span className="mdi mdi-plus"></span> Novo Serviço
              </button>
            </div>
          </div>

          <Table
            rows={servicos}
            loading={form.filtering}
            config={[
              {
                label: 'Titulo',
                key: 'titulo',
                sortable: true,
                fixed: true,
                width: 200,
              },
              {
                label: 'R$ Preço',
                key: 'preco',
                content: (preco) => `R$ ${preco.toFixed(2)}`,
                sortable: true,
              },
              {
                label: '% Comissão',
                key: 'comissao',
                content: (comissao) => `${comissao}%`,
                sortable: true,
              },
              {
                label: 'Recorrência (dias)',
                key: 'recorrencia',
                content: (comissao) => `${comissao} dias`,
                sortable: true,
              },
              {
                label: 'Duração',
                key: 'duracao',
                sortable: true,
                content: (duracao) => moment(duracao).format('HH:mm'),
              },
              {
                label: 'Data de Cadastro',
                key: 'dataCadastro',
                sortable: true,
              },
              {
                label: 'Status',
                key: 'status',
                content: (status) => (
                  <Tag color={status === 'A' ? 'green' : 'red'}>
                    {status === 'A' ? 'Ativo' : 'Inativo'}
                  </Tag>
                ),
                sortable: true,
              },
              {
                label: 'Data de cadastro',
                key: 'dataCadastro',
                sortable: true,
                width: 200,
              },
            ]}
            actions={(item) => (
              <>
                <Button
                  color="blue"
                  size="xs"
                  onClick={() => {
                    edit(item);
                  }}
                >
                  <span class="mdi mdi-pencil"></span>
                </Button>
                <Button
                  color="red"
                  size="xs"
                  className="ml-2"
                  onClick={() => {
                    dispatch(
                      updateServico({
                        servico: item,
                      })
                    );
                    setComponents('confirmDelete', true);
                  }}
                >
                  <span class="mdi mdi-trash-can"></span>
                </Button>
              </>
            )}
            onRowClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicosProdutos;
