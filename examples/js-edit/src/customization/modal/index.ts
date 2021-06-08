import './index.css';

export function createModalContentRow(textbox: any, button: any) {
  const div = document.createElement('div');
  div.className = 'js-edit__modal__modal-container__content__row';

  div.appendChild(textbox.render());
  div.appendChild(button.render());

  return div;
}