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
                  <label>
                    <input
                      className="radio"
                      type="radio"
                      name="searchType"
                      value="byName"
                      checked={searchType == "byName"}
                      onChange={() => setSearchType("byName")}
                    ></input>
                    이름으로 검색
                  </label>
                  <label>
                    <input
                      className="radio"
                      type="radio"
                      name="searchType"
                      value="byStatus"
                      checked={searchType == "byStatus"}
                      onChange={() => setSearchType("byStatus")}
                    ></input>
                    상태별 분류
                  </label>
                  <span className={`search-field-wrapper ${searchType}`}>
                    {searchType && searchType === "byName" ? (
                      <div className="search-field fade-in">
                        <label htmlFor="search">검색어</label>
                        <input
                          id="search"
                          name="search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="search-field fade-in">
                        <select
                          id="status"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          <option value="전체">전체</option>
                          <option value="정상">정상</option>
                          <option value="위험">위험</option>
                        </select>
                      </div>
                    )}
                  </span>
                </div>
              </th>
            </tr>
            <tr className="table-header">
              <th>상태</th> {/* 초록색 빨간색 동그라미 */}
              {/* <th>직급</th> */}
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
                  {/* <td>{worker.role}</td> */}
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
