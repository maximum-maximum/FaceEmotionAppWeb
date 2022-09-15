export class Utils {
  errorOutput: string;

  constructor(errorOutput: string) {
    this.errorOutput = errorOutput;
  }

  createFileFromUrl(path: string, url: string, callback: any) {
    let cv = (window as any).cv;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = function (ev) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          let data = new Uint8Array(request.response);
          cv.FS_createDataFile("/", path, data, true, false, false);
          callback();
        } else {
          // self.printError(
          //   "Failed to load " + url + " status: " + request.status
          // );
        }
      }
    };
    request.send();
  }
}

// export default Utils;
