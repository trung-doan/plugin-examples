import {i18n} from '../config/index';
import {confirmModal} from './modal';

const resource = i18n();

function confirmDiscard(onConfirm: () => void) {
  return confirmModal(resource.MSG_DISCARD, onConfirm);
}

function confirmBackToPlugin(onConfirm: () => void) {
  return confirmModal(resource.MSG_BACK_TO_PLUGIN, onConfirm);
}

export {confirmDiscard, confirmBackToPlugin};
