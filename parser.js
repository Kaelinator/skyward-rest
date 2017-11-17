const match = s =>
  r => {
    const test = r.exec(s)
    console.log(test)
    return (test && test.length > 1 && test[1] != 'undefined') ? test[1] : '0'
  }

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

      grades[grades.current] = {
        score      : getInfo(/([\d\*]+)\sout\sof\s\d+/),
        total      : getInfo(/[\d\*]+\sout\sof\s(\d+)/),
        weight     : getInfo(/(\d+.\d+)%/),
        assignments: []
      }
    }

    const getGrade = match(l)

    grades[grades.current].assignments.push({
      name : l.split('\t')[1],
      date : getGrade(/^(\d{1,2}\/\d{1,2}\/\d{1,2})/),
      score: getGrade(/(\d+|\*)\sout\sof\s\d+/),
      total: getGrade(/\d+|\*\sout\sof\s(\d+)/)
    })

    return grades
  }, {})

  delete report.current


  return {
    course: info,
    report: report
  }
}
