const dummyComplaints = [
    {
        id: 1,
        title: "신고합니다",
        content: "도로에 쓰레기가 치워지지 않아요",
        address: "해미면",
        categories: ["FACILITY_DAMAGE", "SAFETY_RISK", "ENVIRONMENT_CLEANING"],
        status: "PENDING",
        imageUrls: [],
        userName: "홍길동",
        phoneNumber: "010-1234-5678",
        createdAt: "2025-08-15T18:20:32.413387",
        updatedAt: "2025-08-15T21:07:20.237313",
        rejectionReason: "ALREADY_RESOLVED",
        rejectionDetail: null,
        comments: null,
        commentCount: null,
        summaryLocation: "",
        summaryPhenomenon: "",
        summaryProblem: "",
        summaryRisk: "",
        summaryRequest: ""
    },
    {
        id: 2,
        title: "공원시설의 문제",
        content:
            "서산 중앙공원 산책로를 이용하다가 바닥이 심하게 파손된 구간을 발견했습니다. 위치는 중앙공원 내 체육시설을 지나 연못 쪽으로 가는 산책로 중간쯤입니다. 보도블록이 여러 개 들떠 있고, 한 부분은 아예 깨져서 구멍처럼 파여 있어요. 최근 비가 와서 물이 고여있는데, 바닥이 울퉁불퉁해서 지나다니기 불편하고, 특히 밤에는 어두워서 발을 헛디뎌 넘어질까 봐 매우 위험합니다. 아이들이 뛰어다니다 다칠까 봐 걱정도 됩니다.시민들이 안전하게 산책로를 이용할 수 있도록 빠른 시일 내에 보수 부탁드립니다.",
        address: "해미면",
        categories: ["FACILITY_DAMAGE", "SAFETY_RISK", "ENVIRONMENT_CLEANING"],
        status: "PENDING",
        imageUrls: [
            "http://localhost:8080/uploads/8647fb9e-0668-43c1-9ed9-377f47edd24d.png"
        ],
        userName: "김멋사",
        phoneNumber: "010-1234-5678",
        createdAt: "2025-08-15T18:48:26.550027",
        updatedAt: "2025-08-15T18:48:26.550027",
        rejectionReason: null,
        rejectionDetail: null,
        comments: null,
        commentCount: null,
        summaryLocation: "",
        summaryPhenomenon: "",
        summaryProblem: "",
        summaryRisk: "",
        summaryRequest: ""
    },
    {
        id: 3,
        title: "공원시설의 문제",
        content:
            "서산 중앙공원 산책로를 이용하다가 바닥이 심하게 파손된 구간을 발견했습니다. 위치는 중앙공원 내 체육시설을 지나 연못 쪽으로 가는 산책로 중간쯤입니다...",
        address: "해미면",
        categories: ["FACILITY_DAMAGE", "SAFETY_RISK", "ENVIRONMENT_CLEANING"],
        status: "PENDING",
        imageUrls: [
            "http://localhost:8080/uploads/8647fb9e-0668-43c1-9ed9-377f47edd24d.png"
        ],
        userName: "김멋사",
        phoneNumber: "010-1234-5678",
        createdAt: "2025-08-15T22:05:05.305184",
        updatedAt: "2025-08-15T22:05:05.305184",
        rejectionReason: null,
        rejectionDetail: null,
        comments: null,
        commentCount: null,
        summaryLocation: "",
        summaryPhenomenon: "",
        summaryProblem: "",
        summaryRisk: "",
        summaryRequest: ""
    },
    {
        id: 4,
        title: "공원시설의 문제",
        content:
            "서산 중앙공원 산책로를 이용하다가 바닥이 심하게 파손된 구간을 발견했습니다. 위치는 중앙공원 내 체육시설을 지나 연못 쪽으로 가는 산책로 중간쯤입니다...",
        address: "해미면",
        categories: ["FACILITY_DAMAGE", "SAFETY_RISK", "ENVIRONMENT_CLEANING"],
        status: "PENDING",
        imageUrls: [
            "http://localhost:8080/uploads/8647fb9e-0668-43c1-9ed9-377f47edd24d.png"
        ],
        userName: "김멋사",
        phoneNumber: "010-1234-5678",
        createdAt: "2025-08-15T22:07:43.997827",
        updatedAt: "2025-08-15T22:07:43.997827",
        rejectionReason: null,
        rejectionDetail: null,
        comments: null,
        commentCount: null,
        summaryLocation: "",
        summaryPhenomenon: "",
        summaryProblem: "",
        summaryRisk: "",
        summaryRequest: ""
    },
    // ↓ 복사본 4개
    {
        id: 5,
        title: "신고합니다",
        content: "도로에 쓰레기가 치워지지 않아요",
        address: "해미면",
        categories: ["FACILITY_DAMAGE", "SAFETY_RISK", "ENVIRONMENT_CLEANING"],
        status: "PENDING",
        imageUrls: [],
        userName: "홍길동",
        phoneNumber: "010-1234-5678",
        createdAt: "2025-08-15T18:20:32.413387",
        updatedAt: "2025-08-15T21:07:20.237313",
        rejectionReason: "ALREADY_RESOLVED",
        rejectionDetail: null,
        comments: null,
        commentCount: null,
        summaryLocation: "",
        summaryPhenomenon: "",
        summaryProblem: "",
        summaryRisk: "",
        summaryRequest: ""
    },
    {
        id: 6,
        title: "공원시설의 문제",
        content:
            "서산 중앙공원 산책로를 이용하다가 바닥이 심하게 파손된 구간을 발견했습니다...",
        address: "해미면",
        categories: ["FACILITY_DAMAGE", "SAFETY_RISK", "ENVIRONMENT_CLEANING"],
        status: "PENDING",
        imageUrls: [
            "http://localhost:8080/uploads/8647fb9e-0668-43c1-9ed9-377f47edd24d.png"
        ],
        userName: "김멋사",
        phoneNumber: "010-1234-5678",
        createdAt: "2025-08-15T18:48:26.550027",
        updatedAt: "2025-08-15T18:48:26.550027",
        rejectionReason: null,
        rejectionDetail: null,
        comments: null,
        commentCount: null,
        summaryLocation: "",
        summaryPhenomenon: "",
        summaryProblem: "",
        summaryRisk: "",
        summaryRequest: ""
    },
    {
        id: 7,
        title: "공원시설의 문제",
        content:
            "서산 중앙공원 산책로를 이용하다가 바닥이 심하게 파손된 구간을 발견했습니다...",
        address: "해미면",
        categories: ["FACILITY_DAMAGE", "SAFETY_RISK", "ENVIRONMENT_CLEANING"],
        status: "PENDING",
        imageUrls: [
            "http://localhost:8080/uploads/8647fb9e-0668-43c1-9ed9-377f47edd24d.png"
        ],
        userName: "김멋사",
        phoneNumber: "010-1234-5678",
        createdAt: "2025-08-15T22:05:05.305184",
        updatedAt: "2025-08-15T22:05:05.305184",
        rejectionReason: null,
        rejectionDetail: null,
        comments: null,
        commentCount: null,
        summaryLocation: "",
        summaryPhenomenon: "",
        summaryProblem: "",
        summaryRisk: "",
        summaryRequest: ""
    },
    {
        id: 8,
        title: "공원시설의 문제",
        content:
            "서산 중앙공원 산책로를 이용하다가 바닥이 심하게 파손된 구간을 발견했습니다...",
        address: "해미면",
        categories: ["FACILITY_DAMAGE", "SAFETY_RISK", "ENVIRONMENT_CLEANING"],
        status: "PENDING",
        imageUrls: [
            "http://localhost:8080/uploads/8647fb9e-0668-43c1-9ed9-377f47edd24d.png"
        ],
        userName: "김멋사",
        phoneNumber: "010-1234-5678",
        createdAt: "2025-08-15T22:07:43.997827",
        updatedAt: "2025-08-15T22:07:43.997827",
        rejectionReason: null,
        rejectionDetail: null,
        comments: null,
        commentCount: null,
        summaryLocation: "",
        summaryPhenomenon: "",
        summaryProblem: "",
        summaryRisk: "",
        summaryRequest: ""
    }
];

export default dummyComplaints;
