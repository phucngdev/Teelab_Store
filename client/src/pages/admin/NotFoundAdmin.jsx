import { Button, Result } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const NotFoundAdmin = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>TEELAB</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate("/admin")}>
            Back Home
          </Button>
        }
      />
    </>
  );
};

export default NotFoundAdmin;
