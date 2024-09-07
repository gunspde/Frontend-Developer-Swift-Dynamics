import React, { useEffect, useState } from 'react'
import { Button, Flex, Col, Row } from 'antd';
import './style/index.scss';
import { useTranslation } from 'react-i18next';

const arr = [
    {id: 1, style: 'square'}, 
    {id: 2, style: 'circle'}, 
    {id: 3, style: 'oval'},
    {id: 4, style: 'trapezoid'},
    {id: 5, style: 'rectangle'},
    {id: 6, style: 'parallelogram'}
]

const LayoutAndShapeScreen = () => {
    const { t } = useTranslation();
    const [data, setData] = useState(arr)
    const [isSwapped, setIsSwapped] = useState(false);

    const shiftArrayLeftToRight = () => {
        setData(prevArray => {
            if (prevArray?.length > 0) {
              const [firstElement, ...rest] = prevArray;
              return [...rest, firstElement];
            }
            return prevArray;
          });
    }

    const shiftArrayRightToLeft = () => {
        setData(prevArray => {
          if (prevArray?.length > 0) {
            const lastElement = prevArray[prevArray?.length - 1];
            const restOfArray = prevArray?.slice(0, -1);
            return [lastElement, ...restOfArray];
          }
          return prevArray;
        });
    };

      const swapArrayParts = (arr: any) => {
        const firstHalf = arr?.slice(0, 3);
        const secondHalf = arr?.slice(3, 6);
        return secondHalf.concat(firstHalf);
      };
    

      const handleSwap = () => {
        if (isSwapped) {
            setData(swapArrayParts(data)); 
        } else {
            setData(swapArrayParts(data)); 
        }
        setIsSwapped(!isSwapped);
      };

      const shuffleArray = () => {
        let shuffledArray = [...data];
        for (let i = shuffledArray?.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        setData(shuffledArray)
      };

  return (
    <>
        <Row style={{ marginTop: "10vh" }} gutter={[16, 24]}>
            <Col sm={8} xs={24} xl={8} lg={8}> 
            <Button className='button-main-home' onClick={() => shiftArrayRightToLeft()}>
                <div className='triangle-left'></div>
                <p className='text-controll'>{t(`MOVE_SHAPE`)}</p>
            </Button>
            </Col>
            <Col sm={8} xs={24} xl={8} lg={8}> 
            
            <Button className='button-main-home' onClick={() => handleSwap()}>
                <Row>
                    
                <Col span={12}> 
                <div className='triangle-up'></div>
                </Col>
                <Col span={12}> 
                <div className='triangle-down'></div>
                <p className='text-controll' style={{ marginLeft: '-31px' }}>{t(`MOVE_POSITION`)}</p>
                </Col> 
                </Row>
            </Button>
            </Col>
            <Col sm={8} xs={24} xl={8} lg={8}> 
            <Button className='button-main-home' onClick={() => shiftArrayLeftToRight()}>
                <div className='triangle-right'></div>
                <p className='text-controll'>{t(`MOVE_SHAPE`)}</p>
            </Button>
            </Col>
        </Row>
        <hr />
    
        <Row gutter={[8, 24]} style={{ marginTop: "10vh" }}>
            {data.map((num, index) => (
                <Col span={8}  key={num.id}>
                    <Button className='button-main-home' onClick={() => shuffleArray()}>
                       <div className={num.style}></div>
                    </Button>   
                </Col>
            ))}
        </Row>
    
    </>
  )
}

export default LayoutAndShapeScreen