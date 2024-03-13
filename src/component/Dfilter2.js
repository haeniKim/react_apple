import React, { useEffect, useState } from "react";
import { Checkbox, Space, Row, Col, Flex } from "antd";

const Dfilter2 = ({ onFilterChange}) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const [checkedValues, setCheckedValues] = useState([]); // 체크된 값들을 저장하는 상태
    const [lastCheckedValue, setLastCheckedValue] = useState([]); // 체크된 값들 리스트

    const handleCheckboxChange = (checkedValues) => {
        console.log("1", checkedValues);
        setSelectedFilters(checkedValues); // 선택된 필터 정보 업데이트
        console.log("2", checkedValues);
        onFilterChange(checkedValues); // 선택된 필터 정보를 부모 컴포넌트로 전달
        console.log("3", checkedValues);
    };
    //console.log(checkedValues);    
    
    return (
        <>
        <Row style={{ width: '100%', height: '80px', backgroundColor: '#F2F2F2', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <span style={{ height: '80px', display: 'flex', alignItems: 'center'}}><b>Filter</b></span>
        </Row>
        <Row style={{ width: '100%', height: '100px'}}>
            <div style={{ height: '100px', marginLeft: '10%'}}><b>Locale</b></div>
        </Row>
        <Row>
            <Col style={{ width: '100%', marginLeft: '10%'}}>
                <Checkbox.Group
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: '100%',
                    }}
                    onChange={handleCheckboxChange}
                    value={selectedFilters}
                >
                    <Checkbox value="en-us">en-us</Checkbox>
                    <Checkbox value="ja-jp">ja-jp</Checkbox>
                    <Checkbox value="fr-fr">fr-fr</Checkbox>
                    <Checkbox value="ko-kr">ko-kr</Checkbox>
                    <Checkbox value="de-de">de-de</Checkbox>
                    <Checkbox value="zh-cn">zh-cn</Checkbox>
                    <Checkbox value="es-mx">es-mx</Checkbox>
                    <Checkbox value="pt-br">pt-br</Checkbox>
                </Checkbox.Group>
            </Col>
        </Row>
      </>
    );
  };
  export default Dfilter2;

  // 필터 선택시 테이블 페이지네이션에 관한 부분 다시 받아오기