import { Button, Col, Input, Modal, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../../helps/api";
import axios from "axios";
import Cookies from "universal-cookie";
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

const Subteacher = () => {
  const token = cookies.get("token");
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [profile, setProfile] = useState({});
  const [resources, setResources] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [open, setOpen] = useState(false);
  const [newReq, setNewReq] = useState({ id: null, req: 0,done: 0 });
  const [reqlist,SetReqList] = useState([])
  const getSubjects = () => {
    axios.get(`${api}/subjects/all`).then((res) => {
      setAllSubjects(res.data);
    });
  };
  const getTeachers = () => {
    axios
      .get(`${api}/admin/home`, {
        headers: {
          "x-auth-token-admin": `${token}`,
        },
      })
      .then((res) => {
        let options = [];
        res.data.passwords.map((item) => {
          options.push({
            label: item.full_name,
            value: item.username,
          });
        });
        setTeachers(options);
        getSubjects();
      });
  };
  const getTeacherInfo = (username) => {
    axios.get(`${api}/teachers/profile/${username}`).then((res) => {
      getResources();
      getTeacherStat(username);
      getReqList()
      setProfile(res.data);
      
    });
  };
  const getResources = () => {
    console.log(teacher);
    axios
      .get(`${api}/admin/getResources/${teacher}`, {
        headers: {
          "x-auth-token-admin": `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setResources(res.data.resources);
        setSubjects(res.data.subjects);
      });
  };
  const getTeacherStat = (username) => {
    axios
      .get(`${api}/admin/get-stat/${username}`, {
        headers: {
          "x-auth-token-admin": `${token}`,
        },
      })
      .then((res) => {
        setRequirements(res.data);
      });
  };
  const addSubject = () => {
    axios
      .get(`${api}/admin/add_subject/${subject}/${profile._id}`, {
        headers: {
          "x-auth-token-admin": `${token}`,
        },
      })
      .then((res) => {
        getSubjects();
        getResources();
      });
  };
  const deleteBook = (_id) => {
    axios
      .delete(`${api}/admin/delete-book/${_id}`, {
        headers: {
          "x-auth-token-admin": `${token}`,
        },
      })
      .then((res) => {
        getTeachers();
      });
  };
  const deleteResource = (id) => {
    axios
      .delete(`${api}/admin/delete-resource/${id}`, {
        headers: {
          "x-auth-token-admin": `${token}`,
        },
      })
      .then((res) => {
        getResources();
      });
  };
  const deleteArticle = (_id) => {
    axios
      .delete(`${api}/admin/delete-article/${_id}/`, {
        headers: {
          "x-auth-token-admin": `${token}`,
        },
      })
      .then((res) => {
        getTeachers();
      });
  };
  const removeSubject = (_id) => {
    console.log(profile);
    axios.get(`${api}/admin/remove_subject/${_id}/${profile._id}`, {
      headers: {
        "x-auth-token-admin": `${token}`,
      },
    });
  };
  const addRequirement = (newReq) => {
    axios.post(
      `${api}/admin/add-requirements`,
      {
        values: {req: newReq.req,done: newReq.done},
        _id: profile._id,
        list_id: newReq.id
      },
      {
        headers: {
          "x-auth-token-admin": `${token}`,
        },
      }
    );
  };
  const getReqList = ()=>{
    axios.get(`${api}/admin/get-reqList`,{
      headers: {
        "x-auth-token-admin": `${token}`,
      },
    }).then(res=>{
      SetReqList(res.data)
    })
  }
  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div style={{ gap: "10px" }}>
      <h1 style={{ marginBottom: "10px" }}>O'qituvchini tanlang</h1>
      <Select
        allowClear
        style={{
          width: "100%",
          marginBottom: "10px",
        }}
        placeholder="O'qituvchilarni tanlang"
        options={teachers}
        onChange={(val) => {
          setTeacher(val);
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          setProfile(null);
          getTeacherInfo(teacher);
        }}
        style={{ marginBottom: "10px" }}
      >
        Ma'lumot
      </Button>
      <h2>Yuklangan adabiyotlar</h2>
      {profile ? (
        <div style={{ marginBottom: "20px" }}>
          <h3>Kitoblar</h3>
          <div>
            <ul>
              {profile.books && profile.books.length != 0 ? (
                profile.books.map((item, key) => (
                  <li key={key}>
                    {item.name} -{" "}
                    <Button
                      onClick={() => {
                        deleteBook(item._id);
                      }}
                    >
                      Delete
                    </Button>
                  </li>
                ))
              ) : (
                <>Kitoblar mavjud emas</>
              )}
            </ul>
          </div>
          <h3>Maqolalar</h3>
          <div>
            {profile.articles && profile.articles.length != 0 ? (
              profile.articles.map((item, key) => (
                <li>
                  {item.title} -{" "}
                  <Button
                    onClick={() => {
                      deleteArticle(item._id);
                    }}
                  >
                    Delete
                  </Button>
                </li>
              ))
            ) : (
              <>Maqolalar mavjud emas</>
            )}
          </div>
        </div>
      ) : (
        <p>Ma'lumot yuklanmoqda</p>
      )}
      <h2>Yuklangan fan resurslari</h2>
      <table style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <th>№</th>
          <th>Nomi</th>
          <th>Mavzu</th>
          <th>Fan</th>
          <th>Fan turi</th>
          <th>Resurs turi</th>
          <th>Action</th>
        </thead>
        <tbody>
          {resources && resources.length ? (
            resources.map((item, key) => (
              <tr>
                <td>{key + 1}</td>
                <td>{item.name}</td>
                <td>{item.theme.name ? item.theme.name : ""}</td>
                <td>{item.subject.subject_name}</td>
                <td>{item.subject_type}</td>
                <td>{item.resource_type}</td>
                <td>
                  <Button
                    onClick={() => {
                      deleteResource(item._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Resurslar mavjud emas</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Fanlar ro'yxati</h2>
        <table style={{ width: "100%", marginBottom: "20px" }}>
          <thead>
            <th>№</th>
            <th>Nomi</th>
            <th>Qisqa nomi</th>
            <th>Semester</th>
            <th>Action</th>
          </thead>
          <tbody>
            {subjects ? (
              subjects.map((item, key) => (
                <tr>
                  <td>{key + 1}</td>
                  <td>{item.subject_name}</td>
                  <td>{item.short_name}</td>
                  <td>{item.semester}</td>
                  <td>
                    <Button
                      onClick={() => {
                        removeSubject(item._id);
                      }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}></td>
              </tr>
            )}
          </tbody>
        </table>
        <Select
          allowClear
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
          placeholder="Fan tanlang"
          options={allSubjects.map((subject) => {
            return { label: subject.subject_name, value: subject._id };
          })}
          onChange={(val) => {
            setSubject(val);
          }}
        />
        <Button onClick={addSubject}>Add subject</Button>
      </div>
      <div>
        <h2>Majburiyatlar bo'yicha statistika</h2>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
          style={{ marginBottom: "10px" }}
        >
          Yangi majburiyat
        </Button>
      
        <br />
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
              <Select
                allowClear
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
                placeholder="Majburiyatni tanlang"
                options={reqlist.map(e=>{return {label:e.name,value: e._id}})}
                onChange={(val) => {
                    setNewReq({...newReq,id: val});
                }}
              />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <p>Talab </p>
              <Input
                type="number"
                placeholder="1"
                onChange={(e) => setNewReq({ ...newReq, req: e.target.value })}
                value={newReq.req}
              />
            </Col>
          </Row>
        </Modal>
       
        {requirements.length ? (
          <Bar
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
      </div>
    </div>
  );
};
export default Subteacher;
