/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */
import {i18n} from '../../config/index';
import './index.css';

const resource = i18n();

export default class SecondToolbar {
  el: HTMLDivElement;
  private _dispatch(eventName: string, detail:any) {
    const event = new CustomEvent(eventName, detail);
    this.el.dispatchEvent(event);
  }

  private _initLayout() {
    this.el = document.createElement('div');
    this.el.className = 'js-edit__second-toolbar';
    this.el.appendChild(this.createCheckBoxItem());
  }

  private createCheckBoxItem() {
    const checkbox = new kintoneUIComponent.CheckBox({
      items: [
        {
          label: resource.UPDATE_APP_WHEN_SAVING_THE_CODE,
          value: 'checked',
          isDisabled: false
        }
      ],
      value: ['checked']
    });
    const groupEl = document.createElement('div');
    groupEl.className = 'js-edit__second-toolbar__update-app';
    checkbox.on('change', (value: any) => {
      this._dispatch('onChange', {detail: value});
    });
    groupEl.appendChild(checkbox.render());
    return groupEl;
  }

  constructor() {
    this._initLayout();
  }

  render() {
    return this.el;
  }
}
