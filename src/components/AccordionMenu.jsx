import { Collapse } from "antd";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const AccordionMenu = () => {
  return (
    <div className="quality">
      <div className="container">
        <div className=" qualityImage">
          <img
            src="https://cdn.shopify.com/s/files/1/0606/8191/2503/files/ba26.jpg?v=1660017328"
            alt=""
          />
        </div>
        <div className="accordion">
          <Collapse accordion>
            <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="4">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="5">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="6">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default AccordionMenu;
