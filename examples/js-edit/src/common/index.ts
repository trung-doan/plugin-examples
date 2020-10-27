import {i18n} from '../config/index';

const resource = i18n();

function confirmDiscard() {
  return (window.confirm(resource.MSG_DISCARD));
}

export {confirmDiscard};
