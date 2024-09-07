import { Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";

const { Meta } = Card;

const ConnectApiContainer = () => {
  const [dataMovieList, setDataMoviceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.sampleapis.com/movies/animation"
        );
        const maxLength = 20;
        const conditionalItems =
          response.data.length > maxLength
            ? response.data.slice(0, maxLength)
            : response.data;
        setDataMoviceList(conditionalItems);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("dataMovieList", dataMovieList);

  return (
    <>
      {loading ? (
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      ) : (
        <Row gutter={[40, 32]}>
          {dataMovieList.map((item: any) => (
            <Col sm={8} xs={24} xl={8} lg={8} key={item?.id}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={item?.posterURL} />}
              >
                <Meta
                  title={item?.title}
                  description={`imdbId: ${item?.imdbId}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ConnectApiContainer;
