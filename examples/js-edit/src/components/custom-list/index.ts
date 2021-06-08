/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */

import './index.css';

export default class CustomList {
  el: HTMLDivElement;
  resizerEl: HTMLDivElement;
  doResize = false;

  private _initLayout() {
    this.el = document.createElement('div');
    this.el.className = 'js-edit__content__custom-list';

    this.resizerEl = document.createElement('div');
    this.resizerEl.className = 'js-edit__content__custom-list__resizer';
    this.el.appendChild(this.resizerEl);
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
      const width = event.clientX - elRect.left;
      this.el.style.width = `${width > 150 ? width : 150}px`;
    });

    document.addEventListener('mouseup', () => {
      this.doResize = false;
    });
  }

  private _initEvents() {
    this._initResizeEvents();
  }

  constructor() {
    this._initLayout();
    this._initEvents();
  }

  render() {
    return this.el;
  }
}
