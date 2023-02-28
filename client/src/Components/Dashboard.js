import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";

import axios from "axios";
import { useNavigate } from "react-router";
function Dashboard() {
  const [file, setFile] = useState("");
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  let data;
  useEffect(() => {
    data = JSON.parse(localStorage.getItem("user"));
    // console.log(data);
    if (data == null) {
      navigate("/");
    }
    setUser(data);
    getFiles();
  }, [count]);

  const handler = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    let formdata = new FormData();
    formdata.append("file", file);
    formdata.append("name", `${user.emails[0].value}`);
    await axios
      .post("http://localhost:4000/fileUpload", formdata)
      .then((res) => {
        console.log(res);
        alert("file updated succesfully!!");
        document.getElementById("input").value = "";
        setCount(count + 1);
      });
  };
  const getFiles = async () => {
    await axios
      .post(`http://localhost:4000/getFiles?data=${data.emails[0].value}`)
      .then((res) => {
        setUploadedFiles(res.data.data.Contents);
      });
  };
  const downloadFile = async (key) => {
    await axios
      .post(`http://localhost:4000/getPresignedUrl?key=${key}`)
      .then((res) => {
        window.open(res.data.data, "_blank");
      });
  };
  const logout = () => {
    window.open(`http://localhost:4000/auth/logout`, "_self");
  };
  return (
    <div>
      <Button onClick={() => logout()}>Logout</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles &&
            uploadedFiles
              .filter((x) => {
                if (x.Key.includes(user.emails[0].value)) return true;
              })
              .map((ele, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ele?.Key?.split("-")[1]}</td>
                  <td>
                    <Button onClick={() => downloadFile(ele.Key)}>
                      {" "}
                      Download{" "}
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>

      <Form>
        <Form.Control
          id="input"
          type="file"
          placeholder="Upload Here"
          onChange={(e) => handler(e)}
          name="file"
        />
        <Button onClick={() => uploadFile()} variant="primary">
          Upload File
        </Button>
      </Form>
      {/* <Button onClick={() => getFiles()}>Get files</Button> */}
    </div>
  );
}

export default Dashboard;
