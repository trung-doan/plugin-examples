export function uploadFile(fileName: string, fileValue: any) {
  return new kintone.Promise((resolve: any, reject: any) => {
    const blob = new Blob([fileValue], { type: 'text/javascript' });
    const formData = new FormData();
    formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());
    formData.append('file', blob, fileName);
    const url = kintone.api.url('/k/v1/file', true);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // success
        resolve(JSON.parse(xhr.responseText));
      } else {
        // error
        reject(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(formData);
  });
}

export function getFile(fileKey: string) {
  return new kintone.Promise((resolve: any, reject: any) => {
    const url = kintone.api.urlForGet('/k/v1/file', {fileKey});
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.responseType = 'blob';
    xhr.onload = function() {
      if (xhr.status === 200) {
        // success
        const fileReader = new FileReader();

        fileReader.onload = function(e) {
          resolve(fileReader.result);
        };

        const blob = new Blob([xhr.response]);
        fileReader.readAsText(blob);
      } else {
        console.log(xhr.status);

        const fileReader = new FileReader();

        fileReader.onload = function(e) {
          console.log(fileReader.result);
        };

        const blob = new Blob([xhr.response]);
        fileReader.readAsText(blob);
        // error
        reject(xhr.response);
      }
    };
    xhr.send();
  });
}

export function getCustomization() {
  const params = {app: kintone.app.getId()};
  return kintone.api(
    kintone.api.url('/k/v1/preview/app/customize', true),
    'GET',
    params
  );
}

export function updateCustomization(data: any) {
  data.app = kintone.app.getId();
  return kintone.api(
    kintone.api.url('/k/v1/preview/app/customize', true),
    'PUT',
    data
  );
}

export function deployApp() {
  const params = {apps: [{app: kintone.app.getId()}]};
  return kintone.api(
    kintone.api.url('/k/v1/preview/app/deploy', true),
    'POST',
    params
  );
}
