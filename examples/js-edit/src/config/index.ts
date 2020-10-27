import {Locales} from '../config/locales';
import {Guide} from '../config/guide';

const lang = kintone.getLoginUser().language;

function i18n() {
  if (lang === 'en') return Locales.en;
  if (lang === 'ja') return Locales.ja;
  if (lang === 'zh') return Locales.zh;
  return Locales.en;
}

function getUserGuildUrl() {
  if (lang === 'en') return Guide.en;
  if (lang === 'ja') return Guide.ja;
  if (lang === 'zh') return Guide.zh;
  return Guide.en;
}

export {i18n, getUserGuildUrl};