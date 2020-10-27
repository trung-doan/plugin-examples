/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */
import './index.css';

export default class UserGuide {
  el: HTMLDivElement;
  closeBtn: any;

  private _initLayout(props: UserGuideProps) {
    this.el = document.createElement('div');
    this.el.className = 'js-edit__content__user-guide';

    const header = document.createElement('div');
    header.className = 'js-edit__content__user-guide__header';
    this.closeBtn = new kintoneUIComponent.IconButton({type: 'close', color: 'blue', size: 'small'});
    header.appendChild(this.closeBtn.render());

    const container = document.createElement('div');
    container.className = 'js-edit__content__user-guide__container';

    props.links.forEach(item => {
      container.appendChild(this._createLink(item));
    });

    this.el.appendChild(header);
    this.el.appendChild(container);
  }

  private _handlingEvents() {
    this.closeBtn.on('click', () => {
      this.el.parentNode.removeChild(this.el);
    });
  }

  private _createLink(link: ItemUserGuide) {
    const itemDivEl = document.createElement('div');
    const itemEl:HTMLAnchorElement = document.createElement('a');
    itemEl.textContent = link.label;
    itemEl.href = link.url;
    itemEl.target = '_blank';
    itemDivEl.appendChild(itemEl);
    return itemDivEl;
  }

  constructor(props: UserGuideProps) {
    this._initLayout(props);
    this._handlingEvents();
  }

  render() {
    return this.el;
  }
}
