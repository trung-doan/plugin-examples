/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */

import Toolbar from '../components/toolbar/index';
import SecondToolbar from '../components/second-toolbar/index';
import CustomList from '../components/custom-list/index';
import Editor from '../components/editor/index';
import {confirmDiscard} from '../common/index';
import UserGuid from '../components/user-guide/index';
import {i18n, getUserGuildUrl} from '../config/index';
import {Modal} from '../components/modal/index';
import {Desktop} from '../customization/desktop/index';
import {Mobile} from '../customization/mobile/index';
import {uploadFileToCustomization} from '../customization/common';
import './index.css';
import * as Eslint from '../../vendor/eslint';
import FeatureBox from '../components/feture-box/index';
import es5Rule from '../../vendor/eslint-es5';
import es6Rule from '../../vendor/eslint-es6';
const resource = i18n();
let selectFileKey: string = '';
let selectFileName: string = '';
let customizationType: CustomizationType = '';

const editor = new Editor();
const featureBox = new FeatureBox();
const toobar = new Toolbar();
const secondToolbar = new SecondToolbar();
const contentEl = document.createElement('div');
const editorWrapperEl = document.createElement('div');
editorWrapperEl.classList.add('jsedit__editor-wrapper');

const customList = new CustomList();
const modal = new Modal();
const desktop = new Desktop(modal, editor);
const mobile = new Mobile(modal, editor);

const rootEl = document.getElementById('jsedit-config');
const toolbarEl = toobar.render();
const secondToolbarEl = secondToolbar.render();
const customListEl = customList.render();
const desktopEl = desktop.render();
const mobileEl = mobile.render();

contentEl.className = 'js-edit__content';

rootEl.appendChild(toolbarEl);
rootEl.appendChild(secondToolbarEl);
rootEl.appendChild(contentEl);
rootEl.appendChild(modal.render());
customListEl.appendChild(desktopEl);
customListEl.appendChild(mobileEl);

editorWrapperEl.appendChild(editor.render());
editorWrapperEl.appendChild(featureBox.render());

contentEl.appendChild(customListEl);
contentEl.appendChild(editorWrapperEl);

secondToolbarEl.addEventListener('onChange', (event) => {
  console.log('change', event);
});

const eslintInstance = new Eslint.Linter();

const lintEditor = () => {
  const eslintRule = featureBox.getType() === 'es6' ? es6Rule : es5Rule;

  const lintResults = eslintInstance.verify(editor.getValue(), eslintRule);
  let messages = '';
  lintResults.forEach((result: any) => {
    console.log(result);
    messages += (`[ESLint] Line ${result.line}, ${result.message} (${result.ruleId})\n`);
  });
  featureBox.getBoxContent().innerText = messages;
};

editor.on('change', () => {
  lintEditor();
});
featureBox.on('changeType', () => {
  lintEditor();
});

toolbarEl.addEventListener('save', () => {
  uploadFileToCustomization(customizationType, selectFileName, editor.getValue(), selectFileKey)
    .then(() => {
      desktop.rerender();
      mobile.rerender();
    })
    .catch((error: any) => {
      console.log(error);
    });
});

toolbarEl.addEventListener('discard', () => {
  console.log('discard');
});

toolbarEl.addEventListener('back-to-plugins', () => {
  // TODO: (app.modeifiedFile && !confirmDiscard())
  if (!confirmDiscard()) return;
  window.history.back();
});

toolbarEl.addEventListener('help', () => {
  const userGuid = new UserGuid({
    links: getUserGuildUrl()
  });
  rootEl.appendChild(userGuid.render());
});

toolbarEl.addEventListener('max-min-toggle', () => {
  const minMaxEl = rootEl.querySelector('.js-edit__toolbar .js-edit__toolbar__group__btn.min-max-btn');
  const isMaximize = rootEl.classList.contains('maximize');
  if (isMaximize) {
    rootEl.classList.remove('maximize');
    minMaxEl.textContent = resource.MAXIMIZE;
  } else {
    rootEl.classList.toggle('maximize');
    minMaxEl.textContent = resource.MINIMIZE;
  }
});

desktopEl.addEventListener('file-select', (event: any) => {
  selectFileKey = event.detail.fileKey;
  selectFileName = event.detail.fileName;
  customizationType = event.detail.customizationType;
});

mobileEl.addEventListener('file-select', (event: any) => {
  selectFileKey = event.detail.fileKey;
  selectFileName = event.detail.fileName;
  customizationType = event.detail.customizationType;
});
