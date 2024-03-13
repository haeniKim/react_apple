import React, { useEffect, useState } from 'react';
import { Row, Col, Layout, Table, Input, Button, Modal } from "antd";
import Dtop5 from './Dtop5';
import Dfilter2 from './Dfilter2';
import qs from 'qs';
import axios from 'axios';


const { Search } = Input; // 검색바

const columns = [
    {
      title: 'Date',
      dataIndex: 'Date',
      sorter: (a, b) => new Date(a.Date) - new Date(b.Date),
      width: '20%',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      sorter: (a, b) => a.Title.localeCompare(b.Title),
      render: (text) => <span dangerouslySetInnerHTML={{ __html: text }} />,
      width: '20%',
    },
    {
      title: 'Author',
      dataIndex: 'Author',
      sorter: (a, b) => a.Author.localeCompare(b.Author),
    },
    {
      title: 'Score',
      dataIndex: 'Score',
      sorter: (a, b) => a.Score - b.Score,
    }
  ];


const Dtable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState([]); // 추가
  const [pagination, setPagination] =  useState({
    current: 1,
    pageSize:10,
    total: 0,
  })

  const [total, setTotal] = useState(0);
  const [took, setTook] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null); // 선택한 항목

  const [top5, setTop5] = useState([    {
    "key": "",
    "doc_count": ""
},
{
    "key": "",
    "doc_count": ""
},
{
    "key": "",
    "doc_count": ""
},
{
    "key": "",
    "doc_count": ""
},
{
    "key": "",
    "doc_count": ""
}])

  const fetchEs = async (pagination, filters) => {
      setLoading(true);
      console.log("query: ", query)
      console.log("fetchEs: ", filters)

      axios({
          method: "POST",
          url: "http://localhost:8090/search/",
          headers: {
              "Content-Type": "application/json"
          },
          data: {
              query: query || '', // 검색 쿼리 사용
              filters: filters,
              params: { 
                pagination : { 
                    current: pagination.current, 
                    pageSize: pagination.pageSize
                },
               // sorter: sorter // -------추가한 부분
              },  // from, size로 정보 넘기기
          },
      })
          .then((response) => {
              const responseData = response.data;
              const total = responseData[0]['total'];
              const took = responseData[1]['took'];
              const hits = responseData[2];

              const mappedData = Object.keys(hits).map(key => ({
                  key: key,
                  Date: hits[key].Date,
                  Title: hits[key].Title,
                  Author: hits[key].Author,
                  Score: hits[key].Score,
                  Content: hits[key].Content, // 상세 페이지
                  Locale: hits[key].Locale, // 좌측 언어 필터링
              }));
              
            setTotal(total);
            setTook(took);
            
            setData(mappedData);
            setLoading(false);
            console.log(pagination.current, pagination.pageSize)
            setPagination((prev) => ({
                ...prev,
                total: total,
                current: pagination.current,
                pageSize: pagination.pageSize,
            }));
        })
        .catch((error) => {
            console.log(error);
          })
  }

  // 테이블 선택시 상세 테이블
  const handleTableRowClick = (record) => {
    setSelectedItem(record); // 클릭한 행의 데이터 선택
  };


  useEffect(() => { // 처음에 불러올 부분
      handleTableChange(pagination);
      addSearchWord(query); //
  }, []);

  const handleTableChange = (pagination) => {
    setQuery(query)
    setPagination(pagination);
    //fetchEs(pagination.current, pagination.pageSize, filters);
    fetchEs(pagination, filter); // 1
  };

  // ------- nospoon index 연결하는 부분
  const addSearchWord = (value) => {
    axios({
        method: "POST",
        url: "http://localhost:8090/add_search_word",
        headers: {
            "Content-Type": "application/json"
        },
        data: {

                query: value 

        },
    })
        .then(response => {
            setTop5(response.data)
            console.log('Search word added to Elasticsearch:', response.data);
        })
        .catch(error => {
            console.error('Error adding search word to Elasticsearch:', error);
        });
  };

  useEffect(() => {
    //fetchEs(1, pagination.pageSize);
    fetchEs(pagination) // 2
    console.log('Filter : ', filter);
  },[query])

  
  //filter 값 받는 함수
  const handleFilterChange = (selectedFilters) => {
    //selectedFilters(selectedFilters);
    setFilter(selectedFilters);
    fetchEs(pagination, selectedFilters);
    //handleTableChange(pagination, selectedFilters);
    //handleTableChange(pagination);
  }

  const handleQueryChange = (value) => {
    setQuery(value); // 검색어를 상태에 설정합니다.
    //fetchEs(1, pagination.pageSize); // 검색 버튼을 눌렀을 때 페이지를 1로 설정하고 데이터를 새로 가져오도록
  };
  
  //실행 순서 변경
  const handleSearchAndAdd = (value) => {
    handleQueryChange(value); // 검색어 변경
    addSearchWord(value); // 검색어 추가
  };

  return (
   
  <>
    <div style={{ width: "100vw"}}>
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Search
            style={{margin:"24px 10px", width: "800px" }}
                placeholder="Input search text"
                enterButton="Search"
                size="large"
                onSearch={handleSearchAndAdd}
            />
        </Row>
        <Row style={{color: 'black', display: 'flex', justifyContent: 'center' }}>
            <Col style={{ marginRight: 15, marginTop: -20, marginBottom: -20}}>
                Total : { total }
            </Col>
            <Col style={{ marginRight: 15, marginTop: -20, marginBottom: -20}}>
                Took : { took } ms
            </Col>
        </Row>
        <div style={{ display: "flex", flexDirection: "row"}}>
        <div style={{ height: '420px', width:'22%', marginLeft: '3%', backgroundColor: 'white', border: '1px solid #C9CACA', borderRadius: '5px' }}>
            <Dfilter2 onFilterChange={handleFilterChange}/>
        </div>
        <Table
            style={{width:'56%', marginLeft: '3%', marginRight: '3%', marginBottom:30, border: '1px solid #C9CACA', borderRadius: '5px'}}
            columns={columns} 
            rowKey={(record) => record.key}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            onRow={(record, rowIndex) => {
                return {
                    onClick: () => handleTableRowClick(record),
                };
            }}
            />
        <div style={{ height: '420px', width:'22%', marginRight: '3%', backgroundColor: 'white', border: '1px solid #C9CACA', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Dtop5 top5={top5} /> {/* Dtop5 컴포넌트에 top5 값을 props로 전달 */}
        </div>
        </div>
    </div>
    <Modal 
        title="Detail"
        open={selectedItem !== null} 
        onCancel={() => setSelectedItem(null)}
        footer={null}
        width={1000}
    >
        <div style={{ borderBottom: "1px solid black", marginBottom: "16px" }}></div>
        {selectedItem && (
            <div>
                <p><b>title</b> : {selectedItem.Title}</p>
                <p><b>author</b> : {selectedItem.Author}</p>
                <p><b>public date</b> : {selectedItem.Date}</p>
                <div>
                    {selectedItem.Content && (
                        /* <div dangerouslySetInnerHTML={{ __html: highlightContent(selectedItem.Content, query) }}></div> */
                        <div dangerouslySetInnerHTML={{ __html: selectedItem.Content }}></div>
                    )}
                </div>
            </div>
        )}
        <div style={{ textAlign: 'right' }}>
            <Button onClick={() => setSelectedItem(null)}>Close</Button>
        </div> 
    </Modal>
        
  </>
);
}

export default Dtable;
