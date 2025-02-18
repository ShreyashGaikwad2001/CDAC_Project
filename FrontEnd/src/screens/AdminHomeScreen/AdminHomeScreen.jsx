import {
  MdGroup,
  MdLocalParking,
  MdAttachMoney,
  MdStore,
  MdReport,
  MdApproval,
} from "react-icons/md";
import "./AdminHomeScreen.css";

import { occupancy_data } from "../../components/admin/data/data";

import SimpleLineChart from "../../components/admin/LineGraph";
import StatusItem from "../../components/admin/StatusItem";
import MetricsItem from "../../components/admin/MetricsItem";

import AdminEntityDetails from "../../components/admin/AdminEntityDetails/AdminEntityDetails";

import { isLoggedIn } from "../auth/auth";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { backend } from "../../config";

export default function AdminHomeScreen() {
  const [upTime, setUpTime] = useState("DOWN");

  const [dbStatus, setDbStatus] = useState("DOWN");

  const [mailingServiceStatus, setMailingServiceStatus] = useState("DOWN");

  const [metrics, setMetrics] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
      axios.get(
        backend.url+"admin/uptime"
      ).then((res)=>{
        setUpTime(res.data);
      }).catch(()=>{});

      axios.get(
        backend.url+"admin/dbstatus"
      ).then((res)=>{
        setDbStatus(res.data);
      }).catch(()=>{});

      axios.get(
        backend.url+"admin/mailingServiceStatus"
      ).then((res)=>{
        setMailingServiceStatus(res.data);
      }).catch(()=>{});

      axios.get(
        backend.url+"admin/serviceMetrics"
      ).then((res)=>{
        setMetrics(res.data);
      }).catch(()=>{})

    }, [navigate]);

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#f0f0f0" }}>
        <div
          className="row justify-content-around"
          style={{ width: "90%", margin: "0 auto" }}
        >
          <h1 className="display-4 text-info">Admin Dashboard</h1>
        </div>

        <div
          className="container border border-success rounded text-success"
          style={{ fontWeight: 700, fontSize: "1.5em" }}
        >
          <div className="text-primary text-center">Status</div>
          <div className="row justify-content-between">
            <StatusItem
              title="Backend"
              items={["Main Server: 9443 "+upTime,"Mailing Server: "+mailingServiceStatus]}
            />
            <StatusItem title="Frontend" items={["Nginx server: 80 UP"]}/>
            <StatusItem title="Database" items={["MySql server: 3306 "+dbStatus]} />
          </div>
        </div>
        {/* <br></br> */}
        <div
          className="container border border-success rounded text-success"
          style={{ fontWeight: 700, fontSize: "1.5em" }}
        >
          <div className="text-primary  text-center">Metrics</div>
          <div className="row justify-content-center">
            <MetricsItem
              itemIcon={<MdGroup />}
              topRowItem= {metrics["UserCount"]}
              bottomRowItem="Users"
            />
            <MetricsItem
              itemIcon={<MdLocalParking />}
              topRowItem={metrics["LotCount"]}
              bottomRowItem="Lots"
            />
            <MetricsItem
              itemIcon={<MdStore />}
              topRowItem={metrics["AdvertiserCount"]}
              bottomRowItem="Advertisers"
            />
            <MetricsItem
              itemIcon={<MdReport />}
              topRowItem={metrics["ComplaintCount"]}
              bottomRowItem="Complaints"
            />
            <MetricsItem
              itemIcon={<MdAttachMoney />}
              topRowItem={metrics["RevinueAmount"]}
              bottomRowItem="Revinue"
            />
          </div>
        </div>
        <div className="container border border-success rounded text-success">
          <div className="col  m-4 p-4 align-content-center">
            <div className="row">
              <div
                className="col-4 align-content-center"
                style={{ fontSize: "4em" }}
              >
                Approve
                <MdApproval />
              </div>
              <div className="col text-center">
                <div className="row">
                  <MetricsItem
                    topRowItem={
                      <button
                        className="btn btn-lg btn-warning col m-2"
                        style={{ fontSize: "2em" }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lot&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </button>
                    }
                    col="col"
                  />
                  <MetricsItem
                    topRowItem={
                      <button
                        className="btn btn-lg btn-warning col m-2"
                        style={{ fontSize: "2em" }}
                      >
                        &nbsp;&nbsp;Manager&nbsp;&nbsp;
                      </button>
                    }
                    col="col"
                  />
                </div>
                <div className="row">
                  <MetricsItem
                    topRowItem={
                      <button
                        className="btn btn-lg btn-warning col m-2"
                        style={{ fontSize: "2em" }}
                      >
                        Advertiser
                      </button>
                    }
                    col="col"
                  />
                  <MetricsItem
                    topRowItem={
                      <button
                        className="btn btn-lg btn-warning col m-2"
                        style={{ fontSize: "2em" }}
                      >
                        &nbsp;&nbsp;&nbsp;Admin&nbsp;&nbsp;&nbsp;
                      </button>
                    }
                    col="col"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container border border-success rounded text-success">
          <div
            className="text-primary  text-center"
            style={{ fontWeight: 700, fontSize: "1.8em" }}
          >
            Peak Times
          </div>
          <SimpleLineChart data={occupancy_data} />
        </div>
      </div>
      <div className="bg-secondary" style={{height:"1rem"}}></div>
      <AdminEntityDetails />
    </>
  );
}
