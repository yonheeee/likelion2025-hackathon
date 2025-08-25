import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
import loc from '../../../image/common/ComplaintLoc.svg';
import bin from '../../../image/common/waste.svg';
import { CATEGORY_MAP, STATUS_MAP } from '../../common/categoryStatusMap.js';
import PageHeader from "../../PageHeader.jsx";

export default function MyComplaintsPage() {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 추가
    const { user } = location.state || {}; // 전달된 user 정보 (name, phone)
    const [complaints, setComplaints] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedComplaint, setSelectedComplaint] = useState(null); // Store the selected complaint for deletion

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

    const handleDelete = async () => {
        if (selectedComplaint) {
            try {
                // URL에 userName과 phoneNumber 쿼리 파라미터를 추가하여 삭제 요청
                const response = await fetch(
                    `http://13.125.98.203/api/complaints/my/${selectedComplaint.id}?userName=${user.name}&phoneNumber=${user.phone}`,
                    {
                        method: 'DELETE',
                    }
                );

                // 만약 삭제가 성공했다면 complaints 배열에서 해당 아이템을 제거
                if (response.ok) {
                    setComplaints(complaints.filter(item => item.id !== selectedComplaint.id)); // 삭제된 민원은 목록에서 제외
                    setShowModal(false); // 삭제 후 모달 닫기
                } else {
                    // 삭제 실패 처리
                    console.error("민원 삭제 실패");
                }
            } catch (error) {
                console.error("삭제 요청 중 오류 발생", error);
            }
        }
    };

    const handleClick = (id) => {
        // 민원 클릭 시 상세 페이지로 이동
        navigate(`/mycomplaint/detail?id=${id}`);
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
                                onClick={() => handleClick(item.id)} // 클릭 시 상세 페이지로 이동
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
                                            onClick={() => {
                                                setSelectedComplaint(item); // Set the selected complaint
                                                setShowModal(true); // Show the modal
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

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} onClick={() => setShowModal(false)}>
                    <div onClick={(e) => e.stopPropagation()} style={{
                        background: '#fff',
                        padding: '2rem',
                        borderRadius: '1rem',
                        maxWidth: '370px',
                        width: '60%',
                        margin: '0 auto',
                        textAlign: 'center',
                    }}>
                        <p style={{fontSize: '1.25rem', fontWeight: '500'}}>민원을 삭제하시겠습니까?</p>
                        <div>
                            <button
                                onClick={handleDelete}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#EF4444',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    margin: '1rem',
                                }}
                            >
                                삭제하기
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#2563EB',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                }}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


