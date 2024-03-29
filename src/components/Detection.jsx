import React, { useState } from "react";
import Lena from "../lena.jpg";

const Detection = () => {
  const [img, setImg] = useState(Lena);
  const fileInput = (e) => {
    if (e.target.files === null) return;

    const file = e.target.files.item(0);
    if (file === null) return;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImg(reader.result);
    };
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
          <a id="output"></a>
          <canvas id="dest-canvas"></canvas>
          <br />
          <input
            type="button"
            className="button"
            value="顔検出"
            id="detectface-btn"
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
