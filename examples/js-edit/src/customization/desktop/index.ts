
import {Category} from '../../components/custom-list/category/index';
import {Hierarchy} from '../../components/custom-list/hierarchy/index';
import {Modal} from '../../components/modal/index';
import {createModalContentRow} from '../modal/index';
import {renderCustomization, uploadFileToCustomization, uploadLinkToCustomization, renderEditorValueByFileKey,
  getDefaultSourceForNewFile, getFileName} from '../common';
import {JS_PC, CSS_PC, JS_MB, CSS_MB} from '../../constant';
import {showSpinner, hideSpinner} from '../../common/index';

export class Desktop {
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
    this._hierarchy = new Hierarchy('Desktop');
    this._jsCategory = new Category('Javascript', JS_PC);
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

  private _handleAddLinkEvent(category: Category, customKey: CustomizationType) {
    const textbox = new kintoneUIComponent.Text();
    const button = new kintoneUIComponent.Button({text: 'Save', type: 'normal'});
    button.on('click', () => {
      const link = textbox.getValue();
      category.addLink(textbox.getValue());
      uploadLinkToCustomization(customKey, link);

      this._modal.close();
    });

    this._modal.setTitle('Add Link');

    const contentEl = createModalContentRow(textbox, button);
    this._modal.setContent(contentEl);

    this._modal.open();
  }

  private _handleCreateFileEvent(customKey: CustomizationType) {
    const textbox = new kintoneUIComponent.Text();
    const button = new kintoneUIComponent.Button({text: 'Create', type: 'normal'});
    button.on('click', () => {
      const name = textbox.getValue();
      const fileName = getFileName(name, customKey === JS_PC ? 'js' : 'css');

      if (fileName === null) return;

      const value = getDefaultSourceForNewFile(customKey);
      showSpinner();
      uploadFileToCustomization(customKey, fileName, value)
        .then(() => {
          this.rerender();
        })
        .catch((error: any) => {
          console.log(error);
          hideSpinner();
        });

      this._modal.close();
    });

    this._modal.setTitle('Create file');

    const contentEl = createModalContentRow(textbox, button);
    this._modal.setContent(contentEl);

    this._modal.open();
  }

  private _handleFileSelectEvent(customKey: CustomizationType, editor: any, event: any) {
    renderEditorValueByFileKey(customKey, editor, event.detail.fileKey);
  }

  private _handleLinkSelectEvent(event: any) {
    console.log('link-select', event);
  }

  private _initJSEvent() {
    this._jsCategoryEl.addEventListener('add-link', () => this._handleAddLinkEvent(this._jsCategory, JS_PC));
    this._jsCategoryEl.addEventListener('create-file', () => this._handleCreateFileEvent(JS_PC));

    this._jsCategoryEl.addEventListener('link-select', (event) => this._handleLinkSelectEvent(event));
    this._jsCategoryEl.addEventListener('file-select', (event: any) => this._handleFileSelectEvent(JS_PC, this._editor, event));
  }

  private _initCSSEvent() {
    this._cssCategoryEl.addEventListener('add-link', () => this._handleAddLinkEvent(this._cssCategory, CSS_PC));
    this._cssCategoryEl.addEventListener('create-file', () => this._handleCreateFileEvent(CSS_PC));

    this._cssCategoryEl.addEventListener('link-select', (event) => this._handleLinkSelectEvent(event));
    this._cssCategoryEl.addEventListener('file-select', (event: any) => this._handleFileSelectEvent(CSS_PC, this._editor, event));
  }

  private _initData() {
    showSpinner();
    renderCustomization(JS_PC, this._jsCategory, this._editor).then(() => {
      return renderCustomization(CSS_PC, this._cssCategory, this._editor);
    }).then(() => {
      hideSpinner();
    }).catch(() => {
      hideSpinner();
    });
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
    this._jsCategory.reset();
    this._cssCategory.reset();

    renderCustomization(JS_PC, this._jsCategory, this._editor).then(() => {
      return renderCustomization(CSS_PC, this._cssCategory, this._editor);
    }).then(() => {
      hideSpinner();
    }).catch(() => {
      hideSpinner();
    });
  }
}
