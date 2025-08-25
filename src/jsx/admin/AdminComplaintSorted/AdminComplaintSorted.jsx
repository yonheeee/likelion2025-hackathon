import React, { useEffect, useState } from "react";
import EntireComplaintLists from '../../common/EntireComplaintLists.jsx';
import PageHeader from '../../PageHeader.jsx';
import axios from 'axios';

import urgent from '../../../image/admin/urgent.svg';
import inacturgent from '../../../image/admin/inact-urgent.svg';
import frequent from '../../../image/admin/frequent.svg';
import inactfrequent from '../../../image/admin/inact-frequent.svg';

function AdminComplaintSorted() {
    const [complaints, setComplaints] = useState([]); // 민원 목록
    const [filteredComplaints, setFilteredComplaints] = useState([]); // 필터된 민원 목록
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewType, setViewType] = useState("urgent"); // urgent, frequent

    // 긴급민원 판별
    const isUrgent = (item) => {
        return (
            item.title.includes('긴급') || item.title.includes('위험') || item.content.includes('긴급') || item.content.includes('즉시')
        );
    };

    // 다발민원 판별
    const categoryCount = complaints.reduce((acc, item) => {
        const category = item.categories?.[0];
        if (category) {
            acc[category] = (acc[category] || 0) + 1;
        }
        return acc;
    }, {});

    const frequentCategories = Object.keys(categoryCount).filter(category => categoryCount[category] > 5);

    // 민원 필터링 함수
    const filterComplaints = (type) => {
        let filtered;
        if (type === "urgent") {
            // 긴급민원 필터링
            filtered = complaints.filter(item => isUrgent(item));
        } else if (type === "frequent") {
            // 다발민원 필터링
            filtered = complaints.filter(item => frequentCategories.includes(item.categories?.[0]));
        }
        setFilteredComplaints(filtered); // 필터링된 민원 목록을 상태에 반영
    };

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://13.125.98.203/api/complaints');
                setComplaints(response.data);
                filterComplaints(viewType); // 초기 데이터 로드 시 필터링된 민원 목록 설정
            } catch (err) {
                console.error(err);
                setError('데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []); // 최초 데이터 로딩 시 한번만 호출

    useEffect(() => {
        // viewType 변경 시 필터링된 민원 목록 업데이트
        filterComplaints(viewType);
    }, [viewType]); // viewType이 변경될 때마다 호출

    if (loading) return <p>불러오는 중입니다...</p>;
    if (error) return <p>{error}</p>;

    // 버튼 스타일
    const activeButtonStyle = {
        backgroundColor: '#367BF4',
        color: '#fff',
        padding: '10px',
        width: '170px',
        height: '92px',
        borderRadius: '16px',
        fontSize: '14px',
        border: 'none',
        margin: '0 10px',
        cursor: 'pointer',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
    };

    const inactiveButtonStyle = {
        backgroundColor: '#fff',
        color: '#367BF4',
        padding: '10px',
        width: '170px',
        height: '92px',
        borderRadius: '16px',
        fontSize: '14px',
        border: 'none',
        margin: '0 10px',
        cursor: 'pointer',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
    };

    return (
        <main className="All-Of-Complaints" style={{backgroundColor: '#F9FAFB'}}>
            <PageHeader title="우선순위별 민원 목록"/>
            <div style={{
                width: '90%',
                backgroundColor: '#fff',
                margin: '0 auto',
                padding: '1rem 0',
                borderRadius: '16px',
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'
            }}>
                {/* 버튼을 추가하여 필터링 */}
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <button
                        onClick={() => { setViewType("urgent"); }}
                        style={viewType === "urgent" ? activeButtonStyle : inactiveButtonStyle}
                    >
                        <img src={viewType === "urgent" ? urgent : inacturgent} alt='urgent' style={{width: '29px', height: '33px'}}/>
                        <p>긴급 민원</p>
                    </button>
                    <button
                        onClick={() => { setViewType("frequent"); }}
                        style={viewType === "frequent" ? activeButtonStyle : inactiveButtonStyle}
                    >
                        <img src={viewType === "frequent" ? frequent : inactfrequent} alt='frequent' style={{width: '49px', height: '33px'}}/>
                        <p>다발 민원</p>
                    </button>
                </div>

                {/* 민원 목록 표시 */}
                {filteredComplaints.length === 0 ? (
                    <p>{viewType === "urgent" ? "긴급민원이 없습니다." : "다발민원이 없습니다."}</p>
                ) : (
                    <EntireComplaintLists complaints={filteredComplaints} isAdmin={true} />
                )}
            </div>
        </main>
    );
}

export default AdminComplaintSorted;

