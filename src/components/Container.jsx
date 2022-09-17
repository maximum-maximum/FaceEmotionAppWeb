import { useState } from "react";
import Detection from "./Detection";
import Prediction from "./Prediction";
import Lena from "../lena.jpg";

const Container = () => {
  const [img, setImg] = useState(Lena);

  return (
    <div className="container">
      <Detection img={img} setImg={setImg} />
      <Prediction img={img} />
    </div>
  );
};

export default Container;
