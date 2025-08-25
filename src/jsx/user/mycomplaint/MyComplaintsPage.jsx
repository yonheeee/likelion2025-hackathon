// 수정
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loc from '../../../image/common/ComplaintLoc.svg';
import bin from '../../../image/common/waste.svg';
import { CATEGORY_MAP, STATUS_MAP } from '../../common/categoryStatusMap.js';
import PageHeader from "../../PageHeader.jsx";

export default function MyComplaintsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || {};
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        if (user) {
            const fetchComplaints = async () => {
                try {
                    const response = await fetch(
                        `http://13.125.98.203/api/complaints/my?userName=${user.name}&phoneNumber=${user.phone}`
                    );
                    const data = await response.json();

                    if (data) {
                        setComplaints(data.complaints);
                    }
                } catch (error) {
                    console.error("API 호출 오류:", error);
                }
            };

            fetchComplaints();
        }
    }, [user]);

    const handleDelete = async (complaint) => {
        const confirmDelete = window.confirm("민원을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://13.125.98.203/api/complaints/my/${complaint.id}?userName=${complaint.userName}&phoneNumber=${complaint.phoneNumber}`,
                {
                    method: 'DELETE',
                }
            );

            if (response.ok) {
                setComplaints(complaints.filter(item => item.id !== complaint.id));
            } else {
                console.error("민원 삭제 실패");
                alert("민원 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("삭제 요청 중 오류 발생", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const handleClick = (id) => {
        navigate(`/mycomplaint/detail?id=${id}&userName=${encodeURIComponent(user.name)}&phoneNumber=${encodeURIComponent(user.phone)}`);
    };


    return (
        <div className="mycomplaint-page">
            <PageHeader
                title="내 민원"
                subtitle={user ? `${user.name}님이 접수한 민원 목록입니다.` : "내가 쓴 민원입니다."}
            />

            <div className="mycomplaint-container" style={{
                width: '90%',
                margin: '0 auto',
                backgroundColor: '#fff',
                borderRadius: '1rem',
                padding: '0.5rem 0',
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
            }}>
                {complaints.length > 0 ? (
                    complaints.map((item) => {
                        const primaryCategory = item.categories?.[0];
                        const categoryLabel = CATEGORY_MAP[primaryCategory] || "기타/행정";
                        const statusInfo = STATUS_MAP[item.status] || {
                            label: "기타",
                            color: "#000000",
                            background: "#eeeeee"
                        };

                        return (
                            <li
                                key={item.id}
                                className="complaint-card"
                                style={{
                                    width: '90%',
                                    margin: '1rem auto',
                                    padding: '1.15rem 1.1rem',
                                    border: '0.8px solid #BFBFBF',
                                    background: 'linear-gradient(180deg, rgba(238, 245, 255, 0.5) 0%, rgba(245, 238, 255, 0.5) 100%)',
                                    listStyle: 'none',
                                }}
                                onClick={() => handleClick(item.id, item.userName, item.phoneNumber)}
                            >
                                <div
                                    className="card-header"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <p className="complaint-title"
                                       style={{ color: '#000000', fontSize: '1rem', fontWeight: 'Medium' }}>
                                        {item.title}
                                        <span
                                            className="complaint-date"
                                            style={{
                                                color: '#5C5C5C',
                                                fontSize: "0.63rem",
                                                fontWeight: '400',
                                                marginLeft: '0.5rem',
                                            }}
                                        >
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </span>
                                    </p>
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
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {statusInfo.label}
                                    </p>
                                </div>

                                <p
                                    className="complaint-content"
                                    style={{
                                        textAlign: 'left',
                                        fontSize: '12px',
                                        fontWeight: 'regular',
                                        color: '#5C5C5C',
                                        padding: '10px 0 0 0',
                                        margin: '0 0 10px 0',
                                    }}
                                >
                                    {item.content.length > 60 ? `${item.content.slice(0, 60)}...` : item.content}
                                </p>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <span
                                        style={{
                                            display: 'block',
                                            width: '20rem',
                                            height: '0.05rem',
                                            backgroundColor: '#BFBFBF',
                                            margin: '0.5rem 0',
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
                                        marginTop: '8px',
                                    }}
                                >
                                    <span
                                        className="complaint-address"
                                        style={{
                                            color: '#5C5C5C',
                                            fontSize: '0.8rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            margin: 0,
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: '19px',
                                                height: '19px',
                                                padding: 0,
                                                marginRight: '5px',
                                                display: 'inline-block',
                                            }}
                                            src={loc}
                                            alt="loc"
                                        />
                                        {item.address}
                                    </span>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '0.5rem',
                                    }}>
                                        <button
                                            className="status-btn"
                                            style={{
                                                fontSize: '10px',
                                                margin: 0,
                                                border: 'none',
                                                backgroundColor: '#2563EB',
                                                color: '#FFFFFF',
                                                borderRadius: '50px',
                                                padding: '4px 8px',
                                            }}
                                        >
                                            {categoryLabel}
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(item);
                                            }}
                                            style={{
                                                fontSize: '10px',
                                                margin: 0,
                                                border: 'none',
                                                backgroundColor: '#EF4444',
                                                color: '#FFFFFF',
                                                borderRadius: '50px',
                                                padding: '4px 8px',
                                            }}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: '0.3rem',
                                            }}>
                                                <img src={bin} alt='쓰레기통' style={{
                                                    width: '0.5rem',
                                                    height: '0.5rem',
                                                    margin: 0,
                                                    padding: 0,
                                                }} />
                                                <p style={{ margin: 0, padding: 0 }}>삭제</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <p className="no-complaints">등록된 민원이 없습니다.</p>
                )}
            </div>
        </div>
    );
}
