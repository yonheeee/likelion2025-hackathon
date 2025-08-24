import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import profile from '../../../image/User/profile.svg';
import PageHeader from "../../PageHeader"; // 기존 리스트 컴포넌트
import { CATEGORY_MAP, STATUS_MAP } from '../../common/categoryStatusMap.js';  // categoryStatusMap에서 import

import loc from '../../../image/common/ComplaintLoc.svg';
import time from '../../../image/common/time.svg';
import plus from '../../../image/common/plus.svg';
import complete from '../../../image/common/process-complete.svg';
import stepimage from '../../../image/common/step.svg';
import comment from '../../../image/common/comment.svg';

import test from '../../../image/test.jpg'; // test

function UserEntireComplaintLists() {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaintDetail = async () => {
            try {
                const response = await axios.get(`http://13.125.98.203/api/complaints/${id}`);
                setComplaint(response.data);
            } catch (err) {
                setError('상세 정보를 불러오는 중 오류가 발생했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaintDetail();
    }, [id]);

    if (loading) return <p>불러오는 중입니다...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main className="detail-of-complaint" style={{backgroundColor: '#F9FAFB'}}>
            <PageHeader title="민원 상세보기"/>

            <div className="complaint-detail" style={{marginBottom: '2.2rem'}}>
                {complaint && (
                    <div
                        style={{
                            width: '90%',
                            backgroundColor: '#fff',
                            margin: '0 auto',
                            padding: '1.3rem',
                            borderRadius: '1rem',
                            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        <div className="profile-cont"
                             style={{display: 'flex', flexDirection: 'row', marginBottom: '1rem'}}>
                            <img src={profile} alt="프로필"
                                 style={{width: '1.5rem', height: '1.5rem', marginRight: '0.5rem'}}/>
                            <p style={{
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                margin: '0',
                                padding: '0'
                            }}>{complaint.userName}</p>  {/* 작성자명 */}
                        </div>
                        <div className="titleandaddr" style={{
                            display: "flex",
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <h3 style={{
                                fontSize: '1rem',
                                textAlign: 'left',
                                margin: '0',
                                padding: '0',
                                fontWeight: '500'
                            }}><span style={{
                                fontSize: '0.75rem',
                                fontWeight: '300',
                                color: '#5c5c5c'
                            }}>제목</span><br/>{complaint.title}</h3> {/* 제목 */}
                        </div>

                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <span
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: '0.05rem',
                                    backgroundColor: '#BFBFBF',
                                    margin: '1rem 0'
                                }}
                            ></span>
                        </div>

                        <p style={{
                            margin: '0',
                            padding: '0',
                            fontSize: '0.8rem',
                            textAlign: 'left'
                        }}>{complaint.content}</p> {/* 내용 */}

                        <div className="image-category-summ"
                             style={{display: 'flex', flexDirection: 'row', margin: '1rem 0'}}>
                            {/* 이미지가 있을 경우 */}
                            {complaint.imageUrls && complaint.imageUrls.length > 0 && (
                                <div>
                                    {complaint.imageUrls.map((url, index) => (
                                        <img key={index} src={url} alt={`image-${index}`}
                                             style={{
                                                 width: '100px',
                                                 height: '100px',
                                                 borderRadius: '14px',
                                                 margin: 0,
                                                 padding: 0
                                             }}
                                        />
                                    ))}
                                </div>
                            )}
                            <div style={{
                                backgroundColor: '#2563eb',
                                margin: '0',
                                padding: '0.3125rem 0.5rem',
                                height: '1.25rem',
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                borderRadius: '3.125rem'
                            }}>
                                <p style={{
                                    fontSize: '0.65rem',
                                    color: '#fff',
                                    margin: '0',
                                    padding: '0'
                                }}>
                                    {CATEGORY_MAP[complaint.categories?.[0]] || "기타/행정"}
                                </p>  {/* 카테고리 */}
                            </div>

                            <p style={{
                                background: 'linear-gradient(90deg, #9F56F6 3.17%, #2B62EC 100%)',
                                color: '#fff',
                                padding: '0.3rem 1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.75rem',
                                textAlign: 'center'
                            }}>
                                AI 요약
                            </p>
                        </div>

                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <span
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: '0.05rem',
                                    backgroundColor: '#BFBFBF',
                                    margin: '1rem 0'
                                }}
                            ></span>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <p style={{
                                fontSize: '0.75rem',
                                textAlign: 'left',
                                margin: '0',
                                padding: '0',
                                fontWeight: '400'
                            }}>
                                <span style={{ color: '#5c5c5c', fontWeight: '300' }}>등록일</span><br/>
                                {new Date(complaint.createdAt).toLocaleDateString()}</p>  {/* 등록일 */}
                            <p style={{
                                fontSize: '0.75rem',
                                textAlign: 'left',
                                margin: '0 3rem 0 0',
                                padding: '0',
                                fontWeight: '400'
                            }}><span style={{ color: '#5c5c5c', fontWeight: '300' }}>전화번호</span><br/>
                                {complaint.phoneNumber}</p>  {/* 전화번호 */}
                        </div>
                    </div>
                )}
            </div>

            <div className="state-of-process" style={{ marginBottom: '2.2rem' }}>
                <div style={{
                    width: '90%',
                    backgroundColor: '#fff',
                    margin: '0 auto',
                    padding: '1.3rem',
                    borderRadius: '1rem',
                    boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.25)'
                }}>
                    <div className="process-state-cont" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center'}}>
                            <img style={{width: '1.125rem', height: '1.125rem', margin: '0', padding: '0'}} src={time}
                                 alt="타임라인"/>
                            <p style={{margin: '0', fontSize: '0.65rem', fontWeight: '500'}}>처리이력</p>
                        </div>

                        {
                            (() => {
                                const statusInfo = STATUS_MAP[complaint.status] || {
                                    label: "기타",
                                    color: "#000000",
                                    background: "#eeeeee"
                                };

                                return (
                                    <p
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

                    {/* 처리 이력 단계 */} {/* TODO : 반려일 때 어떻게 할지*/}
                    <div style={{marginTop: '1rem'}}>
                        {(() => {
                            const steps = {
                                PENDING: [
                                    {label: "민원 접수", completed: true},
                                ],
                                IN_PROGRESS: [
                                    {label: "민원 접수", completed: true},
                                    {label: "담당자 확인 및 배정", completed: true},
                                    {label: "처리중", completed: false},
                                ],
                                COMPLETED: [
                                    {label: "민원 접수", completed: true},
                                    {label: "담당자 확인 및 배정", completed: true},
                                    {label: "처리중", completed: true},
                                    {label: "처리완료", completed: true},
                                ],
                                REJECTED: [
                                    {label: "민원 접수", completed: true},
                                    {label: "담당자 확인 및 배정", completed: true},
                                    {label: "처리중", completed: true},
                                    {label: "처리완료", completed: true},
                                    // { label: "반려", completed: true }, // 반려단계 추가 가능
                                ],
                            };

                            const currentSteps = steps[complaint.status] || [];

                            return currentSteps.map((step, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    <div>
                                        {/* 처리완료 단계에서는 complete 이미지와 라벨만 표시 */}
                                        {step.label === "처리완료" ? (
                                            <>
                                                <img
                                                    src={complete}
                                                    alt="완료 아이콘"
                                                    style={{width: '34px', height: '34px', marginRight: '0.5rem'}}
                                                />
                                                <p style={{
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500'
                                                }}>
                                                    {step.label}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <div style={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
                                                        {step.completed && (
                                                            <img
                                                                src={complete}
                                                                alt="완료 아이콘"
                                                                style={{
                                                                    width: '34px',
                                                                    height: '34px',
                                                                    marginRight: '0.5rem'
                                                                }}
                                                            />
                                                        )}
                                                        <p style={{
                                                            margin: '0',
                                                            padding: '0',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '500'
                                                        }}>
                                                            {step.label}
                                                        </p>
                                                    </div>
                                                    <img
                                                        src={stepimage}
                                                        alt="단계 이미지"
                                                        style={{
                                                            width: '0.125rem',
                                                            height: '1rem',
                                                            margin: '0.5rem 0 0 1rem',
                                                            padding: 0
                                                        }}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
            </div>


            <div className="comment" style={{marginBottom: '2.2rem'}}>
                <div style={{
                    width: '90%',
                    backgroundColor: '#fff',
                    margin: '0 auto',
                    padding: '1.3rem',
                    borderRadius: '16px',
                    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'
                }}>
                    <div className="comment-cont" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center'}}>
                            <img style={{width: '1rem', height: '1rem', margin: '0', padding: '0'}} src={comment}
                                 alt="코멘트"/>
                            <p style={{margin: '0', padding: '0', fontSize: '0.875rem', fontWeight: '500'}}>코멘트</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
);
}

export default UserEntireComplaintLists;
