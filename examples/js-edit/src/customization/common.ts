import {uploadFile, getFile, getCustomization, updateCustomization} from '../services/index';
import {JS_PC, JS_MB, CSS_PC, CSS_MB, DEFAULT_SOURCE} from '../constant';
import {Category} from '../components/custom-list/category/index';

export function getFileName(fileName: string, ext: 'js' | 'css') {
  const result = ext === 'js' ? fileName.match(/[^\\]*\.js$/g) : fileName.match(/[^\\]*\.css$/g);
  if (result === null) {
    return `${fileName}.${ext}`;
  }
  return fileName;
}

export function dispatchCustomEvent(el: HTMLElement, eventName: string, detail?: any) {
  const customEvent = new CustomEvent(eventName, {
    detail,
    bubbles: true,
    composed: true
  });
  el.dispatchEvent(customEvent);
}

export function getDefaultSourceForNewFile(type: CustomizationType) {
  return DEFAULT_SOURCE[type];
}

function _getEditorMode(customKey: CustomizationType) {
  switch (customKey) {
    case JS_PC:
    case JS_MB:
      return 'ace/mode/javascript';
    case CSS_PC:
    case CSS_MB:
      return 'ace/mode/css';

    default:
      return 'ace/mode/javascript';
  }
}

export function renderEditorValueByFileKey(customKey: CustomizationType, editor: any, fileKey: string) {
  getFile(fileKey).then((file: any) => {
    editor.ace.setValue(file);
    editor.ace.getSession().setMode(_getEditorMode(customKey));
  }).catch((err: any) => {
    console.log(err);
  });
}

export function renderCustomization(type: string, category: Category, editor: any) {
  return new kintone.Promise((resolve: any, reject: any) => {
    let customizations: any = [];
    getCustomization().then((customization: any) => {
      switch (type) {
        case JS_PC:
          customizations = customization.desktop.js;
          break;
        case CSS_PC:
          customizations = customization.desktop.css;
          break;
        case JS_MB:
          customizations = customization.mobile.js;
          break;
        case CSS_MB:
          customizations = customization.mobile.css;
          break;
        default:
          break;
      }

      if (!Array.isArray(customizations) || customizations.length === 0) {
        resolve();
        return;
      }

      customizations.forEach((item: any) => {
        if (item.type === 'FILE') {
          category.createFile(item.file.name, item.file.fileKey);
          getFile(item.file.fileKey).then((file: any) => {
            editor.ace.setValue(file);
            resolve(item);
          }).catch((err: any) => {
            console.log(err);
            reject(err);
          });
        }

        if (item.type === 'URL') {
          category.addLink(item.url);
        }
      });
    });
  });
}

export function uploadFileToCustomization(type: CustomizationType, fileName: string, value: string, currentFileKey?: string) {
  let newFileKey = '';
  return uploadFile(fileName, value)
    .then((file: any) => {
      newFileKey = file.fileKey;
      return getCustomization();
    }).then((customization: any) => {
      const content = _createUpdatingFileContent(type, customization, newFileKey, currentFileKey);
      const newCustomization = _createUpdatingCustomization(type, customization, content);

      // const invalidCustomizationsLimit = checkValidCustomizationLimit(newCustomization);
      // if (invalidCustomizationsLimit.length > 0) {
      //   var errMsg = invalidCustomizationsLimit.map(function (type) {
      //       return i18n.msg_max_customizations_limit.replace('<LIMIT_NUMBER>', MAX_CUSTOMIZATION)
      //           .replace('<CUSTOMIZATION_TYPE>', i18n[type]);
      //   }).join('\n');
      //   return kintone.Promise.reject(invalidCustomizationsLimit);
      // }
      return updateCustomization(newCustomization).then((resp: any) => {
        console.log(resp);
        return kintone.Promise.resolve();
      }).catch((error: any) => {
        console.log(error);
        return kintone.Promise.reject();
        // throw i18n.msg_failed_to_update
      });
    }).catch((error: any) => {
      console.log(error);
      return kintone.Promise.reject();
    });
}

export function uploadLinkToCustomization(type: CustomizationType, link: string) {
  getCustomization()
    .then((customization: any) => {
      const content = _createUpdatingLinkContent(type, customization, link);
      const newCustomization = _createUpdatingCustomization(type, customization, content);

      // const invalidCustomizationsLimit = checkValidCustomizationLimit(newCustomization);
      // if (invalidCustomizationsLimit.length > 0) {
      //   var errMsg = invalidCustomizationsLimit.map(function (type) {
      //       return i18n.msg_max_customizations_limit.replace('<LIMIT_NUMBER>', MAX_CUSTOMIZATION)
      //           .replace('<CUSTOMIZATION_TYPE>', i18n[type]);
      //   }).join('\n');
      //   return kintone.Promise.reject(invalidCustomizationsLimit);
      // }

      return updateCustomization(newCustomization).then((resp: any) => {
        console.log(resp);
      }).catch((error: any) => {
        console.log(error);
        // throw i18n.msg_failed_to_update
      });
    });
}

function _createUpdatingLinkContent(type: CustomizationType, customization: any, link: string) {
  let customizationInfos = _getCustomizationPart(type, customization);
  customizationInfos = _createUpdatingLinks(customizationInfos, link);
  return customizationInfos;
}

function _createUpdatingFileContent(type: CustomizationType, customization: any, newFileKey: string, currentFileKey?: string) {
  let customizationInfos = _getCustomizationPart(type, customization);
  customizationInfos = _createUpdatingFiles(customizationInfos, newFileKey, currentFileKey);

  return customizationInfos;
}

function _createUpdatingCustomization(type: CustomizationType, customization: any, content: any) {
  const newCustomization = customization;
  switch (type) {
    case JS_PC:
      newCustomization.desktop.js = content;
      break;
    case JS_MB:
      newCustomization.mobile.js = content;
      break;
    case CSS_PC:
      newCustomization.desktop.css = content;
      break;
    case CSS_MB:
      newCustomization.mobile.css = content;
      break;
  }

  return newCustomization;
}


function _getCustomizationPart(type: string, customization: any) {
  switch (type) {
    case JS_PC:
      return customization.desktop.js;
    case JS_MB:
      return customization.mobile.js;
    case CSS_PC:
      return customization.desktop.css;
    case CSS_MB:
      return customization.mobile.css;
    default:
      return [];
  }
}

function _createUpdatingFiles(customizationInfos: any, newFileKey: string, currentFileKey?: string) {
  if (!currentFileKey) {
    // Creating new file
    customizationInfos.push({
      file: {fileKey: newFileKey},
      type: 'FILE',
    });
  } else {
    // Updating old file
    customizationInfos.forEach((item: any, index: any) => {
      if (item.type === 'FILE' && item.file.fileKey === currentFileKey) {
        customizationInfos[index].file = {fileKey: newFileKey};
      }
    });
  }

  return customizationInfos;
}

function _createUpdatingLinks(customizationInfos: any, link: string) {
  customizationInfos.push({
    url: link,
    type: 'URL',
  });

  return customizationInfos;
}