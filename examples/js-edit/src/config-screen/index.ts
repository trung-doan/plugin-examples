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

import './index.css';

const resource = i18n();
const rootEl = document.getElementById('jsedit-config');

const toobar = new Toolbar();
const toolbarEl = toobar.render();
rootEl.appendChild(toolbarEl);

const secondToolbar = new SecondToolbar();
const secondToolbarEl = secondToolbar.render();
rootEl.appendChild(secondToolbarEl);

secondToolbarEl.addEventListener('onChange', (event) => {
  console.log('change', event);
});

toolbarEl.addEventListener('save', () => {
  console.log('save');
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

const contentEl = document.createElement('div');
contentEl.className = 'js-edit__content';
rootEl.appendChild(contentEl);

const customList = new CustomList();
const customListEl = customList.render();
contentEl.appendChild(customListEl);

const editor = new Editor();
const editorEl = editor.render();
contentEl.appendChild(editorEl);

