import React, { useEffect, useState } from 'react';

function MyComplaintDetail() {
    const [complaint, setComplaint] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));  // 로컬스토리지에서 유저 데이터 가져오기
        setUser(userData);

        if (userData) {
            const url = `http://13.125.98.203/api/complaints/my/${userData.id}?userName=${encodeURIComponent(userData.name)}&phoneNumber=${encodeURIComponent(userData.phone)}`;
            fetch(url)
                .then(res => res.json())
                .then(setComplaint)
                .catch(err => console.error(err));
        }
    }, []);

    if (!complaint) return <p>불러오는 중입니다...</p>;

    return (
        <div>
            <h3>{complaint.title}</h3>
            <p>{complaint.content}</p>
            {/* 추가적인 유저 정보도 화면에 표시할 수 있습니다 */}
        </div>
    );
}

export default MyComplaintDetail;
