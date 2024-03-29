import React from 'react';
import './SchoolDetailsModal.css'
import {School} from '../util'

interface SchoolDetails {
  dbn: string
  school_name: string
  num_of_sat_test_takers:string
  sat_critical_reading_avg_score: string
  sat_math_avg_score:string
  sat_writing_avg_score: string
}

interface SchoolDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolDetails: SchoolDetails;
  row: School;
}

const SchoolDetailsModal: React.FC<SchoolDetailsModalProps> = ({ isOpen, onClose, schoolDetails, row }) => {
  if (!isOpen) {
    return null;
  }

  // schoolDetails comes from the SAT data fetch call, destructured data here, example data structure below
  // [{"dbn":"18K566","school_name":"BROOKLYN GENERATION SCHOOL","num_of_sat_test_takers":"29","sat_critical_reading_avg_score":"374","sat_math_avg_score":"377","sat_writing_avg_score":"394"}]
  const {num_of_sat_test_takers, sat_critical_reading_avg_score, sat_math_avg_score, sat_writing_avg_score } = schoolDetails

  // row is the school data that we pulled from the initial useEffect, can destructure any of the properties of a School from here
  const { school_name , website, overview_paragraph, phone_number, fax_number, primary_address_line_1, state_code, zip} = row

  // checks if SAT data is available, displays not found if there was nothing
  const isSATEmpty = num_of_sat_test_takers === ""
  function renderSATScores(){
    return isSATEmpty ? <div> ** SAT data not found ** </div> :
    <div>
      <h3>number of SAT Takers: {num_of_sat_test_takers}</h3>
      <h4>
        critical reading average score: {sat_critical_reading_avg_score}
        <br/>
        math average score: {sat_math_avg_score}
        <br/>
        writing average score: {sat_writing_avg_score}
      </h4>
    </div>
  }

  function renderContactInfo(){
    // renders contact info, add more if needed
    return <>
            <h1>{school_name}</h1>
            <h3> website:  <a href={website} target="_blank" rel="noreferrer noopener"> {website} </a> </h3>
            <h3> phone number: {phone_number} </h3>
            <h3> fax number: {fax_number} </h3>
            <h3> address: {primary_address_line_1} {state_code} {zip}</h3>
          </>
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
      {renderContactInfo()}
        <p>{overview_paragraph}</p>
        {renderSATScores()}

        {/* Render other details from schoolDetails if needed */}
        <button onClick={onClose} aria-label="Close modal"> Close </button>

      </div>
    </div>
  );
};

export default SchoolDetailsModal;
