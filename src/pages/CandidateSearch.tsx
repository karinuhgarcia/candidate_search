import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  async function searchGitHubForUsers() {
    await searchGithub()
  }
  useEffect(() => { //pass in a funct. anytime x-data changes
    searchGitHubForUsers()
    return () => {
    }
  }, [])

  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
