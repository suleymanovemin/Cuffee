import { Collapse } from "antd";
const { Panel } = Collapse;
const text1 = `
Məhsulu səbətə əlavə etdikdən sonra "Sifariş et" butonuna klik etməyiniz kifayətdir`;
const text2 = `
"Bütün məhsullar" bölməsinə keçid edərək görə bilərsiz
`;
const text3 = `
Qeydiyatdan keçərək giriş edə bilərsiz
`;
const text4 = `
Profil hissəsindən şifənizi dəyişə bilərsiz
`;
const text5 = `
Bəli,bütün şəxsi məlumatlarınız qorunur
`;
const AccordionMenu = () => {
  return (
    <div className="quality">
      <div className="container">
        <div className=" qualityImage">
          <img
            src="https://images.unsplash.com/photo-1514066558159-fc8c737ef259?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            alt=""
          />
        </div>
        <div className="accordion">
          <Collapse accordion>
            <Panel header="Necə sifariş edə bilərəm?" key="1">
              <p>{text1}</p>
            </Panel>
            <Panel header="Bütün məhsulları necə görə bilərəm?" key="2">
              <p>{text2}</p>
            </Panel>
            <Panel header="Necə giriş edə bilərəm?" key="3">
              <p>{text3}</p>
            </Panel>
            <Panel header="Şifrəmi necə dəyişə bilərəm?" key="4">
              <p>{text4}</p>
            </Panel>
            <Panel header="Məlumatlarım qorunur?" key="5">
              <p>{text5}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default AccordionMenu;
