/* eslint-disable max-len */
const wrap = arr => ({ stuGradesGrid_74477_004: { tb: { r: arr } } });

module.exports = {
  slimExample: {
    input: wrap([
      { // begin row 1
        c: [
          { cId: 1 }, // the existence of a `cId` key in the first element of `c` denotes that this row is a class header
          { h: '<td></td>' }, // contents of `h` property is the html payload
          { h: '<td></td>' }, // empty <td /> is worthless
          { h: '<td><a data-cNI="97678" data-bkt="TERM 1">100</a></td>' }, // actual grade
          { h: '<td></td>' },
          { h: '<td><a data-cNI="97678" data-bkt="TERM 2">98</a></td>' },
        ],
      }, // end row 1
      { // begin row 2
        c: [
          {}, // the absence of a `cId` key in the first element of `c` denotes that this row is a single assignment
          { h: '<td></td>' }, // all conents of a single assignment row should be ignored
          { h: '<td></td>' },
        ],
      }, // end row 2
    ]),
    output: [
      { course: 97678, scores: [{ bucket: 'TERM 1', score: 100 }, { bucket: 'TERM 2', score: 98 }] },
    ],
  },
  fullCourseExample: {
    input: wrap([
      {
        h: '<tr group-parent="74872_97524_0_02" class="odd cPd vAm bZe tOA gDt3R" data-rowNum="73">',
        c: [
          {
            cId: 'lfpjlbhhckpJMdvn',
            h: '<td scope="row" class="cCl cMwS">lfpjlbhhckpJMdvn</td>',
          },
          {
            h: '<td class="pB gW_74872_004_all"></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all bld"><a id="showGradeInfo" name="showGradeInfo" data-sId="74872" data-eId="004" data-cNI="97524" data-trk="0" data-sec="02" data-gId="2954056" data-bkt="TERM 1" data-lit="PR1" data-isEoc="no" href="javascript:void(0)" >78</a></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all"></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all bld"><a id="showGradeInfo" name="showGradeInfo" data-sId="74872" data-eId="004" data-cNI="97524" data-trk="0" data-sec="02" data-gId="2954056" data-bkt="TERM 2" data-lit="PR2" data-isEoc="no" href="javascript:void(0)" >85</a></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all"></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all bld"><a id="showGradeInfo" name="showGradeInfo" data-sId="74872" data-eId="004" data-cNI="97524" data-trk="0" data-sec="02" data-gId="2954056" data-bkt="TERM 3" data-lit="Q1" data-isEoc="no" href="javascript:void(0)" >90</a></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all"></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all bld"><a id="showGradeInfo" name="showGradeInfo" data-sId="74872" data-eId="004" data-cNI="97524" data-trk="0" data-sec="02" data-gId="2954056" data-bkt="TERM 4" data-lit="PR3" data-isEoc="no" href="javascript:void(0)" >100</a></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all"></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all bld"><a id="showGradeInfo" name="showGradeInfo" data-sId="74872" data-eId="004" data-cNI="97524" data-trk="0" data-sec="02" data-gId="2954056" data-bkt="TERM 5" data-lit="PR4" data-isEoc="no" href="javascript:void(0)" >73</a></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all"></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all bld"><a id="showGradeInfo" name="showGradeInfo" data-sId="74872" data-eId="004" data-cNI="97524" data-trk="0" data-sec="02" data-gId="2954056" data-bkt="TERM 6" data-lit="Q2" data-isEoc="no" href="javascript:void(0)" >80</a></td>',
          },
          {
            h: '<td class="pB gW_74872_004_all bld">86</td>',
          },
          {
            h: '<td class="pB gW_74872_004_all bld"><a id="showGradeInfo" name="showGradeInfo" data-sId="74872" data-eId="004" data-cNI="97524" data-trk="0" data-sec="02" data-gId="2954056" data-bkt="SEM 1" data-lit="S1" data-isEoc="no" href="javascript:void(0)" >85</a></td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
          {
            h: '<td class="uB gW_74872_004_all" tooltip="This grade was not used for this class">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" data-expanders="exp_97524_0_02_74872" class="even bZe vAm tOA sMOA sMId_74872_004_97524_0_02" data-rowNum="74" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3508208" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Judiciary TEST</a></br><label id="abigippTbmqiWWRb" name="abigippTbmqiWWRb" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">12/12/2018&nbsp;&nbsp;(Q2)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">91</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" data-expanders="exp_97524_0_02_74872" class="odd bZe vAm tOA sMOA sMId_74872_004_97524_0_02" data-rowNum="75" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3538030" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Case Notecards</a></br><label id="jkfjkbkhlpiNbnGl" name="jkfjkbkhlpiNbnGl" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">12/04/2018&nbsp;&nbsp;(PR4)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">100</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" data-expanders="exp_97524_0_02_74872" class="even bZe vAm tOA sMOA sMId_74872_004_97524_0_02" data-rowNum="76" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3433761" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Standard Deviants Judicial Qui</a></br><label id="jTdTfpaLciZaBlnl" name="jTdTfpaLciZaBlnl" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">11/30/2018&nbsp;&nbsp;(PR4)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">87</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" data-expanders="exp_97524_0_02_74872" class="odd bZe vAm tOA sMOA sMId_74872_004_97524_0_02" data-rowNum="77" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3424992" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >PREZ TEST</a></br><label id="akAXjYvbalZafKxv" name="akAXjYvbalZafKxv" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">11/27/2018&nbsp;&nbsp;(PR4)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">71</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" data-expanders="exp_97524_0_02_74872" class="even bZe vAm tOA sMOA sMId_74872_004_97524_0_02" data-rowNum="78" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3392730" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >CONGRESS TEST</a></br><label id="kiPGnpUffYdEiMab" name="kiPGnpUffYdEiMab" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">11/14/2018&nbsp;&nbsp;(PR4)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">62</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" style="display:none" data-expanders="exp_97524_0_02_74872" class="odd bZe vAm tOA sMOA sMId_74872_004_97524_0_02 hBSM sf_dontExpand" data-rowNum="79" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3513172" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Letter to your Congressman</a></br><label id="dGxlGjdrdzhjcyjz" name="dGxlGjdrdzhjcyjz" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">11/13/2018&nbsp;&nbsp;(PR4)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">100</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" style="display:none" data-expanders="exp_97524_0_02_74872" class="even bZe vAm tOA sMOA sMId_74872_004_97524_0_02 hBSM sf_dontExpand" data-rowNum="80" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3467631" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Congress FRQ</a></br><label id="joBnndazxjXkyrdR" name="joBnndazxjXkyrdR" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">11/07/2018&nbsp;&nbsp;(PR3)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">75</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" style="display:none" data-expanders="exp_97524_0_02_74872" class="odd bZe vAm tOA sMOA sMId_74872_004_97524_0_02 hBSM sf_dontExpand" data-rowNum="81" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3324427" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Write a Bill</a></br><label id="njQnedbIehcpajca" name="njQnedbIehcpajca" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">11/02/2018&nbsp;&nbsp;(PR3)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">100</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" style="display:none" data-expanders="exp_97524_0_02_74872" class="even bZe vAm tOA sMOA sMId_74872_004_97524_0_02 hBSM sf_dontExpand" data-rowNum="82" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3324408" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Hamilton Group</a></br><label id="aipkaljQigjbmakd" name="aipkaljQigjbmakd" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">11/01/2018&nbsp;&nbsp;(PR3)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">100</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" style="display:none" data-expanders="exp_97524_0_02_74872" class="odd bZe vAm tOA sMOA sMId_74872_004_97524_0_02 hBSM sf_dontExpand" data-rowNum="83" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3232532" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Opinion Poll</a></br><label id="hdcpcKjSafsbVkdd" name="hdcpcKjSafsbVkdd" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">10/12/2018&nbsp;&nbsp;(Q1)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">100</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" style="display:none" data-expanders="exp_97524_0_02_74872" class="even bZe vAm tOA sMOA sMId_74872_004_97524_0_02 hBSM sf_dontExpand" data-rowNum="84" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3223946" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Political Ideology online test</a></br><label id="aoksyiAfiRbjdADd" name="aoksyiAfiRbjdADd" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">10/10/2018&nbsp;&nbsp;(Q1)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">100</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" style="display:none" data-expanders="exp_97524_0_02_74872" class="odd bZe vAm tOA sMOA sMId_74872_004_97524_0_02 hBSM sf_dontExpand" data-rowNum="85" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3068398" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Federalism TEST</a></br><label id="bnlmkhjnLijdZbuj" name="bnlmkhjnLijdZbuj" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">09/18/2018&nbsp;&nbsp;(PR2)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">84</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" style="display:none" data-expanders="exp_97524_0_02_74872" class="even bZe vAm tOA sMOA sMId_74872_004_97524_0_02 hBSM sf_dontExpand" data-rowNum="86" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="2965654" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Unit 1 Test</a></br><label id="RdbjnNjSccbikNRj" name="RdbjnNjSccbikNRj" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">09/06/2018&nbsp;&nbsp;(PR1)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">78</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" style="display:none" data-expanders="exp_97524_0_02_74872" class="odd bZe vAm tOA sMOA sMId_74872_004_97524_0_02 hBSM sf_dontExpand" data-rowNum="87" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3017292" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >B of R Quiz</a></br><label id="nbCbjlQKlbjpajhl" name="nbCbjlQKlbjpajhl" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">08/31/2018&nbsp;&nbsp;(PR1)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">87</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" style="display:none" data-expanders="exp_97524_0_02_74872" class="even bZe vAm tOA sMOA sMId_74872_004_97524_0_02 hBSM sf_dontExpand" data-rowNum="88" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt2R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEw"><a id="showAssignmentInfo" name="showAssignmentInfo" data-sId="74872" data-gId="2954056" data-aId="3020912" data-pos="right" data-type="default" data-maxHeight="550" data-minWidth="400" data-maxWidth="450" data-title="Assignment Details" href="javascript:void(0)" >Bill of Rights Sign Language</a></br><label id="bdcpcbhfbbdbaykd" name="bdcpcbhfbbdbaykd" class="sf_labelRight fIl fXs aLt aD" >Due:</label><span class="fXs fIl">08/20/2018&nbsp;&nbsp;(PR1)</span></div></div></td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all">100</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
          {
            h: '<td class="gDt2Rs cPd gW_74872_004_all uB ">&nbsp;</td>',
          },
        ],
      },
      {
        h: '<tr group-child="74872_97524_0_02" data-expanders="exp_97524_0_02_74872" class="odd bZe vAm tOA sMOA sMId_74872_004_97524_0_02 iSML" data-rowNum="89" data-showMoreParent="74872_004_97524_0_02">',
        c: [
          {
            h: '<td scope="row" class="gDt1R nPd aC cMw"><div class="oEc"><div class="eWs"></div><div class="bEws"><a id="moreAssignmentsEvents_74872_004_97524_0_02" name="moreAssignmentsEvents_74872_004_97524_0_02" style="float:right;padding:3px 2px 3px 0px;" href="javascript:void(0)" >&nbsp;</a></div></div></td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
          {
            h: '<td class="gD1Rs cPd gW_74872_004_all uB  aC noRBdr ">&nbsp;</td>',
          },
        ],
      },
    ]),
    output: [{
      course: 97524,
      scores: [
        { bucket: 'TERM 1', score: 78 },
        { bucket: 'TERM 2', score: 85 },
        { bucket: 'TERM 3', score: 90 },
        { bucket: 'TERM 4', score: 100 },
        { bucket: 'TERM 5', score: 73 },
        { bucket: 'TERM 6', score: 80 },
        { bucket: 'SEM 1', score: 85 },
      ],
    }],
  },
};
