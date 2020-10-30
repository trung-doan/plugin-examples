
import { Category } from '../../components/custom-list/category/index';
import { Hierarchy } from '../../components/custom-list/hierarchy/index';
import { Modal } from '../../components/modal/index';
import {createModalContent, createButtonEl} from '../modal/index';
import {renderCustomization, uploadFileToCustomization, uploadLinkToCustomization, renderEditorValueByFileKey,
  getDefaultSourceForNewFile, getFileName} from '../common';
import {JS_MB, CSS_MB} from '../../constant';

export class Mobile {
  el: HTMLDivElement;
  private _hierarchyEl: HTMLDivElement;
  private _jsCategoryEl: HTMLDivElement;
  private _cssCategoryEl: HTMLDivElement

  private _hierarchy: Hierarchy;
  private _jsCategory: Category;
  private _cssCategory: Category;
  private _modal: Modal;
  private _editor: any;

  private _initProps(modal: Modal, editor: any) {
    this._hierarchy = new Hierarchy('Mobile');
    this._jsCategory = new Category('Javascript', JS_MB);
    this._cssCategory = new Category('CSS', CSS_MB);
    this._modal = modal;
    this._editor = editor;
  }

  private _initLayout() {
    this.el = document.createElement('div');
    this._hierarchyEl = this._hierarchy.render();
    this._jsCategoryEl = this._jsCategory.render();
    this._cssCategoryEl = this._cssCategory.render();

    this._hierarchyEl.appendChild(this._jsCategoryEl);
    this._hierarchyEl.appendChild(this._cssCategoryEl);
    this.el.appendChild(this._hierarchyEl);
  }

  private _initEvent() {
    this._initJSEvent();
    this._initCSSEvent();
  }

  private _initJSEvent() {
    this._jsCategoryEl.addEventListener('add-link', () => {
      const modalContent = createModalContent();
      const button = createButtonEl('Save');
      button.addEventListener('click', () => {
        const valueEl = modalContent.querySelector('#input-value') as HTMLInputElement;
        this._jsCategory.addLink(valueEl.value);

        uploadLinkToCustomization(JS_MB, valueEl.value);

        this._modal.close();
      });

      this._modal.setTitle('Add link');
      this._modal.setContent(modalContent);
      this._modal.setFooter(button);
      this._modal.open();
    });

    this._jsCategoryEl.addEventListener('create-file', () => {
      const modalContent = createModalContent();
      const button = createButtonEl('Create');
      button.addEventListener('click', () => {
        const valueEl = modalContent.querySelector('#input-value') as HTMLInputElement;

        const fileName = getFileName(valueEl.value, 'js');

        if (fileName === null) return;

        const value = getDefaultSourceForNewFile(JS_MB);

        uploadFileToCustomization(JS_MB, fileName, value)
          .then(() => {
            this.rerender();
          })
          .catch((error: any) => {
            console.log(error);
          });

        this._modal.close();
      });

      this._modal.setTitle('Create file');
      this._modal.setContent(modalContent);
      this._modal.setFooter(button);
      this._modal.open();
    });

    this._jsCategoryEl.addEventListener('link-select', (event) => {
      console.log('link-select', event);
    });

    this._jsCategoryEl.addEventListener('file-select', (event: any) => {
      renderEditorValueByFileKey(this._editor, event.detail.fileKey);
    });
  }

  private _initCSSEvent() {
    this._cssCategoryEl.addEventListener('add-link', () => {
      const modalContent = createModalContent();
      const button = createButtonEl('Save');
      button.addEventListener('click', () => {
        const valueEl = modalContent.querySelector('#input-value') as HTMLInputElement;
        this._cssCategory.addLink(valueEl.value);

        uploadLinkToCustomization(CSS_MB, valueEl.value);

        this._modal.close();
      });

      this._modal.setTitle('Input link');
      this._modal.setContent(modalContent);
      this._modal.setFooter(button);
      this._modal.open();
    });

    this._cssCategoryEl.addEventListener('create-file', () => {
      const modalContent = createModalContent();
      const button = createButtonEl('Create');
      button.addEventListener('click', () => {
        const valueEl = modalContent.querySelector('#input-value') as HTMLInputElement;

        const fileName = getFileName(valueEl.value, 'css');

        if (fileName === null) return;

        const value = getDefaultSourceForNewFile(CSS_MB);

        uploadFileToCustomization(CSS_MB, fileName, value)
          .then(() => {
            this.rerender();
          })
          .catch((error: any) => {
            console.log(error);
          });

        this._modal.close();
      });

      this._modal.setTitle('Input file name:');
      this._modal.setContent(modalContent);
      this._modal.setFooter(button);
      this._modal.open();
    });

    this._cssCategoryEl.addEventListener('link-select', (event) => {
      console.log('link-select', event);
    });

    this._cssCategoryEl.addEventListener('file-select', (event: any) => {
      renderEditorValueByFileKey(this._editor, event.detail.fileKey);
    });
  }

  private _initData() {
    renderCustomization(JS_MB, this._jsCategory, this._editor);
    renderCustomization(CSS_MB, this._cssCategory, this._editor);
  }

  constructor(modal: Modal, editor: any) {
    this._initProps(modal, editor);
    this._initData();
    this._initLayout();
    this._initEvent();
  }

  render() {
    return this.el;
  }

  rerender() {
    this._cssCategory.reset();
    this._jsCategory.reset();

    renderCustomization(JS_MB, this._jsCategory, this._editor);
    renderCustomization(CSS_MB, this._cssCategory, this._editor);
  }
}
