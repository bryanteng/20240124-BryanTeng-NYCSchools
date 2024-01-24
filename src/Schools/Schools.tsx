import React, {useState, useEffect } from 'react';
import { School } from '../util'
import SchoolTable from '../SchoolTable/SchoolTable'
import InputButton from '../InputButton/InputButton'
import { getSchools} from '../api'
import "./Schools.css"

const Schools = () => {
  const [schools, setSchools ] = useState<School[]>([])
  const [page, setPage] = useState<number>(0)
  const [numResults, setNumResults] = useState<number>(10)

  useEffect(() => {
      getSchools().then( schools => setSchools(schools))
  }, [])

  const handlePageButtonClick = (e: React.MouseEvent<HTMLElement>) =>{
    const target = e.target as HTMLInputElement
    const id = target?.id

    if(id === "increment" && (page+1)*numResults < schools.length){
      setPage((prevPage) => prevPage + 1);

    } else if(id === 'decrement' && page >= 0) {
      setPage((prevPage) => prevPage - 1);

    }
  }

  const handlePagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setPage(isNaN(newValue) && newValue >= 0 ? 0 : newValue);
  };

  const handleNumResultsButtonClick = (e: React.MouseEvent<HTMLElement>) =>{
    const target = e.target as HTMLInputElement
    const id = target?.id

    if(id === "increment"){
      setNumResults((prevNum) => prevNum + 1);

    } else if(id === 'decrement') {
      setNumResults((prevNum) => prevNum - 1);

    }
  }

  const handleNumResultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setNumResults(isNaN(newValue) || newValue < 10 ? 10 : newValue);
  };

  return (
    <div>
    <h1 aria-label="NYC Schools List"> NYC Schools List </h1>
    <div className="tableHeader">
      <label> page number: </label>
      <InputButton value={page} onChange={handlePagesChange} />
      <label> number of results: </label>
      <InputButton value={numResults} onChange={handleNumResultsChange} />
      <div>  total number of schools: {schools.length} </div>
    </div>
    {schools.length > 0 ? <SchoolTable data={schools.slice(page*numResults,page*numResults+ numResults)} /> : null}
    </div>
  )
}

export default Schools;
