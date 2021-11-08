import axios from 'axios'

export default {
  //회원가입
  walletRegist(name, nickname, mail, platform, account, msg, sig) {
    const params ={
      "name":name,
      "nickname":nickname,
      "mail":mail,
      "platform":platform,
      "account":account,
      "auth": {
        "signer": account,
        "msg": msg,
        "sig": sig
      }
    }
    console.log("param:", JSON.stringify(params))
    return this.api().post(`/wallet/regist`, params)
  },
  walletCheck(address) {
    //지갑 중복체크
    return this.api().get(`/wallet/check/${address}`)
  },
  checkDuplicate(mail, nickname){
    // 메일 및 닉네임 죽봉체크 - 'wallet'서비스에 있어서 여기 있음
    return this.api().get(`/wallet/duplicate/check/${mail}/${nickname}`)
  },
  resendMail(account, msg, sig) {
    const params ={
      "account":account,
      "auth": {
        "signer": account,
        "msg": msg,
        "sig": sig
      }
    }
    console.log("param:", JSON.stringify(params))
    return this.api().post(`/wallet/resend`, params)
  },
  //고객 상세페이지에서 지갑등록
  walletSignedAdd(platform, account, user_id, alias, tag, auth_signer, auth_msg, auth_sig, msg, sig ) {
    const params = {
      "platform":platform,
      "account":account,
      "user_id":user_id,
      "alias":alias,
      "tag":tag,
      "auth":{
        "signer":auth_signer,
        "msg":auth_msg,
        "sig":auth_sig
      },
      "verify":{
        "msg":msg,
        "sig":sig,  
      }
  }
  console.log("params:", params)
  console.log("string:", JSON.stringify(params))
    return this.api().post(`/wallet/add`,params)
  },
  login(platform, account, msg, sig) {
    const params ={
      "platform":platform,
      "account": account,
      "auth": {
        "signer": account,
        "msg": msg,
        "sig": sig
      },
    }
    return this.api().post(`/wallet/login`, params)
  },

  walletUpdate(account, alias, tag, signer, msg, sig) {
    return this.api().put(`/wallet/update/${id}`, {
      "account": account,
      "alias": alias,
      "tag": tag,
      "auth": {
        "signer": signer,
        "msg": msg,
        "sig": sig
      },
    })
  },
  list(user_id){
    return this.api().get(`/wallet/${user_id}/wallets`)
  },
  walletDelete() {
    return this.api().delete(`/wallet/delete/${id}/${account}/${msg}/${sig}`)
  },


  // delete(uid) {
  //    return this.api().delete(`/delete/${uid}`)
  // },

//api()
  api() {
    return axios.create({
      //  baseURL: `https://lakjhu8f9j.execute-api.ap-northeast-2.amazonaws.com/dev/v1/wallet`,
      baseURL: process.env.VUE_APP_WALLET_URL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },
 
}