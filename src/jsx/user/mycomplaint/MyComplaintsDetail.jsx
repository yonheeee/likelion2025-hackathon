import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ComplaintDetail from '../../common/DetailComplaint.jsx';

function MyComplaintDetail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const id = queryParams.get('id'); // 쿼리 스트링에서 id 추출
    const userName = queryParams.get('userName'); // 쿼리 스트링에서 userName 추출
    let phoneNumber = queryParams.get('phoneNumber'); // 쿼리 스트링에서 phoneNumber 추출

    // 하이픈 제거 (전화번호에서 숫자만 남김)
    if (phoneNumber) {
        phoneNumber = phoneNumber.replace(/-/g, ""); // 하이픈 제거
    }

    console.log("전화번호 하이픈 제거 후:", phoneNumber); // 전화번호 확인 (하이픈 제거된 값)

    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userName && phoneNumber && id) {
            // URL로 보낼 때 phoneNumber에 하이픈이 없도록 확인
            const url = `http://13.125.98.203/api/complaints/my/${id}?userName=${encodeURIComponent(userName)}&phoneNumber=${encodeURIComponent(phoneNumber)}`;

            console.log("민원 상세 요청 URL:", url); // 최종 URL 확인

            fetch(url)
                .then(res => {
                    if (!res.ok) throw new Error('API 응답 오류');
                    return res.json();
                })
                .then(data => {
                    console.log('받은 데이터:', data);
                    setComplaint(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('민원 상세 조회 중 오류:', err);
                    setError('민원 상세 조회 중 오류가 발생했습니다.');
                    setLoading(false);
                });
        } else {
            setError('필요한 정보가 URL에 없습니다. (userName, phoneNumber, id)');
            setLoading(false);
        }
    }, [userName, phoneNumber, id]); // 의존성 설정

    // 삭제하기 버튼 클릭 시 실행되는 함수
    const handleDelete = async () => {
        const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmDelete) return;

        // 민원 삭제에 필요한 ID, userName, phoneNumber
        const { userName, phoneNumber } = complaint; // complaint에서 userName과 phoneNumber 추출

        if (!id || !userName || !phoneNumber) {
            return alert('삭제할 민원 정보를 찾을 수 없습니다.');
        }

        try {
            const response = await fetch(
                `http://13.125.98.203/api/complaints/my/${id}?userName=${encodeURIComponent(userName)}&phoneNumber=${encodeURIComponent(phoneNumber)}`,
                {
                    method: 'DELETE',
                }
            );

            if (!response.ok) {
                throw new Error('민원 삭제 실패');
            }

            alert('민원이 삭제되었습니다.');
            // 삭제 후 민원 목록에서 제거
        } catch (error) {
            console.error('삭제 요청 중 오류 발생', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    if (loading) return <p>불러오는 중입니다...</p>;
    if (error) return <p>{error}</p>;
    if (!complaint) return <p>데이터를 불러오는 데 실패했습니다.</p>;

    return (
        <main>
            <ComplaintDetail complaint={complaint} />

            {/* 삭제 버튼 */}
            <div className="delete-btn" style={{
                width: '90%',
                margin: '0 5% 5% 5%',
                backgroundColor: '#fef2f2',
                color: '#ef4444',
                borderRadius: '0.75rem',
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'
            }} onClick={handleDelete}>
                <p style={{ fontWeight: '500', padding: '1rem 0' }}>삭제하기</p>
            </div>
        </main>
    );
}

export default MyComplaintDetail;
