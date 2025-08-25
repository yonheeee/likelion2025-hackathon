import React from "react";
import profile from '../../image/User/profile.svg';
import PageHeader from "../PageHeader.jsx";
import { CATEGORY_MAP, STATUS_MAP } from './categoryStatusMap.js';

import time from '../../image/common/time.svg';
import complete from '../../image/common/process-complete.svg';
import stepimage from '../../image/common/step.svg';
import comment from '../../image/common/comment.svg';

import test from '../../image/test.jpg';

function ComplaintDetail({ complaint, loading, error }) {
    if (loading) return <p>불러오는 중입니다...</p>;
    if (error) return <p>{error}</p>;
    if (!complaint) return null;

    return (
        <main className="detail-of-complaint" style={{ backgroundColor: '#F9FAFB' }}>
            <PageHeader title="민원 상세보기" />

            {/* 컴플레인 내용 */}
            <div className="complaint-detail" style={{ marginBottom: '2.2rem' }}>
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
                    {/* 프로필 */}
                    <div className="profile-cont"
                         style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}>
                        <img src={profile} alt="프로필"
                             style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
                        <p style={{
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            margin: '0',
                            padding: '0'
                        }}>{complaint.userName}</p>
                    </div>

                    {/* 제목 */}
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
                        }}>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '300',
                                color: '#5c5c5c'
                            }}>제목</span><br />{complaint.title}
                        </h3>
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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

                    {/* 내용 */}
                    <p style={{
                        margin: '0',
                        padding: '0',
                        fontSize: '0.8rem',
                        textAlign: 'left'
                    }}>{complaint.content}</p>

                    {/* 이미지 + 카테고리 + AI 요약 */}
                    <div className="image-category-summ"
                         style={{ display: 'flex', flexDirection: 'row', margin: '1rem 0' }}>
                        {complaint.imageUrls && complaint.imageUrls.length > 0 && (
                            <div>
                                {complaint.imageUrls.map((url, index) => (
                                    <img key={index} src={test} alt={`image-${index}`}
                                         style={{
                                             width: '100px',
                                             height: '100px',
                                             borderRadius: '14px',
                                             margin: '0 1rem 0 0',
                                             padding: 0
                                         }}
                                    />
                                ))}
                            </div>
                        )}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 'auto',
                            width: '100%'
                        }}>
                            <div style={{
                                backgroundColor: '#2563eb',
                                margin: '0',
                                padding: '0.3125rem 0.5rem',
                                height: '1.25rem',
                                alignItems: 'center',
                                display: 'flex',
                                borderRadius: '3.125rem'
                            }}>
                                <p style={{
                                    fontSize: '0.65rem',
                                    color: '#fff',
                                    margin: '0',
                                    padding: '0'
                                }}>
                                    {CATEGORY_MAP[complaint.categories?.[0]] || "기타/행정"}
                                </p>
                            </div>

                            <div style={{
                                background: 'linear-gradient(90deg, #9F56F6 3.17%, #2B62EC 100%)',
                                height: '1.25rem',
                                margin: '0',
                                padding: '0.3125rem 0.5rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.65rem',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <p style={{ margin: '0', padding: '0' }}>AI 요약</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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

                    {/* 등록일 / 전화번호 */}
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
                            <span style={{ color: '#5c5c5c', fontWeight: '300' }}>등록일</span><br />
                            {new Date(complaint.createdAt).toLocaleDateString()}</p>
                        <p style={{
                            fontSize: '0.75rem',
                            textAlign: 'left',
                            margin: '0 3rem 0 0',
                            padding: '0',
                            fontWeight: '400'
                        }}><span style={{ color: '#5c5c5c', fontWeight: '300' }}>전화번호</span><br />
                            {complaint.phoneNumber}</p>
                    </div>
                </div>
            </div>

            {/* 처리 이력 */}
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
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}>
                            <img style={{ width: '1.125rem', height: '1.125rem' }} src={time} alt="타임라인" />
                            <p style={{ margin: '0', fontSize: '0.65rem', fontWeight: '500' }}>처리이력</p>
                        </div>

                        {(() => {
                            const statusInfo = STATUS_MAP[complaint.status] || {
                                label: "기타",
                                color: "#000000",
                                background: "#eeeeee"
                            };

                            return (
                                <p style={{
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
                                }}>
                                    {statusInfo.label}
                                </p>
                            );
                        })()}
                    </div>

                    {/* 처리 단계 */}
                    <div style={{ marginTop: '1rem' }}>
                        {(() => {
                            const steps = {
                                PENDING: [{ label: "민원 접수", completed: true }],
                                IN_PROGRESS: [
                                    { label: "민원 접수", completed: true },
                                    { label: "담당자 확인 및 배정", completed: true },
                                    { label: "처리중", completed: false },
                                ],
                                COMPLETED: [
                                    { label: "민원 접수", completed: true },
                                    { label: "담당자 확인 및 배정", completed: true },
                                    { label: "처리중", completed: true },
                                    { label: "처리완료", completed: true },
                                ],
                                REJECTED: [
                                    { label: "민원 접수", completed: true },
                                    { label: "담당자 확인 및 배정", completed: true },
                                    { label: "처리중", completed: true },
                                    { label: "처리완료", completed: true },
                                ],
                            };

                            const currentSteps = steps[complaint.status] || [];

                            return currentSteps.map((step, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        {step.label === "처리완료" ? (
                                            <>
                                                <img src={complete} alt="완료 아이콘"
                                                     style={{ width: '34px', height: '34px', marginRight: '0.5rem' }} />
                                                <p style={{ fontSize: '0.75rem', fontWeight: '500' }}>{step.label}</p>
                                            </>
                                        ) : (
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    {step.completed && (
                                                        <img src={complete} alt="완료 아이콘"
                                                             style={{ width: '34px', height: '34px' }} />
                                                    )}
                                                    <p style={{ fontSize: '0.75rem', fontWeight: '500' }}>{step.label}</p>
                                                </div>
                                                <img src={stepimage} alt="단계 이미지"
                                                     style={{ width: '0.125rem', height: '1rem', margin: '0.5rem 0 0 1rem' }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
            </div>

            {/* 코멘트 */}
            <div className="comment" style={{ marginBottom: '2.2rem' }}>
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
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <img style={{ width: '1rem', height: '1rem' }} src={comment} alt="코멘트" />
                            <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>코멘트</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ComplaintDetail;
