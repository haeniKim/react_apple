import React from "react";
import { Table } from 'antd';
import axios from "axios";

const columns = [
    {
        title: 'Rank',
        dataIndex: 'Rank',
        key: 'Rank',
    },
    {
        title: 'Keyword',
        dataIndex: 'Keyword',
        key: 'Keyword',
    },
    {
        title: 'Count',
        dataIndex: 'Count',
        key: 'Count',
    },
]


const Dtop5 = ({ top5 }) => {
    const data = top5 && top5.map((item, index) => ({
        Rank: index + 1,
        Keyword: item.key,
        Count: item.doc_count,
    }));

    console.log("값이 넘어 왔는지 : ", top5);

    return (
        <>
            <div style={{ height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <b>Top5 Keywords</b>
            </div>
            <Table columns={columns} dataSource={data} pagination={false} />
        </>
    );
};

export default Dtop5;

// 기본 접근 시 Top5 찾아주는 쿼리 실행해서 보여주기.
// 검색할 때마다 업데이트