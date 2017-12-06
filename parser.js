const match = s =>
  r => r.exec(s)

const parse = module.exports = (innerText, target) => {

  const data = innerText
    .split('\n')
    .map(t => t.trim())

  const head = /(.*)\s\(Period\s(\d)\)\s(.*)/.exec(data[data.indexOf('Summary') - 1]) || '....'
  const info = {
    name: head[1],
    period: head[2],
    instructor: head[3]
  }

  const report = data.reduce((grades, l, i) => {

    if (!/^\d{1,2}\/\d{1,2}\/\d{1,2}/.test(l))
      return grades

    if (/^weighted/.test(data[i - 1])) {

      const info = data[i - 1]
      const getInfo = match(info)
      grades.current = data[i - 2]

      const infoData = getInfo(/(\d+|\*)\sout\sof\s(\d+)/) || '...'
      
      grades[grades.current] = {
        score      : infoData[1],
        total      : infoData[2],
        weight     : getInfo(/(\d+.\d+)%/)[1],
        assignments: []
      }
    }

    const getGrade = match(l)
    const scoreData = getGrade(/(\d+|\*)\sout\sof\s(\d+)/) || '...'

    grades[grades.current].assignments.push({
      name : l.split('\t')[1],
      date : getGrade(/^(\d{1,2}\/\d{1,2}\/\d{1,2})/)[1],
      score: scoreData[1],
      total: scoreData[2]
    })

    return grades
  }, {})

  delete report.current

  return {
    course: info,
    report: report
  }
}
