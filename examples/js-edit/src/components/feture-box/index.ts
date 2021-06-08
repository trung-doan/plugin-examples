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
  boxEl: HTMLDivElement;
  contentEl: HTMLParagraphElement;
  typeSelectEl: HTMLSelectElement;
  resizerEl: HTMLDivElement;
  onChangeType: () => void
  doResize = false;

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

    this.resizerEl = document.createElement('div');
    this.resizerEl.className = 'js-edit__feature-box__resizer';
    this.el.appendChild(this.resizerEl);

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
    this.boxEl = document.createElement('div');
    this.boxEl.classList.add('js-edit__box-content');
    this.boxEl.appendChild(this.contentEl);
    return this.boxEl;
  }

  private _initResizeEvents() {
    this.resizerEl.onmousedown = () => {
      this.doResize = true;
    };

    document.addEventListener('mousemove', (event: MouseEvent) => {
      if (!this.doResize) {
        return;
      }

      event.preventDefault();

      const elRect = this.el.getBoundingClientRect();
      let height = elRect.bottom - event.clientY;
      height = height > 100 ? height : 100;
      this.el.style.height = `${height}px`;
      this.boxEl.style.height = `${height - 24}px`;
    });

    document.addEventListener('mouseup', () => {
      this.doResize = false;
    });
  }

  private _initEvents() {
    this._initResizeEvents();
  }

  constructor() {
    this.contentEl = document.createElement('p');
    this._initLayout();
    this._initEvents();
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
