import React from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../../utils/iconUtils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { authGet } from "../../api";
import { Link } from "react-router-dom";

function UserList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);

  const column = [
    { title: "Full Name", field: "person.fullName" },
    {
      title: "Status",
      field: "status",
      lookup: {
        PARTY_ENABLED: "PARTY_ENABLED",
        PARTY_DISABLED: "PARTY_DISABLED",
      },
    },
    { title: "Type", field: "partyType.partyTypeId" },
    { title: "Created Date", field: "createdDate", type: "date" },
    {
      title: "User Name",
      field: "userLogin.userLoginId",
      render: (rowData) => (
        <Link to={"/userLogin/" + rowData.partyId}>
          {rowData.userLogin.userLoginId}
        </Link>
      ),
    },
    { title: "Party Code", field: "partyCode" },
  ];

  return (
    <MaterialTable
      title="User List"
      columns={column}
      options={{ search: true }}
      data={(query) =>
        new Promise((resolve, reject) => {
          console.log(query);

          let sortParam =
            query.orderBy === undefined
              ? ""
              : "&sort=" + query.orderBy.field + "," + query.orderDirection;
          const filterParam = "?search=" + query.search;

          authGet(
            dispatch,
            token,
            "/users" +
              filterParam +
              "&size=" +
              query.pageSize +
              "&page=" +
              query.page +
              sortParam
          ).then(
            (res) => {
              console.log(res);
              if (res !== undefined && res !== null)
                resolve({
                  data: res.content,
                  page: res.number,
                  totalCount: res.totalElements,
                });
              else reject();
            },
            (error) => {
              console.log(error);
              reject();
            }
          );
        })
      }
      icons={tableIcons}
    />
  );
}

export default UserList;
