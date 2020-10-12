import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Card, CardHeader, Divider, makeStyles } from "@material-ui/core";
import { API_URL } from "../../config/config";
import { tableIcons } from "../../utils/iconUtils";
import MaterialTable from "material-table";

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: "flex-end",
  },
}));

const DetailReports = ({ className, data, ...rest }) => {
  const classes = useStyles();

  const column = [
    { title: "Country/Region", field: "country" },
    {
      title: "Province/State",
      field: "state",
    },
    { title: "Total Cases", field: "totalCases" },
    { title: "Total Deaths", field: "totalDeaths" },
    {
      title: "Total Recovers",
      field: "totalRecovers",
    },
  ];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Covid-19 detail reports" />
      <Divider />
      <MaterialTable
        title=""
        columns={column}
        options={{
          search: true,
          debounceInterval: 500,
        }}
        data={(query) =>
          new Promise((resolve, reject) => {
            console.log(query);

            let sortParam =
              query.orderBy === undefined
                ? ""
                : "&sort=" + query.orderBy.field + "," + query.orderDirection;
            const filterParam = "?search=" + query.search;

            fetch(
              API_URL +
                "/covid/data-list" +
                filterParam +
                "&size=" +
                query.pageSize +
                "&page=" +
                query.page +
                sortParam
            )
              .then((res) => res.json())
              .then(
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
    </Card>
  );
};

DetailReports.propTypes = {
  className: PropTypes.string,
};

export default DetailReports;
