import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const storedCandidates: Candidate[] = []
const CandidateSearch = () => { //creating component CandidateSearch
  async function searchGitHubForUsers() { //
    const results = await searchGithub()
    const candidates = []
    for (let i = 0; i < results.length; i++) {
      const result = results[i]
      const userName = result.login
      const candidateResult = await searchGithubUser(userName) // return the data as written by the api
      if (candidateResult == null)
        continue
      const candidate: Candidate = {
        Name: candidateResult.name,
        Username: userName,
        Location: candidateResult.location,
        Avatar: candidateResult.avatar_url,
        Email: candidateResult.email,
        Html_url: candidateResult.html_url,
        Company: candidateResult.company,
        Bio: candidateResult.bio
      }
      candidates.push(candidate)
    }
    setCandidateData(candidates) //updating the initial empty array 
  }
  useEffect(() => { //pass in a funct. anytime x-data changes
    searchGitHubForUsers() //fetching the data
  }, [])

  const plusButton = () => {
    //initial candidate within the candidate data array 
    const currentCandidate = candidateData[currentPosition]
    //pushing the candidate data into stored candidates, to save 
    storedCandidates.push(currentCandidate)
    console.log(storedCandidates)
    //store to local storage
    localStorage.setItem('potentialCandidates', JSON.stringify(storedCandidates))
    // move to the next index position in the candidate data array
    const newPosition = currentPosition + 1
    if (newPosition < candidateData.length) {
      // update the current position once we have moved to the next position 
      setCurrentPosition(newPosition)
    }
  }

  const minusButton = () => {
    const newPosition = currentPosition + 1
    if (newPosition < candidateData.length) {
      setCurrentPosition(newPosition)
    }
  }
  // defining using useState
  // variable, the method to call to change the state of the variable = useState(initial value)
  const [currentPosition, setCurrentPosition] = useState(0)

  const [candidateData, setCandidateData] = useState<Candidate[]>([])

  return <div id='content'>
    <h1>Candidate Search</h1>
    {candidateData.length > 0 ? <section id="candidate_card">
      <img src={candidateData[currentPosition].Avatar ?? ''} id='img_avatar' />
      <div id="candidate_info">
        <h4>{candidateData[currentPosition].Username ?? ''} </h4>
        <p>Location: {candidateData[currentPosition].Location ?? ''}</p>
        <p>Email: {candidateData[currentPosition].Email ?? ''} </p>
        <p>Company: {candidateData[currentPosition].Company ?? ''}</p>
        <p>Bio: {candidateData[currentPosition].Bio ?? ''}</p>
      </div>
      <div id='buttons'>
        <button id='minus_button' onClick={minusButton}>-</button>
        <button id='plus_button' onClick={plusButton}>+</button>
      </div>

    </section> : <p>Loading...</p>}
  </div>

};

export default CandidateSearch;
