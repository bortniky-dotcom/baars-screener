(function () {
  var O = ["Never or rarely","Sometimes","Often","Very often"].map(function (l, i) { return { v: i + 1, l: l }; });
  var CUR = [
    ["Section 1 (Inattention)", ["Fail to give close attention to details or make careless mistakes in my work or other activities","Difficulty sustaining my attention in tasks or fun activities","Don’t listen when spoken to directly","Don’t follow through on instructions and fail to finish work or chores.","Have difficulty organizing tasks and activities","Avoid, dislike, or am reluctant to engage in tasks that require sustained mental effort","Lose things necessary for tasks or activities","Easily distracted by extraneous stimuli or irrelevant thoughts.","Forgetful in daily activities"]],
    ["Section 2 (Hyperactivity)", ["Fidget with hands or feet or squirm in seat","Leave my seat in classrooms or in other situations in which remaining seated is expected","Shift around excessively or feel restless or hemmed in","Have difficulty engaging in leisure activities quietly (feel uncomfortable, or am loud or noisy)","I am “on the go” or act as if “driven by a motor” (or I feel like I have to be busy or always doing something)"]],
    ["Section 3 (Impulsivity)", ["Talk excessively (in social situations)","Blurt out answers before questions have been completed, complete others’ sentences, or jump the gun","Have difficulty awaiting my turn","Interrupt or intrude on others (butt into conversations or activities without permission or take over what others are doing)"]],
    ["Section 4 (Sluggish Cognitive Tempo)", ["Prone to daydreaming when I should have been concentrating on something or working","Have trouble staying alert or awake in boring situations","Easily confused","Easily bored","Spacey or “in a fog”","Lethargic, more tired than others","Underactive or have less energy than others","Slow moving","I don’t seem to process information as quickly or as accurately as others."]]
  ];
  var CH = [
    ["Section 1 (Inattention)", ["Failed to give close attention to details or made careless mistakes in my work or other activities","Had difficulty sustaining my attention in tasks or fun activities","Didn’t listen when spoken to directly","Didn’t follow through on instructions and failed to finish work or chores.","Had difficulty organizing tasks and activities","Avoided, disliked, or was reluctant to engage in tasks that required sustained mental effort","Lost things necessary for tasks or activities","Was easily distracted by extraneous stimuli or irrelevant thoughts.","Was forgetful in daily activities"]],
    ["Section 2 (Hyperactivity-Impulsivity)", ["Fidgeted with hands or feet or squirmed in seat","Left my seat in classrooms or in other situations in which remaining seated was expected","Shifted around excessively or felt restless or hemmed in","Had difficulty engaging in leisure activities quietly (felt uncomfortable, or was loud or noisy)","Was “on the go” or acted as if “driven by a motor”","Talked excessively","Blurted out answers before questions had been completed, completed others’ sentences, or jumped the gun","Had difficulty awaiting my turn","Interrupted or intruded on others (butted into conversations or activities without permission or took over what others were doing)"]]
  ];
  var YN = [{ v: 1, l: "Yes", show: false }, { v: 0, l: "No", show: false }];
  var secs = [], n;
  n = 0; CUR.forEach(function (s, si) { secs.push({ id: "cur" + si, title: "Current Symptoms (past 6 months): " + s[0], items: s[1].map(function (t) { n++; return { id: "c" + n, num: n + ".", text: t, opts: O }; }) }); });
  secs[0].note = "For the first 27 items, choose the answer that best describes your behavior DURING THE PAST 6 MONTHS. Then answer the remaining three questions.";
  secs.push({ id: "cur5", title: "Current Symptoms: Section 5", optional: true, items: [{ id: "c28", num: "28.", text: "Did you experience any of these 27 symptoms at least “Often” or more frequently (did you choose a 3 or a 4 above)?", opts: YN }] });
  secs.push({ id: "cur5t", title: "Current Symptoms: items 29 and 30", type: "text", items: [{ id: "c29_age", text: "29. If so, how old were you when these symptoms began? I was ___ years old." }] });
  secs.push({ id: "cur5c", title: "30. If so, in which of these settings did those symptoms impair your functioning? Check all that apply.", type: "check", items: [{ id: "c30_school", text: "School" }, { id: "c30_home", text: "Home" }, { id: "c30_work", text: "Work" }, { id: "c30_social", text: "Social Relationships" }] });
  secs.push({ id: "cur5e", title: "Current difficulties: examples", type: "text", items: [{ id: "c_ex_school", text: "School:" }, { id: "c_ex_home", text: "Home:" }, { id: "c_ex_work", text: "Work:" }, { id: "c_ex_social", text: "Social Relationships:" }] });
  n = 0; CH.forEach(function (s, si) { secs.push({ id: "ch" + si, title: "Childhood Symptoms (ages 5 to 12): " + s[0], items: s[1].map(function (t) { n++; return { id: "k" + n, num: n + ".", text: t, opts: O }; }) }); });
  secs[secs.length - 2].note = "For the first 18 items, choose the answer that best describes your behavior when you were a child BETWEEN 5 AND 12 YEARS OF AGE. Then answer the remaining two questions.";
  secs.push({ id: "ch3", title: "Childhood Symptoms: Section 3", optional: true, items: [{ id: "k19", num: "19.", text: "Did you experience any of these 18 symptoms at least “Often” or more frequently (did you choose a 3 or a 4 above)?", opts: YN }] });
  secs.push({ id: "ch3c", title: "20. If so, in which of these settings did those symptoms impair your functioning? Check all that apply.", type: "check", items: [{ id: "k20_school", text: "School" }, { id: "k20_home", text: "Home" }, { id: "k20_social", text: "Social Relationships" }] });
  secs.push({ id: "ch3e", title: "Childhood difficulties: examples", type: "text", items: [{ id: "k_ex_school", text: "School:" }, { id: "k_ex_home", text: "Home:" }, { id: "k_ex_social", text: "Social Relationships:" }] });
  window.CFG = {
    slug: "baars", short: "BAARS-IV", sub: "Barkley Adult ADHD Rating Scale-IV, Self-Report: Current and Childhood Symptoms",
    fields: [{ id: "sex", label: "Sex", type: "select", options: ["Male", "Female"] }, { id: "age", label: "Age", type: "number" }],
    intro: "Because the scales cannot be used unless they are fully completed, please respond to each item. Provide only one answer for each item. If unsure of an answer to an item, please give your best estimate.",
    sections: secs,
    scoringHint: '<p class="hint">Each symptom item is rated 1 (Never or rarely) to 4 (Very often). Section Total Score = sum of the section items. Symptom Count = number of items rated 3 (Often) or 4 (Very often), as in items 28 and 19. Current: Total ADHD Score = sum of Sections 1-3 raw scores (items 1-18, 18-72); Section 1 Symptom Count; Sum of Sections 2 and 3 Symptom Counts; Total ADHD Symptom Count (Sections 1-3); SCT Symptom Count (Section 4). Childhood: Section 1 and 2 totals and counts, and their sums. The packet prints no cut-offs or bands.</p>',
    footer: "BAARS-IV Self-Report · Current and Childhood Symptoms · office scoring per packet",
    score: function (A, H) {
      function blk(ids, label) { var t = H.sum(A, ids), c = H.count(A, ids, function (v) { return v >= 3; }), m = H.missing(A, ids).length; return [label, (t === null ? "Total: Incomplete, not scored" : "Total " + t + " of " + ids.length * 4) + ", Symptom Count " + c + (m ? " (" + m + " blank, count may be low)" : "")]; }
      var c1 = H.ids("c", 1, 9), c2 = H.ids("c", 10, 14), c3 = H.ids("c", 15, 18), c4 = H.ids("c", 19, 27), c13 = H.ids("c", 1, 18);
      var k1 = H.ids("k", 1, 9), k2 = H.ids("k", 10, 18), k12 = H.ids("k", 1, 18);
      var cnt = function (ids) { return H.count(A, ids, function (v) { return v >= 3; }); };
      var tot = H.sum(A, c13), ktot = H.sum(A, k12);
      var inc = H.missing(A, c13.concat(c4, k12)).length > 0;
      return { incomplete: inc, rows: [
        blk(c1, "Current Section 1 (Inattention)"), blk(c2, "Current Section 2 (Hyperactivity)"), blk(c3, "Current Section 3 (Impulsivity)"), blk(c4, "Current Section 4 (SCT)"),
        ["Current Total ADHD Score (Sections 1-3)", tot === null ? "Incomplete, not scored" : tot + " of 72"],
        ["Current Section 1 Symptom Count", cnt(c1) + " of 9"],
        ["Current Sum of Sections 2 and 3 Symptom Counts", cnt(c2.concat(c3)) + " of 9"],
        ["Current Total ADHD Symptom Count (Sections 1-3)", cnt(c13) + " of 18"],
        ["Current SCT Symptom Count", cnt(c4) + " of 9"],
        ["Current item 28 (any symptom Often or more)", A.c28 === null ? "blank" : (A.c28 ? "Yes" : "No")],
        blk(k1, "Childhood Section 1 (Inattention)"), blk(k2, "Childhood Section 2 (Hyperactivity-Impulsivity)"),
        ["Childhood Sum of Sections 1-2 Total Scores", ktot === null ? "Incomplete, not scored" : ktot + " of 72"],
        ["Childhood Sum of Sections 1-2 Symptom Counts", cnt(k12) + " of 18"],
        ["Childhood item 19 (any symptom Often or more)", A.k19 === null ? "blank" : (A.k19 ? "Yes" : "No")]
      ] };
    }
  };
})();
