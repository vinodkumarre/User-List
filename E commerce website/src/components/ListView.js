import React from "react"
import ApiCall from "./ApiCall";
import {} from "./ListView.css";

const List = () => {
  const [data] = ApiCall(" https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
  const buttonServer = (lent) =>{
    console.log(lent.id)

  }
  return(
    <>
      <table>
        <thead>
          <tr>
            <th><input type={"checkbox"}/></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td><input type={"checkbox"}/></td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td><button onClick={() => {buttonServer(item)}}>edit</button><button>delete</button></td>

              </tr>
            )
          })}
        </tbody>
      </table>
    </>   
  );
}
export default List;