import React from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Flex, Col, Row } from 'antd';
import './style/index.scss';
import { topicTest } from './utils';
import { useNavigate } from 'react-router-dom';
import clientRoute from '../../config/clientRoute';

const HomeScreen = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    const handlerChangeToPage = (route: string) => {
        navigate(route)
    }
    return (
    <>
        <Row style={{ marginTop: "25vh" }}>
            {topicTest.map((item) => (
                <Col xs={24} xl={8}> 
                    <Button className='button-main-home' key={item.id}  onClick={() => handlerChangeToPage(item.link)}>
                        <p>{t(`${item.title}`)}</p>
                        <p>{t(`${item.topic}`)}</p>
                    </Button>
                </Col>
            ))}
        </Row>
    </>
    )
}

export default HomeScreen