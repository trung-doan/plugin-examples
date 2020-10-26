/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */

import './index.css';

export default class CustomList {
  el: HTMLDivElement;

  private _initLayout() {
    this.el = document.createElement('div');
    this.el.className = 'js-edit__content__custom-list';
  }

  constructor() {
    this._initLayout();
  }

  render() {
    return this.el;
  }
}
