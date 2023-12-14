import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [data, setData] = useState([])
  const [activeEntries, setActiveEntries] = useState([])
  const [completedEntries, setCompletedEntries] = useState([])
  const handleClick = (val) => {
    setShow(val);
    const selectedActive = data.filter(entry=> entry.status === "active")
    setActiveEntries(selectedActive)
    const selectedCompleted = data.filter(entry=> entry.status === "completed")
    setCompletedEntries(selectedCompleted)

     // Sort the data based on status
     const sortedData = data.sort((a, b) => {
      if (a.status === 'active' && b.status !== 'active') {
        return -1; // 'active' comes first
      } else if (a.status !== 'active' && b.status === 'active') {
        return 1; // 'active' comes second
      } else if (a.status === 'completed' && b.status !== 'completed') {
        return -1; // 'completed' comes after 'active'
      } else if (a.status !== 'completed' && b.status === 'completed') {
        return 1; // 'completed' comes after 'active'
      } else {
        return 0; // no change in order
      }
    });  
    setData(sortedData)
   

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form?.name?.value;
    const status = form?.status?.value;
    const entry = {name, status}
    setData([...data, entry])
    
    form.reset()
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {show === "all" &&
                data?.map((entry, idx)=> <tr key={idx}>
                  <td>{entry?.name}</td>
                  <td>{entry?.status}</td>
                </tr>)
              }
              {show === "active" &&
                activeEntries?.map((entry, idx)=> <tr key={idx}>
                  <td>{entry?.name}</td>
                  <td>{entry?.status}</td>
                </tr>)
              }
              {show === "completed" &&
                completedEntries?.map((entry, idx)=> <tr key={idx}>
                  <td>{entry?.name}</td>
                  <td>{entry?.status}</td>
                </tr>)
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
