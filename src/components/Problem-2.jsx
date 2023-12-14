import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";

const Problem2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllContacts, setShowAllContacts] = useState(false)
  const [allContacts, setAllContacts] = useState([])
    useEffect(()=>{
        fetch("https://contact.mediusware.com/api/contacts/?page=1")
        .then(res=> res.json())
        .then(data=> setAllContacts(data.results))
    },[])

    const handleAllContacts = ()=>{
        setShowAllContacts(true)
        setIsModalOpen(false)
    }

    const handleUSContacts = ()=>{
        const usContacts = allContacts.filter(contact=> contact?.country?.name === "United States")
        setAllContacts(usContacts)
        setIsModalOpen(false)
    }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
          {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="d-flex justify-content-center gap-3">
              <button onClick={handleAllContacts} className="btn btn-lg btn-outline-primary" type="button">
                All Contacts
              </button>
              <button onClick={handleUSContacts} className="btn btn-lg btn-outline-warning" type="button">
                US Contacts
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-lg btn-outline"
                type="button"
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
      </div>
      {/* table */}
      <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Number</th>
                <th scope="col">Region</th>
              </tr>
            </thead>
            <tbody>

            {
                showAllContacts && allContacts?.map(contact=>  <tr key={contact.id}>
                    <td>{contact?.phone}</td>
                    <td>{contact?.country?.name}</td>
                  </tr>)
            }
           
              

            </tbody>
          </table>
    </div>
  );
};

export default Problem2;
