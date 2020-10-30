/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */

import './index.css';

export class Modal {
  el: HTMLDivElement;
  private _modalTitle: HTMLSpanElement;
  private _modalContent: HTMLDivElement;
  private _modalFooter: HTMLDivElement;

  private _initLayout() {
    this.el = document.createElement('div');
    this.el.classList.add('js-edit__modal');

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('js-edit__modal__modal-container');

    this._modalTitle = document.createElement('span');
    this._modalTitle.classList.add('js-edit__modal__modal-container__title');

    const modalClose = document.createElement('button');
    modalClose.classList.add('js-edit__modal__modal-container__close');
    modalClose.onclick = this.close.bind(this);
    modalClose.textContent = 'close';

    this._modalContent = document.createElement('div');
    this._modalContent.classList.add('js-edit__modal__modal-container__content');

    this._modalFooter = document.createElement('div');
    this._modalFooter.classList.add('js-edit__modal__modal-container__footer');

    modalContainer.appendChild(this._modalTitle);
    modalContainer.appendChild(modalClose);
    modalContainer.appendChild(this._modalContent);
    modalContainer.appendChild(this._modalFooter);

    this.el.appendChild(modalContainer);
  }

  constructor() {
    this._initLayout();
  }

  open() {
    this.close();
    this.el.classList.add('open');
  }

  close() {
    this.el.classList.remove('open');
  }

  setTitle(content: string) {
    this._modalTitle.textContent = content;
  }

  setContent(content: HTMLElement) {
    this._modalContent.innerHTML = '';
    this._modalContent.appendChild(content);
  }

  setFooter(content: HTMLElement) {
    this._modalFooter.innerHTML = '';
    this._modalFooter.appendChild(content);
  }

  render() {
    return this.el;
  }
}
