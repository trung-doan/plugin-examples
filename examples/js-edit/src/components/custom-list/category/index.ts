import {createSpanEl} from '../../commons/index';
import {dispatchCustomEvent} from '../../../customization/common';
import {mdiFilePlusOutline, mdiLinkVariantPlus} from '@mdi/js';

import './index.css';

export class Category {
  el: HTMLDivElement;
  name: string;
  private _customizationType: CustomizationType;
  private files: any;

  private _initProps(categoryName: string, customizationType?: CustomizationType) {
    this.name = categoryName;
    this.files = [];
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

  addFile(fileName: string, file: any) {
    const fileKey = file.fileKey;
    const newFile = this.createFile(fileName, file.fileKey);
    this._highlightSelectedFileLink(newFile.el as HTMLDivElement);
    dispatchCustomEvent(this.el, 'file-select', {fileKey, fileName, customizationType: this._customizationType, fileIndex: newFile.fileIndex});
  }

  reset() {
    this.el.innerHTML = '';
    this.files = [];

    const tempEl = this._generateTemplate(
      'category',
      this.name
    ) as HTMLDivElement;

    for (let i = 0; i < tempEl.children.length; i++) {
      const element = tempEl.children[i];
      this.el.appendChild(element);
    }
  }

  selectFile(fileIndex: number) {
    if (!this.files[fileIndex]) return;
    this._highlightSelectedFileLink(this.files[fileIndex].el as HTMLDivElement);
    dispatchCustomEvent(this.el, 'file-select', {
      fileKey: this.files[fileIndex].fileKey,
      fileName: this.files[fileIndex].fileName,
      customizationType: this._customizationType,
      fileIndex
    });
  }

  addLink(link: string) {
    const newLink = this._generateTemplate('link', link);
    this.el.appendChild(newLink);
    return this;
  }

  createFile(fileName: string = 'newFile', fileKey: string = '') {
    const fileIndex = this.files.length;
    const el = this._generateTemplate('file', fileName, fileKey, fileIndex);
    this.el.appendChild(el);

    const newFile = {
      el,
      fileName,
      fileKey,
      fileIndex
    };
    this.files.push(newFile);
    return newFile;
  }

  private _generateTemplate(
    type: 'category' | 'file' | 'link' | '' = '',
    value: string = '',
    fileKey: string = '',
    fileIndex: number | null = null
  ) {
    const template = this._getTemplate();
    return fileKey !== '' ? template[type](value, fileKey, fileIndex) : template[type](value);
  }

  private _highlightSelectedFileLink(fileLink: HTMLDivElement) {
    const files = document.getElementsByClassName('category__container__block__file--selected');
    for (let i = 0; i < files.length; i++) {
      files[i].classList.remove('category__container__block__file--selected');
    }

    fileLink.classList.add('category__container__block__file--selected');
  }

  private _getTemplate() {
    return {
      category: (value?: string) => {
        const divContainer = document.createElement('div');
        divContainer.classList.add('category__container');
        divContainer.id = value;

        const divTitle = this._createCategoryTitleEl(value);
        divContainer.appendChild(divTitle);
        return divContainer;
      },
      file: (value?: string, fileKey?: string, fileIndex?: number | null) => {
        const div = document.createElement('div');
        div.classList.add('category__container__block__file');
        div.textContent = value;
        div.addEventListener('click', (event) => {
          this._highlightSelectedFileLink(event.target as HTMLDivElement);
          dispatchCustomEvent(this.el, 'file-select', {fileKey, fileName: value, customizationType: this._customizationType, fileIndex});
        });

        return div;
      },
      link: (link?: string) => {
        const a = document.createElement('a');
        a.href = link;
        a.textContent = link;
        a.setAttribute('target', '_blank');

        const div = document.createElement('div');
        div.classList.add('category__container__block__link');
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
    divTitle.classList.add('category__container__block');

    const span = createSpanEl(title, 'category__container__title');
    divTitle.appendChild(span);

    const divAction = this._createCategoryActionsEl();
    divTitle.appendChild(divAction);

    return divTitle;
  }

  private _customKucIconBtn(iconData: string) {
    const iconBtn = new kintoneUIComponent.IconButton({color: 'transparent'});
    iconBtn.pathEl.setAttribute('d', iconData);

    return iconBtn;
  }

  private _createCategoryActionsEl() {
    const buttonAddLink = this._customKucIconBtn(mdiLinkVariantPlus);
    buttonAddLink.on('click', () => {
      dispatchCustomEvent(this.el, 'add-link');
    });

    const buttonAddFile = this._customKucIconBtn(mdiFilePlusOutline);
    buttonAddFile.on('click', () => {
      dispatchCustomEvent(this.el, 'create-file');
    });

    const divActions = document.createElement('div');
    divActions.classList.add('action');
    divActions.appendChild(buttonAddLink.render());
    divActions.appendChild(buttonAddFile.render());

    return divActions;
  }
}
