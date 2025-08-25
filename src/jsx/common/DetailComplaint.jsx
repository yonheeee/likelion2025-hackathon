import React from "react";
import profile from '../../image/User/profile.svg';
import PageHeader from "../PageHeader.jsx";
import { CATEGORY_MAP, STATUS_MAP } from './categoryStatusMap.js';

import time from '../../image/common/time.svg';
import complete from '../../image/common/process-complete.svg';
import stepimage from '../../image/common/step.svg';
import comment from '../../image/common/comment.svg';

function ComplaintDetail({ complaint, loading, error }) {
    if (loading) return <p>불러오는 중입니다...</p>;
    if (error) return <p>{error}</p>;
    if (!complaint) return null;

    // AI 요약 버튼 클릭 시 실행되는 함수
    const handleAISummary = async () => {
        const id = complaint.id; // complaint 객체에서 id 추출
        if (!id) return alert('민원 ID가 없습니다.');

        try {
            const response = await fetch(`http://13.125.98.203/api/admin/complaints/${id}/ai-summary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('요약 요청 실패');

            const result = await response.json();
            console.log('AI 요약 결과:', result);

            alert(`AI 요약 완료: ${result.summary || '요약 내용 없음'}`);
        } catch (error) {
            console.error('AI 요약 오류:', error);
            alert('AI 요약 요청 중 오류가 발생했습니다.');
        }
    };

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
                                    <img key={index} src={url} alt={`image-${index}`}
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

                            {/* AI 요약 버튼 */}
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
                                <p style={{ margin: '0', padding: '0', cursor: 'pointer', color: 'white' }}
                                   onClick={handleAISummary}>
                                    AI 요약
                                </p>
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
            {/* 생략 가능, 그대로 유지했음 */}

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
                    <div className="comment-descript" style={{
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

                    <div className='comment-cont'>
                        {complaint.comment}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ComplaintDetail;
