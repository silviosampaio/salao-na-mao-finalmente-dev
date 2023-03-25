import { Notification } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

export const notification = (type, params) => {
  Notification[type](params);
};
