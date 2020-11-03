/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */
// import {i18n} from '../../config/index';
import './index.css';

// const resource = i18n();

export default class FeatureBox {
  el: HTMLDivElement;
  onChangeType: () => void
  contentEl: HTMLParagraphElement;
  typeSelectEl: HTMLSelectElement;
  // private _dispatch(eventName: string) {
  //   const event = new CustomEvent(eventName);

  //   this.el.dispatchEvent(event);
  // }

  private _createTypeSelect() {
    const selectEl = document.createElement('select');

    const options = [
      {
        label: 'ES6',
        value: 'es6'
      },
      {
        label: 'ES5',
        value: 'es5'
      }
    ];

    this._createGroupOptions(options, selectEl);

    return selectEl;
  }

  private _createGroupOptions(options: any[], selectEl: HTMLSelectElement) {
    options.forEach(opt => {
      const optionEl = document.createElement('option');
      optionEl.innerText = opt.label;
      optionEl.setAttribute('value', opt.value);
      selectEl.appendChild(optionEl);
    });
  }

  private _initLayout() {
    this.el = document.createElement('div');
    this.el.className = 'js-edit__feature-box';

    this.typeSelectEl = this._createTypeSelect();
    this.typeSelectEl.onchange = () => {
      this.onChangeType && this.onChangeType();
    };
    const toolBar = document.createElement('div');
    toolBar.classList.add('js-edit__feature-tool-bar');
    toolBar.appendChild(this.typeSelectEl);
    this.el.appendChild(toolBar);


    const boxContent = this._createBoxContent();
    this.el.appendChild(boxContent);
  }

  private _createBoxContent() {
    const boxEl = document.createElement('div');
    boxEl.classList.add('js-edit__box-content');
    boxEl.appendChild(this.contentEl);
    return boxEl;
  }

  constructor() {
    this.contentEl = document.createElement('p');
    this._initLayout();
  }

  on(event: string, handler: () => void) {
    if (event === 'changeType') this.onChangeType = handler;
  }

  getBoxContent() {
    return this.contentEl;
  }

  getType() {
    return this.typeSelectEl.value;
  }

  render() {
    return this.el;
  }
}
