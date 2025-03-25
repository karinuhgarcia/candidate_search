import Candidate from "../interfaces/Candidate.interface";
import { useEffect, useState } from "react";

const SavedCandidates = () => {

  const [savedCandidateData, setsavedCandidateData] = useState<Candidate[]>([])

  useEffect(() => {
    const localStorageData: string | null = localStorage.getItem('potentialCandidates')
    if (localStorageData != null) {
      const Data = JSON.parse(localStorageData)
      console.log(Data)
      setsavedCandidateData(Data)
    }
  }, [])

  const rejectCandidate = (candidateToRemove: Candidate) => {
    // remove the potential candidate from the savedCandidateData list
    const newList = savedCandidateData.filter((candidateInList) => candidateInList.Username != candidateToRemove.Username)
    setsavedCandidateData(newList)
  }
  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidateData.length > 0 ?
        <table className="table">
          <thead>
            <tr>
              <td className='center'>Image</td>
              <td className='center'>Name</td>
              <td className='center'>Location</td>
              <td className='center'>Email</td>
              <td className='center'>Company</td>
              <td className='center'>Bio</td>
              <td className='center'>Reject</td>
            </tr>
          </thead>
          <tbody>
            {savedCandidateData.map((candidate, index) =>
              <tr key={index}>
                <td className='center'><img src={candidate.Avatar ?? ''} className="avatar" /></td>
                <td>{candidate.Name}</td>
                <td>{candidate.Location}</td>
                <td>{candidate.Email}</td>
                <td>{candidate.Company}</td>
                <td>{candidate.Bio}</td>
                <td className='center'><button id='minus_button' onClick={() => rejectCandidate(candidate)}>-</button></td>
              </tr>)}
          </tbody>
        </table>
        : <></>}

    </>
  );
};

export default SavedCandidates;
