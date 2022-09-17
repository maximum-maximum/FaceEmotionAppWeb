import Utils from "../utils";

const Prediction = (props) => {
  const { img } = props;

  const detecet = () => {
    const utils = new Utils("errorMessage");
    const faceCascadeFile = "haarcascade_frontalface_default.xml";
    utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
      const src = cv.imread(img);
      let gray = new cv.Mat();
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
      const faces = new cv.RectVector();
      let faceCascade = new cv.CascadeClassifier();
      faceCascade.load(faceCascadeFile);
      let msize = new cv.Size(0, 0);
      faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
      for (let i = 0; i < faces.size(); ++i) {
        let roiGray = gray.roi(faces.get(i));
        let roiSrc = src.roi(faces.get(i));
        let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
        let point2 = new cv.Point(
          faces.get(i).x + faces.get(i).width,
          faces.get(i).y + faces.get(i).height
        );
        cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
        roiGray.delete();
        roiSrc.delete();
      }
      gray.delete();
      cv.imshow("dest-canvas", src);
    });
  };

  return (
    <div>
      <h3>Emotion Prediction</h3>
      <div className="bottom-content">
        <div className="selected-image">
          <a id="selected-image"></a>
          <canvas id="face-canvas"></canvas>
        </div>
        <div className="res">
          <a id="res"></a>
          <table className="result-table" id="result-table">
            <tr>
              <th id="emotion"></th>
              <th id="accuracy"></th>
            </tr>
            <tr className="result">
              <td className="emotion"></td>
              <td className="accuracy"></td>
            </tr>
            <tr className="result">
              <td className="emotion"></td>
              <td className="accuracy"></td>
            </tr>
            <tr className="result">
              <td className="emotion"></td>
              <td className="accuracy"></td>
            </tr>
            <tr className="result">
              <td className="emotion"></td>
              <td className="accuracy"></td>
            </tr>
            <tr className="result">
              <td className="emotion"></td>
              <td className="accuracy"></td>
            </tr>
            <tr className="result">
              <td className="emotion"></td>
              <td className="accuracy"></td>
            </tr>
            <tr className="result">
              <td className="emotion"></td>
              <td className="accuracy"></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
