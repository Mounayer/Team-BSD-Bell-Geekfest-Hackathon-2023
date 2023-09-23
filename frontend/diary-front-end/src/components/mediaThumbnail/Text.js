import React from "react";
import { GrDocumentTxt } from "react-icons/gr";

const Text = () => {
  const style = { color: "red", fontSize: "65px" }
  return (
    <div style={{
      color: "red"
    }}>
      <GrDocumentTxt style={style} />
    </div>
  );
};

export default Text;
