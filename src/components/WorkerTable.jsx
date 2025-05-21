import { useState } from "react";

export default function WorkerTable({ worker_list, isDetail = false }) {
  const [searchType, setSearchType] = useState("byName");
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("전체");

  const filteredWorkers = worker_list.filter((worker) => {
    if (searchType === "byName") {
      return worker.name.includes(search.trim());
    } else if (searchType === "byStatus") {
      if (selectedStatus === "전체") {
        return worker_list;
      }
      return worker.status === selectedStatus;
    }
    return true;
  });
  return (
    <>
      <div className="table-container">
        <table className="worker-table">
          <thead>
            <tr className="table-search">
              <th colSpan={6}>
                <div className="search-container">
                  {/* 이름검색 라디오버튼 */}
                  <div>
                    <label>
                      <input
                        className="radio"
                        type="radio"
                        name="searchType"
                        value="byName"
                        checked={searchType == "byName"}
                        onChange={() => {
                          setSearchType("byName");
                          setSearch("");
                        }}
                      ></input>
                      이름으로 검색
                    </label>
                    <input
                      id="search"
                      name="search"
                      className="search-field"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      disabled={searchType !== "byName"}
                    />
                  </div>
                  {/* 상태별 분류 라디오버튼 */}
                  <div>
                    <label>
                      <input
                        className="radio"
                        type="radio"
                        name="searchType"
                        value="byStatus"
                        checked={searchType == "byStatus"}
                        onChange={() => {
                          setSearchType("byStatus");
                          setSelectedStatus("전체");
                        }}
                      ></input>
                      상태별 분류
                    </label>
                    <select
                      id="status"
                      className="search-field"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      disabled={searchType !== "byStatus"}
                    >
                      <option value="전체">전체</option>
                      <option value="정상">정상</option>
                      <option value="위험">위험</option>
                    </select>
                  </div>
                </div>
              </th>
            </tr>
            <tr className="table-header">
              <th>상태</th>
              <th>이름</th>
              {!isDetail && <th>현재 위치</th>}
              <th className="id-row">웨어러블 ID</th>
              <th>호출</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.map((worker, i) => {
              let tmp = "";
              if (worker.status == "위험") {
                tmp = "critical";
              }
              return (
                <tr key={i} className={tmp}>
                  <td>{worker.status}</td>
                  <td>{worker.name}</td>
                  {!isDetail && <td>{worker.zone}</td>}
                  <td className="id-row">{worker.wearableId}</td>
                  <td style={{ fontSize: "1.2rem" }}>🚨</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
