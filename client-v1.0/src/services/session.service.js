/*** 로그인 프로세스 정리
1. 세션 존재여부 확인
2. 지값주소 가져오기
3. 지갑주소가 등록되어 있는지 확인
4. 분기처리
    - 회원가입
    - 로그인
    - 로그인완료

회원가입 및 로그인 이후, 로그인정보를 로컬스토리지에 저장
- 최종로그인시간
- 주소
- 닉네임
- 아바타
 */

export default {
    checkSession() {
        return true;
    },
    clear(){
        console.log('clear session');
        // this.localStorage.clear();
        localStorage.setItem('__session__', null);
    },
    setUserId(user_id){
        var session = this.loadSession();
        session.userId = user_id;
        this.saveSession(session);
    },
    getUserId(){
        var session = this.loadSession();
        return session.userId;
    },
    setNickname(nickname){
        var session = this.loadSession();
        session.nickname = nickname;
        this.saveSession(session);
    },
    getNickname(){
        var session = this.loadSession();
        return session.nickname;
    },
    loadSession(){
        try{
            var session = JSON.parse(localStorage.getItem('__session__'))
            return session?session:{};
        }catch(e){
            return {}
        }
    },
    saveSession(session){
        localStorage.setItem('__session__', JSON.stringify(session));
    },

    setItems(items = {platform, wallet, nickname, avatar, userId, msg, sig}) {
        const now = new Date();
        let session = this.loadSession();
        session.lastTime = now;

        Object.keys(items).forEach(k => {
            if(items[k])
                session[k] = items[k]
        });

        const stringed_session = JSON.stringify(session)
        localStorage.setItem('__session__', stringed_session);
    },

    logout(){
        this.clear();
    },

    valid(_addr) {
        if(_addr == undefined){
            return false;
        }
        const session = this.loadSession()
        const last = session.lastTime;
        console.log(`${_addr}, ${session.address} sesseion !!`)
        if(session.address && _addr.toUpperCase() !== session.address.toUpperCase()){
            console.log(`${_addr}, ${session.address} 세션정보가 일치하지 않습니다.`)
            return false;
        }
        if(this.isExpired(last)){
            console.log("유효기간이 만료된 토큰입니다.") // 추가로 해줄 작업 없는지 확인
            return false;
        }
        return true
    },

    isExpired(curDate) {
        var today, resultDate;
        today = new Date();
        resultDate = new Date(curDate);
        let timegap = (today - resultDate) / (60 * 60 * 1000);

        // Time (minutes * seconds * millisecond)
        if (timegap <= 24) {
            // console.log('24시간 이내입니다.('+timegap+')')
            return false;
        } else {
            // console.log('24시간이 지났습니다.('+timegap+')')
            return true;
        }
    }

}