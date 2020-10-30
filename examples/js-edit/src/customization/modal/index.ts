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