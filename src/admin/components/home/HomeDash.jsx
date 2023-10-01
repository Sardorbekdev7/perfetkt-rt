import { Button, Col, Input, Modal, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../../helps/api";
import axios from "axios";
import Cookies from "universal-cookie";
import "../../admin/styles/App.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Hodimning majburiyatlari",
    },
  },
};

const cookies = new Cookies();
const HomeDash = () => {
    const token = cookies.get("token");
    const [catName, setCatName] = useState("");
    const [openCat, setOpenCat] = useState(false);
    const [open, setOpen] = useState(false);
    const [categories,setCategories] = useState([])
    const [newReq,setNewReq] = useState({name: "",parent: null})
    const addCategory = () => {
        axios.post(
          `${api}/admin/add-category`,
          {
            category: catName
          },
          {
            headers: {
              "x-auth-token-admin": `${token}`,
            },
          }
        );
      };
    
    const getCategoires = ()=>{
        //get-categories
        axios
        .get(`${api}/admin/get-categories`, {
        headers: {
            "x-auth-token-admin": `${token}`,
        },
        })
        .then((res) => {
        setCategories(res.data);
        });
    }
    const addRequirement = ()=>{
        axios.post(
            `${api}/admin/add-reqList`,
            {
              ...newReq
            },
            {
              headers: {
                "x-auth-token-admin": `${token}`,
              },
            }
          ).then(res=>{
            setNewReq({name: "",parent: null});
            window.location.reload(true)
          });
    }
      useEffect(() => {
        getCategoires()
      }, []);
    return <>
        <h1>Statistika</h1>
        <Modal
          title="Majburiyat kategoriyasini qo'shish"
          centered
          open={openCat}
          onOk={() => {
            addCategory(newReq);
            setOpenCat(false);
          }}
          onCancel={() => setOpenCat(false)}
          width={1000}
        >
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <p>Kategoriya nomi </p>
              <Input
                placeholder="Kategoriya nomi"
                onChange={(e) => setCatName(e.target.value)}
                value={catName}
              />
            </Col>
          </Row>
        </Modal>
        <Modal
          title="Majburiyat qo'shish"
          centered
          open={open}
          onOk={() => {
            addRequirement(newReq);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <Row>
            <Col lg={12} md={24} sm={24} xs={24}>
              <p>Majburiyat nomi </p>
              <Input
                placeholder="Majburiyat nomi"
                onChange={(e) => setNewReq({ ...newReq, name: e.target.value })}
                value={newReq.name}
              />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <p>Kategoriya: </p>
              <Select
                allowClear
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
                placeholder="Kategoriyalarni tanlang"
                options={categories.map(e=>{return {label:e.name,value: e._id}})}
                onChange={(val) => {
                    setNewReq({...newReq,parent: val});
                }}
              />
            </Col>
          </Row>
        </Modal>
       
        <Button
          type="primary"
          onClick={() => {
            setOpenCat(true);
          }}
          style={{ margin: "10px" }}
        >
          Majburiyat kategoriyasini qo'shish
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
          style={{ margin: "10px" }}
        >
          Majburiyat qo'shish
        </Button>
    </>
}

export default HomeDash