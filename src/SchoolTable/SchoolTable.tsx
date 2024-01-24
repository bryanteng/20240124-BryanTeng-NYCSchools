import React, { useMemo, useState, useEffect } from 'react';
import { COLUMNS } from '../util'
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import { fetchSchoolSATScores } from '../api'
import './SchoolTable.css'
import SchoolDetailsModal from '../SchoolDetails/SchoolDetailsModal'

const emptySATSchoolObject = {
  dbn: "",
  school_name: "",
  num_of_sat_test_takers:"",
  sat_critical_reading_avg_score: "",
  sat_math_avg_score:"",
  sat_writing_avg_score: ""
}

const SchoolTable: React.FC<{ data: any[] }> = ({ data }) => {
  const columns = useMemo(() => COLUMNS, []);

  const [selectedSchool, setSelectedSchool] = useState<any>(null)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,

  );

  const { globalFilter } = state;

  const onRowClick = (event: any, row:any) => {
    console.log("rowclick", row.dbn, event.target)
    // if(event.target.id === "website") return;
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

  // const tableInstance = useTable({ columns, data }, useGlobalFilter);

  const cellTrim = (cell: string) => {
    if(cell && cell.length > 50){
      return cell.slice(0,50)
    }
    return cell
  }

  useEffect(() => {
       const close = (e:any) => {
         if(e.keyCode === 27){
           setSelectedSchool(null)
         }
       }
       window.addEventListener('keydown', close)
     return () => window.removeEventListener('keydown', close)
   },[])


  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //         useTable({ columns, data });
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
                type="text"
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="filter table"
            />
        </div>
        <table {...getTableProps()}>
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
                            {row.cells.map((cell) => {
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
