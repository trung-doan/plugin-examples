/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */

import './index.css';

export default class Toolbar {
  el: HTMLDivElement;

  private _dispatch(eventName: string) {
    const event = new CustomEvent(eventName);

    this.el.dispatchEvent(event);
  }

  private _createBtn(text: string, event: string, className: string): HTMLButtonElement {
    const btnEl = document.createElement('button');
    btnEl.textContent = text;
    btnEl.className = className;

    btnEl.onclick = () => {
      this._dispatch(event);
    };

    return btnEl;
  }

  private _createGroupBtns(btns: string[][], groupEl: HTMLDivElement) {
    btns.forEach(btn => {
      const btnEl = this._createBtn(btn[0], btn[1], btn[2]);
      groupEl.appendChild(btnEl);
    });
  }

  private _initLeftLayout() {
    const leftGroupEl = document.createElement('div');
    leftGroupEl.className = 'js-edit__toolbar__group';

    const btns = [
      ['Save', 'save', 'js-edit__toolbar__group__btn'],
      ['Discard', 'discard', 'js-edit__toolbar__group__btn'],
      ['Back to Plug-ins', 'back-to-plugins', 'js-edit__toolbar__group__btn']
    ];

    this._createGroupBtns(btns, leftGroupEl);

    this.el.appendChild(leftGroupEl);
  }

  private _initCenterLayout() {
    const centerGroupEl = document.createElement('div');
    centerGroupEl.className = 'js-edit__toolbar__group';

    this.el.appendChild(centerGroupEl);
  }

  private _initRightLayout() {
    const rightGroupEl = document.createElement('div');
    rightGroupEl.className = 'js-edit__toolbar__group';

    const btns = [
      ['Help', 'help', 'js-edit__toolbar__group__btn'],
      ['Maximize', 'max-min-toggle', 'js-edit__toolbar__group__btn']
    ];

    this._createGroupBtns(btns, rightGroupEl);

    this.el.appendChild(rightGroupEl);
  }

  private _initLayout() {
    this.el = document.createElement('div');
    this.el.className = 'js-edit__toolbar';

    this._initLeftLayout();
    this._initCenterLayout();
    this._initRightLayout();
  }

  constructor() {
    this._initLayout();
  }

  render() {
    return this.el;
  }
}
