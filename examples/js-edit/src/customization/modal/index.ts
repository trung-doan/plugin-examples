import './index.css';

export function createModalContent() {
  const textbox = new kintoneUIComponent.Text();
  const textboxEl = textbox.render();
  textboxEl.id = 'input-value';

  const div = document.createElement('div');
  div.appendChild(textboxEl);
  return div;
}

export function createButtonEl(value: string = 'Save') {
  const buttonSave = new kintoneUIComponent.Button({
    text: value
  });

  return buttonSave.render();
}

export function createModalContentRow(textbox: any, button: any) {
  const div = document.createElement('div');
  div.className = 'js-edit__modal__modal-container__content__row';

  div.appendChild(textbox.render());
  div.appendChild(button.render());

  return div;
}