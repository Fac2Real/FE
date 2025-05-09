import { useParams } from "react-router-dom";

export default function ZoneDetail() {
  const { zoneId } = useParams();
  
  // const sensorType = "temp";  // 여기에 원하는 센서 타입 입력
  // Kibana 대시보드 ID (미리 저장해둔 고정된 dashboard)
  const dashboardId = "469736c0-2c7b-11f0-b6d9-690198decade";
  // const kibanaUrl = `http://localhost:5601/app/dashboards#/view/${dashboardId}?embed=true&_g=(
  //   filters:!(
  //       (query:(match_phrase:(zoneId.keyword:${zoneId}))),
  //       (query:(match_phrase:(sensorType.keyword:${sensorType})))
  //     ),
  //   refreshInterval:(pause:!f,value:5000),
  //   time:(from:now-10m,to:now)
  // )`.replace(/\s+/g, "");

  const sensorTypes = ["temp", "humid"]; // 원하는 센서 타입들 추가

  const buildKibanaUrl = (sensorType) =>
    `http://localhost:5601/app/dashboards#/view/${dashboardId}?embed=true&_g=(
      filters:!(
        (query:(match_phrase:(zoneId.keyword:${zoneId}))),
        (query:(match_phrase:(sensorType.keyword:${sensorType})))
      ),
      refreshInterval:(pause:!f,value:5000),
      time:(from:now-10m,to:now)
    )`.replace(/\s+/g, "");


  return (
    <div style={{ width: "100%", height: "100%", padding: "2rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>Zone: {zoneId}</h2>
      <div style={{ display: "flex", gap: "2rem" }}>
        {sensorTypes.map((sensorType) => (
          <div key={sensorType} style={{ flex: 1 }}>
            <h3>Sensor: {sensorType}</h3>
            <iframe
              src={buildKibanaUrl(sensorType)}
              title={`Dashboard for ${zoneId} - ${sensorType}`}
              width="100%"
              height="500px"
              frameBorder="0"
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );


  // return (
  //   <div style={{ width: "100%", height: "100%" }}>
  //     <h2>Zone: {zoneId} | Sensor: {sensorType}</h2>
  //     <iframe
  //       src={kibanaUrl}
  //       title={`Dashboard for ${zoneId} - ${sensorType}`}
  //       width="50%"
  //       height="500px"
  //       frameBorder="0"
  //       style={{
  //         border: "1px solid #ccc",
  //         borderRadius: "12px",
  //         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  //         marginTop: "1rem",
  //         padding: "0", // padding은 iframe 자체엔 적용 안 됨
  //       }}
  //     />
  //   </div>
  // );

}
