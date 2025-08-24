import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CATEGORY_MAP, STATUS_MAP } from './categoryStatusMap.js';
import loc from './ComplaintLoc.svg';

function EntireComplaintLists({ isAdmin }) {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

    const [complaints, setComplaints] = useState([]); // 상태로 complaints 설정
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClick = (id) => {
        // isAdmin에 따라 이동 경로가 달라짐
        if (isAdmin) {
            navigate(`/admin/detail/${id}`);  // 관리자 페이지
        } else {
            navigate(`/user/detail/${id}`);  // 사용자 페이지
        }
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 API에서 데이터 가져오기
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://13.125.98.203/api/complaints');
                setComplaints(response.data); // API 응답 데이터 설정
            } catch (err) {
                console.error(err);
                setError('데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    if (loading) return <p>불러오는 중입니다...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            {complaints.map((item) => {
                const primaryCategory = item.categories?.[0];
                const categoryLabel = CATEGORY_MAP[primaryCategory] || "기타/행정";

                return (
                    <li
                        key={item.id} // key는 여기서 사용
                        className="complaint-card"
                        style={{
                            width: '90%',
                            margin: '1rem auto',
                            padding: '1.15rem 1.1rem',
                            border: '0.8px solid #BFBFBF',
                            background: 'linear-gradient(180deg, rgba(238, 245, 255, 0.5) 0%, rgba(245, 238, 255, 0.5) 100%)',
                            listStyle: 'none'
                        }}
                        onClick={() => handleClick(item.id)} // 클릭 시 해당 경로로 이동
                    >
                        <div
                            className="card-header"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <p className="complaint-title"
                               style={{color: '#00000', fontSize: '1rem', fontWeight: 'Medium'}}>
                                {item.title}
                                <span
                                    className="complaint-date"
                                    style={{
                                        color: '#5C5C5C',
                                        fontSize: "0.63rem",
                                        fontWeight: '400',
                                        marginLeft: '0.5rem'
                                    }}
                                >
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                            </p>
                            {
                                (() => {
                                    const statusInfo = STATUS_MAP[item.status] || {
                                        label: "기타",
                                        color: "#000000",
                                        background: "#eeeeee"
                                    };

                                    return (
                                        <p
                                            className="status-text"
                                            style={{
                                                color: statusInfo.color,
                                                backgroundColor: statusInfo.background,
                                                width: '33px',
                                                height: '19px',
                                                padding: "2px",
                                                margin: 0,
                                                borderRadius: "30px",
                                                fontSize: "0.65rem",
                                                fontWeight: "500",
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {statusInfo.label}
                                        </p>
                                    );
                                })()
                            }
                        </div>
                        <p
                            className="complaint-content"
                            style={{
                                textAlign: 'left',
                                fontSize: '12px',
                                fontWeight: 'regular',
                                color: '#5C5C5C',
                                padding: '10px 0 0 0',
                                margin: '0 0 10px 0'
                            }}
                        >
                            {item.content.length > 60
                                ? `${item.content.slice(0, 60)}...`
                                : item.content}
                        </p>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <span
                                style={{
                                    display: 'block',
                                    width: '20rem',
                                    height: '0.05rem',
                                    backgroundColor: '#BFBFBF',
                                    margin: '0.5rem 0'
                                }}
                            ></span>
                        </div>
                        <div
                            className="card-footer"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '8px'
                            }}
                        >
                            <span
                                className="complaint-address"
                                style={{
                                    color: '#5C5C5C',
                                    fontSize: '0.8rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: 0
                                }}
                            >
                                <img
                                    style={{
                                        width: '19px',
                                        height: '19px',
                                        padding: 0,
                                        marginRight: '5px',
                                        display: 'inline-block'
                                    }}
                                    src={loc}
                                    alt="loc"
                                />
                                {item.address}
                            </span>
                            <button
                                className="status-btn"
                                style={{
                                    fontSize: '10px',
                                    margin: 0,
                                    border: 'none',
                                    backgroundColor: '#2563EB',
                                    color: '#FFFFFF',
                                    borderRadius: '50px',
                                    padding: '4px 8px'
                                }}
                            >
                                {categoryLabel}
                            </button>
                        </div>
                    </li>
                );
            })}
        </>
    );
}

export default EntireComplaintLists;