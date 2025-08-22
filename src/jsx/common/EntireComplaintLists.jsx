import React from "react";
import { useNavigate } from "react-router-dom";
import complaints from './dummydata.js';
import loc from './ComplaintLoc.svg';

function EntireComplaintLists({ isAdmin }) {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

    const CATEGORY_MAP = {
        FACILITY_DAMAGE: "시설물 파손/관리",
        SAFETY_RISK: "안전/위험",
        ENVIRONMENT_CLEANING: "환경/청소",
        TRAFFIC_PARKING: "교통/주정차",
        LIVING_INCONVENIENCE: "생활/불편",
        OTHERS_ADMIN: "기타/행정",
    };

    const STATUS_MAP = {
        PENDING: {
            label: "접수",
            color: "#A65F00",
            background: "#FFEDD5"
        },
        IN_PROGRESS: {
            label: "진행중",
            color: "#009921",
            background: "#CFF5D7"
        },
        COMPLETED: {
            label: "완료",
            color: "#2B62EC",
            background: "#DBE8FF"
        },
        REJECTED: {
            label: "반려",
            color: "#D70000",
            background: "#FEF2F2"
        }
    };

    const handleClick = (id) => {
        // isAdmin에 따라 이동 경로가 달라짐
        if (isAdmin) {
            navigate(`/admin/detail/${id}`);  // 관리자 페이지
        } else {
            navigate(`/user/detail/${id}`);  // 사용자 페이지
        }
    };

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
                            <p className="complaint-title" style={{ color: '#00000', fontSize: '1rem', fontWeight: 'Medium' }}>
                                {item.title}
                                <span
                                    className="complaint-date"
                                    style={{ color: '#5C5C5C', fontSize: "0.63rem", fontWeight: '400', marginLeft: '0.5rem' }}
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
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <span
                                style={{
                                    display: 'block',
                                    width: '288px',
                                    height: '0.8px',
                                    backgroundColor: '#BFBFBF',
                                    margin: '8px 0'
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





