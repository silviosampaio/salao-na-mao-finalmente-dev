import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Sidebar = (props) => {
  return (
    <sidebar class="col-2 h-100">
      <img src={logo} class="img-fluid px-3 py-4" />
      <ul>
        <li>
          <Link
            to="/"
            className={props.location.pathname === '/' ? 'active' : ''}
          >
            <span class="mdi mdi-calendar-check"></span>
            <text>Agendamentos</text>
          </Link>
        </li>
        <li>
          <Link
            to="/clientes"
            className={props.location.pathname === '/clientes' ? 'active' : ''}
          >
            <span class="mdi mdi-account-multiple"></span>
            <text>Clientes</text>
          </Link>
        </li>
        <li>
          <Link
            to="/colaboradores"
            className={
              props.location.pathname === '/colaboradores' ? 'active' : ''
            }
          >
            <span class="mdi mdi-card-account-details-outline"></span>
            <text>Colaboradores</text>
          </Link>
        </li>
        <li>
          <Link
            to="/servicos-produtos"
            className={
              props.location.pathname === '/servicos-produtos' ? 'active' : ''
            }
          >
            <span class="mdi mdi-auto-fix"></span>
            <text>Serviços</text>
          </Link>
        </li>
        <li>
          <Link
            to="/horarios-atendimento"
            className={
              props.location.pathname === '/horarios-atendimento'
                ? 'active'
                : ''
            }
          >
            <span class="mdi mdi-clock-check-outline"></span>
            <text>Horarios</text>
          </Link>
        </li>
      </ul>
    </sidebar>
  );
};

export default withRouter(Sidebar);
