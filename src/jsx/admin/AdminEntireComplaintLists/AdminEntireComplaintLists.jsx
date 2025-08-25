import React, { useEffect, useState } from "react";
import EntireList from '../../common/EntireComplaintLists.jsx';
import PageHeader from '../../PageHeader.jsx';

function AdminEntireComplaintLists() {
    return(
        <main className="All-Of-Complaints" style={{backgroundColor: '#F9FAFB'}}>
            <PageHeader title="전체 민원 목록"/>
            <div style={{
                width: '90%',
                backgroundColor: '#fff',
                margin: '0 auto',
                padding: '1rem 0',
                borderRadius: '16px',
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'
            }}>
                <EntireList isAdmin={true}/>
            </div>
        </main>
    );

}

export default AdminEntireComplaintLists;