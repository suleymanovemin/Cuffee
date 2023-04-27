import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";

function About() {
  
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/products")
  //     .then((a) => a.json())
  //     .then((data) => setData(data));
  // }, []);
  return (
    <>
    <Helmet>
      <title>Haqqımızda</title>
    </Helmet>
    
    
    <div></div>
    </>
  );
}

export default About;
