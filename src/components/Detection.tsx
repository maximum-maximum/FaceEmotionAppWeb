import React, { useState } from "react";
import Lena from "../lena.jpg";
// import { Utils } from "../utils";
import * as cv from "@u4/opencv4nodejs";

const srcImg = document.getElementById("src-image");
const fileInput = document.getElementById("input-file");
const canvas = document.getElementById("dest-canvas");
const faceCanvas = document.getElementById("face-canvas");
const detectFaceBtn = document.getElementById("detectface-btn");
const predictBtn = document.getElementById("predict-btn");
const elements = document.querySelectorAll(".result");
// const ctx = canvas.getContext("2d");
let isInArea = false;
let isSelected = false;
let isDetected = false;
let continuous = false;
let targetId = null;
let src;
let src2;
let src3;
let faces;

/* Set the initial value */
// ctx.rect(0, 0, 0, 0);

class Utils {
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

const Detection: React.FC = () => {
  const [img, setImg] = useState<string>(Lena);
  const [outImg, setOutImg] = useState<string>(Lena);
  const [outMsg, setOutMsg] = useState<string>();

  const fileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files.item(0);
    if (file === null) return;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImg(reader.result as string);
    };
  };

  const detect = () => {
    const utils = new Utils("errorMessage");
    const faceCascadeFile = "haarcascade_frontalface_default.xml";

    src3 = cv.imread("../lena.jpg");
    src2 = cv.imread(Lena);
    src = cv.imread(img);

    cv.imshow("dest-canvas", src);

    utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
      // src = cv.imread(srcImg);
      // let gray = new cv.Mat();
      // cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
      // faces = new cv.RectVector();
      // let faceCascade = new cv.CascadeClassifier();
      // faceCascade.load(faceCascadeFile);
      // let msize = new cv.Size(0, 0);
      // faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
      // for (let i = 0; i < faces.size(); ++i) {
      //   let roiGray = gray.roi(faces.get(i));
      //   let roiSrc = src.roi(faces.get(i));
      //   let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
      //   let point2 = new cv.Point(
      //     faces.get(i).x + faces.get(i).width,
      //     faces.get(i).y + faces.get(i).height
      //   );
      //   cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
      //   roiGray.delete();
      //   roiSrc.delete();
      // }
      // gray.delete();
      // cv.imwrite("messigray.png", src);
      // cv.imshow("dest-canvas", src);
    });
    setOutMsg("Output");
    // document.getElementById("selected-image").innerText = "Selected Image";
    // document.getElementById("res").innerText = "Result";
    // document.getElementById("result-table").style.visibility = "visible";
    // document.getElementById("emotion").innerText = "Emotion";
    // document.getElementById("accuracy").innerText = "Accuracy";
    // elements.forEach((element) => {
    //   element.childNodes[1].innerText = "-";
    //   element.childNodes[3].innerText = "-";
    // });
    // fileInput.disabled = true;
    // detectFaceBtn.disabled = true;
    // isDetected = true;
  };

  return (
    <div className="face-detection">
      <h3>Face Detection</h3>
      <div className="upper-content">
        <div className="source">
          <a id="source">Source</a>
          <img id="src-image" src={img} alt="lena" />
          <input
            type="file"
            id="input-file"
            accept="image/*"
            onChange={fileInput}
          />
        </div>
        <div className="output">
          <a id="output">{outMsg}</a>
          <canvas id="dest-canvas"></canvas>
          <br />
          <input
            type="button"
            className="button"
            value="顔検出"
            id="detectface-btn"
            onClick={detect}
          />
          <input
            type="button"
            className="button"
            value="予測"
            id="predict-btn"
          />
          <input
            type="button"
            className="button"
            value="リセット"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    </div>
  );
};

export default Detection;
