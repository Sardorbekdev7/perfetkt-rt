import { Button, Col, Input, Modal, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../../helps/api";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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
import { Bar } from "react-chartjs-2";
import Cookies from 'universal-cookie';
const cookies = new Cookies()
const HomeDash = () => {
    const token = cookies.get('token');
    const [requirements,setRequirements] = useState([]);
    const [requireList,setRequireList] = useState([]);
    const [dones, setDones] = useState([])
    const [teacher,setTeacher] =useState({})
    const [open,setOpen] = useState(false)
    const [done,setDone] = useState({require: null,link: ""})
    const getDash=()=>{
        axios.get(`${api}/teachers/requirements`,{
            headers: {
                'x-auth-token': token
            }
        }).then(res=>{
            console.log(res.data)
            setRequirements(res.data.teacher.requirements)
            setTeacher(res.data.teacher)
            setRequireList(res.data.requirementList)
            setDones(res.data.dones)
        })
    }
    const doRequire = ()=>{
        axios.post()
        axios.post(`${api}/teachers/do-require`,done,{
            headers: {
                'x-auth-token': token
            }
        }).then(res=>{
            console.log(res)
        })
    }
    useEffect(()=>{
        getDash();
    },[])
    return <>
        <h1>{teacher.full_name}</h1>
        
        {requirements.length ? (
          <Bar
          style={{
            maxWidth: "100%"
          }}
            options={options}
            data={{
              labels: requirements.map((e) => e.name),
              datasets: [
                {
                  label: "Bajarilgan",
                  backgroundColor: "rgb(13, 245, 5)",
                  data: requirements.map((e) => e.done),
                },
                {
                  label: "Majburiyat",
                  backgroundColor: "rgb(250, 15, 15)",
                  data: requirements.map((e) => e.req),
                },
              ],
            }}
          />
        ) : (
          "Statistika mavjud emas"
        )}
        
        <div style={{
            marginTop: "50px"
        }}>
        <Button type="primary" onClick={()=>setOpen(true)}>Majburiyatni bajarish</Button>
        <h2>Majburiyatlaringiz uchun yuklagan ma'lumotlaringiz</h2>
        {dones&&dones.length?dones.map((value,index)=>(
            <li><a href={value.link}>{value.link}</a> - {value.require.name}</li>
        )):"..."}

        <Modal
          title="Majburiyat qo'shish"
          centered
          open={open}
          onOk={() => {
            doRequire();
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <Row>
            <Col lg={12} md={24} sm={24} xs={24}>
              <p>Majburiyatni tanlang: </p>
              <Select
                allowClear
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
                placeholder="Majburiyatni tanlang"
                options={requireList.map(e=>{return {label:e.name,value: e._id}})}
                onChange={(val) => {
                    setDone({...done,require: val});
                }}
              />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>Tekshiruv uchun link yuboring</p>
                <Input onChange={e=>setDone({...done,link: e.target.value})} value={done.link} placeholder="Link jo'nating"/>
            </Col>
          </Row>
        </Modal>
        </div>
    </>
}

export default HomeDash