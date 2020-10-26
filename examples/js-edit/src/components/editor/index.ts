/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */

import './index.css';

export default class Editor {
  el: HTMLDivElement;
  ace: any;

  private _initLayout() {
    this.el = document.createElement('div');
    this.el.className = 'js-edit__content__editor';
  }

  private _initAce() {
    const editorEl = document.createElement('div');
    this.el.appendChild(editorEl);

    this.ace = ace.edit(editorEl);
    this.ace.$blockScrolling = Infinity;
    this.ace.setTheme('ace/theme/monokai');
    ace.require('ace/ext/language_tools');
    this.ace.setOptions({
      maxLines: Infinity,
      enableBasicAutocompletion: false,
      enableSnippets: false,
      enableLiveAutocompletion: true,
      tabSize: 2,
      useSoftTabs: true
    });
  }

  constructor() {
    this._initLayout();
    this._initAce();
  }

  render() {
    return this.el;
  }
}
