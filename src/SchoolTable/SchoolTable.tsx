import React, { useMemo, useState, useEffect } from 'react';
import { COLUMNS } from '../util'
import { useTable, useGlobalFilter } from 'react-table';
import { fetchSchoolSATScores } from '../api'
import './SchoolTable.css'
import SchoolDetailsModal from '../SchoolDetails/SchoolDetailsModal'

// needed to open Modal in case of empty SAT data
const emptySATSchoolObject = {
  dbn: "",
  school_name: "",
  num_of_sat_test_takers:"",
  sat_critical_reading_avg_score: "",
  sat_math_avg_score:"",
  sat_writing_avg_score: ""
}

const SchoolTable: React.FC<{ data: any[] }> = ({ data }) => {
  // create row number column
  const rowNum = {
      Header: '#',
      id: 'index',
      accessor: (_row: any, i : number) => i + 1
    }

  // hover cell for full text from span since cell isn't big enough to show all data some times
  const interestsCol =  {
        Header: 'interests',
        accessor: 'interest1',
        Cell: (row:any) => <div><span title={row.value}>{row.value}</span></div>
    }
  const eligibilityCol = {
        Header: 'eligibility1',
        accessor: 'eligibility1',
        style: { 'overflow': 'hidden' },
        Cell: (row:any) => <div><span title={row.value}>{row.value}</span></div>
    }

  const columns = useMemo(() => [rowNum, ...COLUMNS, interestsCol, eligibilityCol], []);

  const [selectedSchool, setSelectedSchool] = useState<any>(null)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  // globalFilter filters all the data currently in the table and not all the data in the app
  // *TODO* fix this to filter all data and display the first X number of results instead
  // *TODO* add sort and filter to columns
  const { globalFilter } = state;

  // when user clicks on a row, sends out a fetch call for SAT scores. If no SAT score is found, modal should still open but display no SAT score found
  const onRowClick = (event: any, row:any) => {
    try {
      fetchSchoolSATScores(row.dbn).then(schoolDetails => {
        console.log('schoooldeta', schoolDetails)
        if(schoolDetails === undefined){
          setSelectedSchool(emptySATSchoolObject)
        } else {
          setSelectedSchool(schoolDetails)
        }
        setSelectedRow(row)
      })
    } catch (error) {
      console.error('Error fetching school details:', error);
    }
  }

  // allows users to hit excape key intead of close button to close modal
  useEffect(() => {
       const close = (e:any) => {
         if(e.keyCode === 27){
           setSelectedSchool(null)
         }
       }
       window.addEventListener('keydown', close)
     return () => window.removeEventListener('keydown', close)
   },[])

  return (
    <div className="tableContainer">
        <SchoolDetailsModal
          isOpen={!!selectedSchool}
          onClose={() => setSelectedSchool(null)}
          schoolDetails={selectedSchool}
          row={selectedRow}
        />
        <div className="search-container">
            <input
                aria-label="School Table text filter"
                type="text"
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="filter table"
            />
        </div>
        <table {...getTableProps()} aria-label="Schools Table">
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr className="table-row" {...row.getRowProps()} onClick={(e) => onRowClick(e,row.original)}>
                            {row.cells.map((cell,index) => {
                                return (
                                    <td id="content" {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  );
};

export default SchoolTable;
