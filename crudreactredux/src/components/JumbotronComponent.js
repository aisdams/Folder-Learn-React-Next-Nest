import React from "react";
import { Container } from "reactstrap";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const JumbotronComponent = (props) => {
  return (
    <Container>
      <div className="jumbotron mt-3">
        <h1 className="display-4">{props.title}</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classNamees for typography and spacing to space
          content out within the larger container.
        </p>
        <Button className="dark" href="/">
          <FontAwesomeIcon icon={faInfo} />
          Learn more
        </Button>
      </div>
    </Container>
  );
};

export default JumbotronComponent;
