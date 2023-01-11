import React from "react";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import {
  faInfo,
  faEdit,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
//   import { Link } from "react-router-dom";

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
    headerStyle: () => {
      return { width: "5%" };
    },
  },
  {
    dataField: "nama",
    text: "Name",
    sort: true,
    filter: textFilter()
  },
  {
    dataField: "alamat",
    text: "Alamat",
    sort: true,
    filter: textFilter()
  },
  {
    dataField: "link",
    text: "Action",
    formatter: (rowContent, row) => {
      return (
        <div>
          {/* <Link to={"detail/" + row.id}> */}
          <Button color="dark" className="mr-5">
            <FontAwesomeIcon icon={faInfo} /> Detail
          </Button>
          {/* </Link> */}

          {/* <Link to={"edit/" + row.id}> */}
          <Button color="dark" className="mr-5">
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
          {/* </Link> */}

          <Button color="dark" className="mr-2">
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button>
        </div>
      );
    },
  },
];

const defaultSorted = [
  {
    dataField: "name",
    order: "asc",
  },
];

const TableComponent = (props) => {
  return (
    <Container className="mt-2">
      <BootstrapTable
        bootstrap4
        filter={ filterFactory() }
        keyField="id"
        defaultSorted={defaultSorted}
        pagination={ paginationFactory() }
        data={props.users}
        columns={columns}
      />
    </Container>
  );
};

export default TableComponent;
