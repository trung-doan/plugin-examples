import {i18n} from '../config/index';
import {confirmModal} from './modal';

const resource = i18n();

const spinner = new kintoneUIComponent.Spinner();
document.getElementsByTagName('body')[0].appendChild(spinner.render());

function confirmDiscard(onConfirm: () => void) {
  return confirmModal(resource.MSG_DISCARD, onConfirm);
}

function confirmBackToPlugin(onConfirm: () => void) {
  return confirmModal(resource.MSG_BACK_TO_PLUGIN, onConfirm);
}

function showSpinner() {
  spinner.show();
}

function hideSpinner() {
  spinner.hide();
}

export {
  confirmDiscard,
  confirmBackToPlugin,
  showSpinner,
  hideSpinner
};
