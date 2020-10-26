/*
 * js-edit Plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */

import Toolbar from '../components/toolbar/index';
import CustomList from '../components/custom-list/index';
import Editor from '../components/editor/index';

import './index.css';

const rootEl = document.getElementById('jsedit-config');

const toobar = new Toolbar();
const toolbarEl = toobar.render();
rootEl.appendChild(toolbarEl);

toolbarEl.addEventListener('save', () => {
  console.log('save');
});

toolbarEl.addEventListener('discard', () => {
  console.log('discard');
});

toolbarEl.addEventListener('back-to-plugins', () => {
  console.log('back-to-plugins');
});

toolbarEl.addEventListener('help', () => {
  console.log('help');
});

toolbarEl.addEventListener('max-min-toggle', () => {
  console.log('max-min-toggle');
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

