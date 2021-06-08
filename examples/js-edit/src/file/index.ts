import {getCustomization,} from '../services/index';
const NO_FILE_KEY = '-1';

export function getCustomizationInfo() {
  return getCustomization().then((customization: any) => {
    const desktop = JSON.parse(JSON.stringify(customization.desktop));
    const mobile = JSON.parse(JSON.stringify(customization.mobile));

    return kintone.Promise.resolve({desktop, mobile});
  });
}

export function addNewTempFile(fileName: string) {
  const newFileInfo = {
    type: 'FILE',
    file: {
      fileKey: NO_FILE_KEY,
      name: fileName,
    },
  };

  // switch (app.currentType) {
  //   case 'js_pc':
  //     app.customization.desktop.js.push(newFileInfo);
  //     break;
  //   case 'js_mb':
  //     app.customization.mobile.js.push(newFileInfo);
  //     break;
  //   case 'css_pc':
  //     app.customization.desktop.css.push(newFileInfo);
  //     break;
  // }

  return newFileInfo;
}

