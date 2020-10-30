/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */
import {createSpanEl} from '../../commons/index';

import './index.css';

export class Hierarchy {
  el: HTMLDivElement;
  private _name: string;

  private _initLayout() {
    this.el = document.createElement('div');
    this.el.className = 'js-edit__content__custom-list__custom-item__hierarchy';

    const spanTitle = createSpanEl(this._name);
    spanTitle.classList.add('title');
    this.el.appendChild(spanTitle);
  }

  private _initProps(name: string) {
    this._name = name;
  }

  constructor(name: string) {
    this._initProps(name);
    this._initLayout();
  }

  render() {
    return this.el;
  }
}
