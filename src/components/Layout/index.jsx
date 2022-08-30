import React from "react";
import { Layout } from "antd";
import Table from "../../pages/Table";
import Map from "../../pages/Map";
import "./layout.css";

const { Sider, Content } = Layout;

const _Layout = () => {
  const ref = React.useRef(null);
  const refLeft = React.useRef(null);
  const [width, setWidth] = React.useState(600);

  React.useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let x = 0;
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableEle.style.width = `${width}px`;
      width < 150 ? setWidth(150) : setWidth(width);
    };
    const onMouseUpLeftResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };
    const onMouseDownLeftResize = (event) => {
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };
    const resizerLeft = refLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);
    return () => {
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
    };
  }, []);

  return (
    <Layout style={{ height: "100vh", width: "100wh" }}>
      <Sider collapsed collapsedWidth={width} className="container">
        <div ref={ref} className="resizeable">
          <Table />
          <div ref={refLeft} className="resizer resizer-l"></div>
        </div>
      </Sider>
      <Layout>
        <Content>
          <Map />
        </Content>
      </Layout>
    </Layout>
  );
};
export default _Layout;
