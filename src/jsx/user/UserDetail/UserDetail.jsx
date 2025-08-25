import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ComplaintDetail from '../../common/DetailComplaint.jsx';

function UserDetail() {
    const { id } = useParams();  // ID만 가져옴
    const [complaint, setComplaint] = useState(null);

    useEffect(() => {
        const url = `http://13.125.98.203/api/complaints/${id}`;  // ID만 사용
        fetch(url)
            .then(res => res.json())
            .then(setComplaint)
            .catch(err => console.error(err));
    }, [id]);

    if (!complaint) return <p>불러오는 중입니다...</p>;
    return <ComplaintDetail complaint={complaint} />;
}

export default UserDetail;
