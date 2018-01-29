
const course = ({ info, origin, encses }, data) => {

  const req = new XMLHttpRequest()

  req.open('POST', origin, false)
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  
  req.send([
    `action=viewGradeInfoDialog`,
    `fromHttp=yes`,
    `stuId=${info.stuId}`,
    `entityId=${data.eid}`,
    `corNumId=${data.cni}`,
    `track=${data.trk}`,
    `section=${data.sec}`,
    `gbId=${data.gid}`,
    `bucket=${data.bkt}`,
    `dialogLevel=1`,
    `isEoc=${data.eoc}`,
    `ishttp=true`,
    `sessionid=${info.sesId}%15${info.wfaacl}`,
    `encses=${encses}`,
    `dwd=${info.dwd}`,
    `wfaacl=${info.wfaacl}`
  ].join('&'))

  return req.response
}

module.exports = {
  course
}