import { useEffect, useState } from "react";
import Axios from "axios";
import { Image } from "cloudinary-react"
function App() {

  const [img, setimg] = useState("");
  const [data, setdata] = useState({});

  const UploadImage = () => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "guydx3xf");
    formData.append("cloud_name", "dt6unpuse");

    Axios.post("https://api.cloudinary.com/v1_1/dt6unpuse/image/upload", formData).then((res) => {
      console.log(res);
      setdata(res.data);
    })
  }

  useEffect(()=>{
    console.log(data.url);
  })

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <input type="file" onChange={(e) => { setimg(e.target.files[0]) }}></input>
        <button onClick={UploadImage}>Upload</button>

        <img style={{width : 300}} src={data.url}/>
        {/* <Image style={{width : 300}} cloudName="dt6unpuse" publicId={data.url.toString()} /> */}
        
      </div>

    </>
  );
}

export default App;