import {Modal} from './../components/modal/index';
import './index.css';
import {i18n} from '../../src/config/index';

const resource = i18n();
const rootEl = document.getElementById('jsedit-config');

function confirmModal(content?: string, onConfirm?: () => void, onCancel?: () => void) {
  const modal = new Modal();
  if (content) {
    const contentEl = document.createElement('div');
    contentEl.classList.add('js-edit__modal__modal-container__content');
    contentEl.innerText = content;
    modal.setContent(contentEl);
  }
  const confirmBtn = new kintoneUIComponent.Button({text: resource.CONFIRM, type: 'submit'});
  const cancelBtn = new kintoneUIComponent.Button({text: resource.CANCEL, type: 'normal'});
  const groupBtns = document.createElement('div');
  groupBtns.classList.add('js-edit__modal__modal-container__footer_buttons');
  groupBtns.appendChild(cancelBtn.render());
  groupBtns.appendChild(confirmBtn.render());
  modal.setFooter(groupBtns);

  rootEl.appendChild(modal.render());
  modal.open();

  cancelBtn.on('click', () => {
    modal.close();
    if (onCancel) onCancel();
  });

  confirmBtn.on('click', () => {
    modal.close();
    if (onConfirm) onConfirm();
  });
}

export {confirmModal};