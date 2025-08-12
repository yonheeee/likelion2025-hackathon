import "../css/First.css" ;
//import Logo from "../../images/Logo"

const First = () => {
    return(
        <div className='firstpage'>
            <div className='first-header'>
                <div className='logo-container'>
                    <img src="{Logo}" alt="로고" className="logo"/>
                    <h1>간편민원접수</h1>
                    <h2>쉽고 빠른 민원 서비스</h2>
                </div>

                <div className="user-selection">
                    <div className="user-button">
                        <img src="user-image" alt="사용자 사진" className="user-image" />
                        <div className="user-button-explanation">
                            
                        </div>
                    </div>
                    <div className="manager-button">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default First;
