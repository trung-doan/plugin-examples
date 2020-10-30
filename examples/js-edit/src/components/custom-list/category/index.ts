import { createSpanEl } from '../../commons/index';
import {dispatchCustomEvent} from '../../../customization/common';

import './index.css';

export class Category {
  el: HTMLDivElement;
  name: string;
  private _customizationType: CustomizationType;

  private _initProps(categoryName: string, customizationType?: CustomizationType) {
    this.name = categoryName;
    this._customizationType = customizationType || '';
  }

  private _initLayout() {
    this.el = this._generateTemplate(
      'category',
      this.name
    ) as HTMLDivElement;
  }

  constructor(categoryName: string, customizationType?: CustomizationType) {
    this._initProps(categoryName, customizationType);
    this._initLayout();
  }

  render() {
    return this.el;
  }

  reset() {
    this.el.innerHTML = '';

    const tempEl = this._generateTemplate(
      'category',
      this.name
    ) as HTMLDivElement;

    for (let i = 0; i < tempEl.children.length; i++) {
      const element = tempEl.children[i];
      this.el.appendChild(element);
    }
  }

  addLink(link: string) {
    const newLink = this._generateTemplate('link', link);
    this.el.appendChild(newLink);
    return this;
  }

  createFile(fileName: string = 'newFile', fileKey: string = '') {
    const newFile = this._generateTemplate('file', fileName, fileKey);
    this.el.appendChild(newFile);
    console.log('this.el', this.el);
    return this;
  }

  private _generateTemplate(
    type: 'category' | 'file' | 'link' | '' = '',
    value: string = '',
    fileKey: string = ''
  ) {
    const template = this._getTemplate();
    return fileKey !== '' ? template[type](value, fileKey) : template[type](value);
  }

  private _getTemplate() {
    return {
      category: (value?: string) => {
        const divContainer = document.createElement('div');
        divContainer.classList.add('category-container');
        divContainer.id = value;

        const divTitle = this._createCategoryTitleEl(value);
        divContainer.appendChild(divTitle);
        return divContainer;
      },
      file: (value?: string, fileKey?: string) => {
        const div = document.createElement('div');
        div.classList.add('file');
        div.textContent = value;
        div.addEventListener('click', (event) => {
          dispatchCustomEvent(this.el, 'file-select', {fileKey, fileName: value, customizationType: this._customizationType});
        });

        return div;
      },
      link: (link?: string) => {
        const a = document.createElement('a');
        a.href = link;
        a.textContent = link;

        const div = document.createElement('div');
        div.classList.add('link');
        div.addEventListener('click', () => {
          dispatchCustomEvent(this.el, 'link-select');
        });

        div.appendChild(a);
        return div;
      },
      '': (value = 'No files') => {
        return createSpanEl(value, 'no-files');
      },
    };
  }

  private _createCategoryTitleEl(title: string) {
    const divTitle = document.createElement('div');
    divTitle.classList.add('category');

    const span = createSpanEl(title);
    divTitle.appendChild(span);

    const divAction = this._createCategoryActionsEl();
    divTitle.appendChild(divAction);

    return divTitle;
  }

  private _createCategoryActionsEl() {
    const buttonAddLink = document.createElement('button');
    buttonAddLink.classList.add('add-link');
    buttonAddLink.textContent = 'Link';
    buttonAddLink.addEventListener('click', () => {
      dispatchCustomEvent(this.el, 'add-link');
    });

    const buttonAddFile = document.createElement('button');
    buttonAddFile.classList.add('create-file');
    buttonAddFile.textContent = 'File';
    buttonAddFile.addEventListener('click', () => {
      dispatchCustomEvent(this.el, 'create-file');
    });

    const divActions = document.createElement('div');
    divActions.classList.add('action');
    divActions.appendChild(buttonAddLink);
    divActions.appendChild(buttonAddFile);

    return divActions;
  }
}
