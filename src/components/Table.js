import React from 'react'
function Table({data}){
    if (!(data))
    {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    const table=data.map(
        (d, id)=>{
            return(
                <tr key={id}>
                    <td>{id}</td>
                    <td>{d.name}</td>
                    <td>{d.description}</td>
                    <td>{d.created_at}</td>
                    <td>{d.open_issues}</td>
                    <td>{d.language}</td>
                </tr>
            )
        }
    )
 
    return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Open Issues</th>
                    <th>Languages</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>
             
        </div>
    )
 }
 
 export default Table;