/* Just MOCK DATA (swap for real API responses later) */
const CAREERS = {
  'Software Engineer': { requiredSkills:[
    {name:'Python',weight:20},
    {name:'JavaScript',weight:15},
    {name:'SQL',weight:15},
    {name:'Git',weight:10},
    {name:'REST APIs',weight:15},
    {name:'Cloud Deployment',weight:15},
    {name:'Testing & CI/CD',weight:10}
  ]},
  'Data Analytics Officer': { requiredSkills:[
    {name:'SQL',weight:25},
    {name:'Excel',weight:15},
    {name:'Python',weight:20},
    {name:'Data Visualization',weight:20},
    {name:'Statistics',weight:20}
  ]},
  'Digital Marketing Officer': { requiredSkills:[
    {name:'SEO',weight:20},
    {name:'Content Writing',weight:20},
    {name:'Data Analysis',weight:15},
    {name:'Social Media Strategy',weight:25},
    {name:'Excel',weight:20}
  ]}
};
const PROGRAMMES = ['BSc Software Engineering','BCom Finance','BSc Information Technology','BA Communication'];
// Skills each course syllabus is assumed to already teach — this is what a real
// backend would derive from the uploaded curriculum (see the Lecturer path) on the Backend side.
const SYLLABI = {
  'BSc Software Engineering': ['Python','JavaScript','Git','SQL'],
  'BSc Information Technology': ['SQL','Git','Excel'],
  'BCom Finance': ['Excel','Statistics'],
  'BA Communication': ['Content Writing','Social Media Strategy']
};
const RESOURCES = {
  'Python':[{t:'Python for Everybody',p:'Coursera',u:'https://www.coursera.org'}],
  'JavaScript':[{t:'JavaScript.info',p:'Free',u:'https://javascript.info'}],
  'SQL':[{t:'SQL for Data Analysis',p:'Khan Academy',u:'https://www.khanacademy.org'}],
  'Git':[{t:'Git & GitHub Crash Course',p:'freeCodeCamp',u:'https://www.freecodecamp.org'}],
  'REST APIs':[{t:'REST API Design Basics',p:'freeCodeCamp',u:'https://www.freecodecamp.org'}],
  'Cloud Deployment':[{t:'AWS Cloud Practitioner Essentials',p:'AWS Skill Builder',u:'https://skillbuilder.aws'}],
  'Testing & CI/CD':[{t:'CI/CD Fundamentals',p:'GitHub Learning Lab',u:'https://lab.github.com'}],
  'Excel':[{t:'Excel Skills for Business',p:'Coursera',u:'https://www.coursera.org'}],
  'Data Visualization':[{t:'Data Visualization with Python',p:'Coursera',u:'https://www.coursera.org'}],
  'Statistics':[{t:'Statistics and Probability',p:'Khan Academy',u:'https://www.khanacademy.org'}],
  'SEO':[{t:'SEO Fundamentals',p:'HubSpot Academy',u:'https://academy.hubspot.com'}],
  'Content Writing':[{t:'Content Marketing Certification',p:'HubSpot Academy',u:'https://academy.hubspot.com'}],
  'Data Analysis':[{t:'Data Analysis Basics',p:'Coursera',u:'https://www.coursera.org'}],
  'Social Media Strategy':[{t:'Social Media Marketing',p:'Meta Blueprint',u:'https://www.facebook.com/business/learn'}]
};

const DEFAULT_RESOURCE = {t:'Search this skill on ALX Africa / Coursera',p:'General',u:'https://www.coursera.org'};

const UNIT_ADVICE = {
  'Cloud Deployment':'Add an elective in Cloud Computing (e.g. AWS/Azure fundamentals).',
  'Testing & CI/CD':'Look for a Software Quality Assurance or DevOps unit.',
  'REST APIs':'Take a Web Services / API Development unit.',
  'Data Visualization':'Take a Data Visualization or BI Tools unit.',
  'Statistics':'Take an additional Statistics/Probability unit.',
  'Social Media Strategy':'Take a Digital Marketing Strategy unit.',
  'SEO':'Take a Digital Marketing / SEO fundamentals short course.',
  'Content Writing':'Take a Business/Technical Writing unit.',
  'Data Analysis':'Take an introductory Data Analysis unit.',
  'JavaScript':'Take a Web Development / Frontend unit.',
  'Python':'Take an Introduction to Programming unit.',
  'SQL':'Take a Databases unit.',
  'Git':'Take a Software Engineering Practices unit covering version control.',
  'Excel':'Take a Business Computing / Spreadsheets unit.'
};

// KCSE pathway matching by declared interest
const KCSE_INTERESTS = ['Computing & Problem Solving','Business & Numbers','Healthcare & Sciences','Creative & Media','Social & Communication'];

const KCSE_PATHWAYS = {
  'Computing & Problem Solving': { degree:'Software Engineering', demand:'Web Development and Cloud skills', courses:['BSc Software Engineering','BSc Computer Science','BSc Information Technology'] },

  'Business & Numbers': { degree:'Data Analytics / Finance', demand:'Data Analysis and Financial Modelling skills', courses:['BCom Finance','BSc Statistics','BSc Actuarial Science'] },

  'Healthcare & Sciences': { degree:'Health Sciences', demand:'Clinical Data and Lab Technology skills', courses:['BSc Nursing','BSc Public Health','BSc Biomedical Sciences'] },

  'Creative & Media': { degree:'Digital Media & Design', demand:'UI/UX Design and Content Production skills', courses:['BA Communication','BSc Multimedia','Diploma in Graphic Design'] },

  'Social & Communication': { degree:'Communication / PR', demand:'Digital Marketing and Content Strategy skills', courses:['BA Communication','BCom Marketing','BA Public Relations'] }
};
// Canned aggregate insight for the Lecturer path (stands in for real cross-student + job-post aggregation)
const LECTURER_INSIGHTS = {
  'Computing Department': {
    headline: '85% of entry-level software jobs in Kenya now require cloud computing skills, but this topic appears in only 1 elective unit. Consider updating that unit or adding a dedicated cloud module.',
    rows: [
      {skill:'Cloud Computing', demandPct:85, coverage:'1 elective unit'},
      {skill:'Data Visualization', demandPct:63, coverage:'Not currently covered'},
      {skill:'DevOps / CI-CD', demandPct:54, coverage:'Not currently covered'},
      {skill:'SQL & Databases', demandPct:78, coverage:'2 core units'}
    ]
  },
  'Business Department': {
    headline: '70% of finance entry-level roles now expect basic data analysis tools (Excel + SQL) alongside accounting fundamentals — SQL is not currently taught in any core unit.',
    rows: [
      {skill:'SQL', demandPct:70, coverage:'Not currently covered'},
      {skill:'Financial Modelling', demandPct:66, coverage:'1 core unit'},
      {skill:'Excel (Advanced)', demandPct:81, coverage:'1 core unit'}
    ]
  },
  'Communication Department': {
    headline: '58% of communication/marketing job posts now list social media analytics as a requirement, but it is not covered in the current curriculum.',
    rows: [
      {skill:'Social Media Analytics', demandPct:58, coverage:'Not currently covered'},
      {skill:'Content Writing', demandPct:72, coverage:'2 core units'},
      {skill:'SEO', demandPct:45, coverage:'Not currently covered'}
    ]
  }
};

/*  MOCK BACKEND (localStorage). Swap function BODIES for fetch() later */
const usersKey='cl_users', sessionKey='cl_session';
const readUsers = () => JSON.parse(localStorage.getItem(usersKey)||'[]');
const writeUsers = u => localStorage.setItem(usersKey, JSON.stringify(u));
const profileKey = id => 'cl_profile_'+id;
const emptyProfile=() => ({role:null, programme:'',careerGoal:'',skills:[],qualifications:[]});
const getProfile=id => ({...emptyProfile(), ...JSON.parse(localStorage.getItem(profileKey(id))||'{}')});
const saveProfileToStore = (id,p) => localStorage.setItem(profileKey(id), JSON.stringify(p));

function register(name,email,password){
  const users=readUsers();
  if(users.some(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error('An account with this email already exists.');
  const user = {id:crypto.randomUUID(),name,email,password}; // NOTE: plain text — demo only, hash on a real backend
  users.push(user); writeUsers(users);
  return {id:user.id,name:user.name,email:user.email};
}
function login(email,password){
  const user=readUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  if(!user || user.password !== password) throw new Error('Incorrect email or password.');
  return {id:user.id,name:user.name,email:user.email};
}

/*  App state  */
let session = JSON.parse(localStorage.getItem(sessionKey)||'null');
let profile = session?getProfile(session.id):emptyProfile();

function setSession(u){ session = u; localStorage.setItem(sessionKey, JSON.stringify(u)); profile=getProfile(u.id); }
function clearSession(){ session = null; localStorage.removeItem(sessionKey); profile = emptyProfile(); }
function persistProfile(){ saveProfileToStore(session.id, profile); }

/*  Matching logic  */
const LEVEL_VALUE = {Beginner:0.4,Intermediate:0.7,Advanced:1.0};
// University path: checks syllabus coverage first, then the student's own added skills (whichever is stronger)
function computeCourseGapAnalysis(programme, personalSkills, required){
  const taught = SYLLABI[programme] || [];
  let totalWeight=0, earned=0;
  const rows=required.map(req=>{
    totalWeight+=req.weight;
    const personal=personalSkills.find(s => s.name.toLowerCase() === req.name.toLowerCase());
    const inSyllabus = taught.some(s => s.toLowerCase() === req.name.toLowerCase());
    const personalValue = personal ? (LEVEL_VALUE[personal.level] ?? 0.5) : 0;
    const syllabusValue = inSyllabus ? 0.7 : 0;
    const value = Math.max(personalValue, syllabusValue);
    const source = personalValue >= syllabusValue && personal ? 'You' : (inSyllabus ? 'Course' : 'Gap');
    earned += req.weight*value;
    return {skill:req.name, pct:Math.round(value*100), source, isGap: value<0.7};
  });
  return {overall: totalWeight?Math.round(earned/totalWeight*100):0, rows: rows.sort((a,b)=>a.pct-b.pct), gaps: rows.filter(r=>r.isGap).map(r=>r.skill)};
}

/*  Nav + routing  */
const PROTECTED = ['path','kcse','profile','gaps','recommendations','lecturer'];
function renderNav(){
  const tabs = document.getElementById('tabs');
  if(session){
    let links = '';
    if(profile.role === 'kcse') links='<button class ="tab-btn" data-view="kcse">KCSE Pathway</button>';
    if(profile.role === 'university') links = '<button class = "tab-btn" data-view = "profile">Profile</button><button class = "tab-btn" data-view = "gaps">Skill Gaps</button><button class="tab-btn" data-view="recommendations">Recommendations</button>';
    if(profile.role === 'lecturer') links = '<button class="tab-btn" data-view="lecturer">Lecturer Insights</button>';
    tabs.innerHTML=`${links}
      <button class = "tab-btn" data-view = "path">Change path</button>
      <span class = "muted" style = "margin:0 8px">Hi, ${session.name.split(' ')[0]}</span>
      <button class = "tab-btn" id = "logoutBtn">Log out</button>`;
    document.getElementById('logoutBtn').onclick = () => { clearSession(); renderNav(); showView('home'); };
  } else {
    tabs.innerHTML = `<button class = "tab-btn" data-view = "login">Log in</button><button class = "tab-btn" data-view = "register">Sign up</button>`;
  }
  tabs.querySelectorAll('.tab-btn').forEach(b => b.onclick = ()=> showView(b.dataset.view));
}
function showView(id){
  if(PROTECTED.includes(id) && !session){ id ='login'; }
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const btn=document.querySelector('.tab-btn[data-view ="'+id+'"]'); if(btn) btn.classList.add('active');
  if(id === 'kcse') renderKcseView();
  if(id === 'profile') renderProfileView();
  if(id === 'gaps') renderGapsView();
  if(id === 'recommendations') renderRecommendationsView();
  if(id === 'lecturer') renderLecturerView();
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('.change-path').forEach(b => b.onclick = () => showView('path'));
document.getElementById('homeCta').onclick = () => showView(session?(profile.role?routeForRole(profile.role):'path'):'register');
function routeForRole(role){ return role === 'kcse'?'kcse':role === 'lecturer'?'lecturer':'profile'; }
function afterAuthRedirect(){ showView(profile.role?routeForRole(profile.role):'path'); }

/*  Auth forms  */
document.getElementById('registerForm').addEventListener('submit', e =>{
  e.preventDefault();
  const err = document.getElementById('regError'); err.textContent = '';
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pw = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirm').value;
  if(pw.length<6){ err.textContent='Password must be at least 6 characters.'; return; }
  if(pw !== confirm){ err.textContent = 'Passwords do not match.'; return; }
  try{ setSession(register(name,email,pw)); renderNav(); afterAuthRedirect(); }
  catch(ex){ err.textContent=ex.message; }
});
document.getElementById('loginForm').addEventListener('submit', e=>{
  e.preventDefault();
  const err=document.getElementById('loginError'); err.textContent='';
  try{ setSession(login(document.getElementById('loginEmail').value.trim(), document.getElementById('loginPassword').value)); renderNav(); afterAuthRedirect(); }
  catch(ex){ err.textContent=ex.message; }
});

/*  Path chooser  */
document.getElementById('pickKcse').onclick = () => { profile.role = 'kcse'; persistProfile(); renderNav(); showView('kcse'); };
document.getElementById('pickUniversity').onclick = () => { profile.role='university'; persistProfile(); renderNav(); showView('profile'); };
document.getElementById('pickLecturer').onclick = () => { profile.role='lecturer'; persistProfile(); renderNav(); showView('lecturer'); };

/*  KCSE pathway  */
document.getElementById('kcseInterest').innerHTML = KCSE_INTERESTS.map(i => `<option>${i}</option>`).join('');
function renderKcseView(){ document.getElementById('kcseResult').innerHTML = ''; }
document.getElementById('kcseForm').addEventListener('submit', e => {
  e.preventDefault();
  const grade = document.getElementById('kcseGrade').value;
  const interest = document.getElementById('kcseInterest').value;
  const path = KCSE_PATHWAYS[interest];
  document.getElementById('kcseResult').innerHTML = `
    <div class = "card">
      <h3  = "font-size:1.05rem;margin-bottom:10px">Your pathway</h3>
      <p style = "margin-bottom:12px">Based on current job market data, <b>${path.degree}</b> degrees currently show high demand for <b>${path.demand}</b>. With a mean grade of <b>${grade}</b>, here are course options aligned with this pathway:</p>
      <ul style = "padding-left:18px; margin-bottom:10px">${path.courses.map(c => `<li>${c}</li>`).join('')}</ul>
      <p class = "muted">Check KUCCPS cut-off points for your grade before applying — this shows demand direction, not admission guarantees.</p>
    </div>`;
});

/*  University: Profile  */
document.getElementById('programmeSelect').innerHTML = PROGRAMMES.map(p => `<option>${p}</option>`).join('');
function careerOptions(selectedValue){
  return Object.keys(CAREERS).map(c =>`<option ${ c=== selectedValue?'selected':''}>${c}</option>`).join('');
}
function renderProfileView(){
  document.getElementById('programmeSelect').value=profile.programme||PROGRAMMES[0];
  document.getElementById('careerGoalSelect').innerHTML = '<option value = "">Select…</option>'+careerOptions(profile.careerGoal);
  document.getElementById('skillChips').innerHTML = profile.skills.length
    ? profile.skills.map(s => `<span class="chip">${s.name} · ${s.level}<button data-skill="${s.name}" class="rmSkill">×</button></span>`).join('')
    : '<p class = "muted">No extra skills added yet.</p>';
  document.querySelectorAll('.rmSkill').forEach(b=>b.onclick=()=>{
    profile.skills=profile.skills.filter(s=>s.name!==b.dataset.skill); persistProfile(); renderProfileView();
  });
  document.getElementById('qualList').innerHTML = profile.qualifications.length
    ? profile.qualifications.map(q => `<div class = "list-item"><span>${q.degree} — ${q.institution}${q.year?' ('+q.year+')':''}${q.grade?' · '+q.grade:''}</span><button data-id = "${q.id}" class = "rmQual">Remove</button></div>`).join('')
    : '<p class = "muted">None added yet.</p>';
  document.querySelectorAll('.rmQual').forEach(b => b.onclick = () => {
    profile.qualifications = profile.qualifications.filter(q => q.id !== b.dataset.id); persistProfile(); renderProfileView();
  });
}
document.getElementById('saveBasics').onclick = () => {
  profile.programme=document.getElementById('programmeSelect').value;
  profile.careerGoal=document.getElementById('careerGoalSelect').value;
  persistProfile();
};
document.getElementById('skillForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('skillName').value.trim();
  const level = document.getElementById('skillLevel').value;
  if(!name || profile.skills.some(s => s.name.toLowerCase() === name.toLowerCase())) return;
  profile.skills.push({name,level}); persistProfile();
  document.getElementById('skillName').value = ''; renderProfileView();
});
document.getElementById('qualForm').addEventListener('submit', e => {
  e.preventDefault();
  const degree = document.getElementById('qualDegree').value.trim();
  const institution = document.getElementById('qualInstitution').value.trim();
  if(!degree||!institution) return;
  profile.qualifications.push({id:crypto.randomUUID(),degree,institution,
    year:document.getElementById('qualYear').value.trim(), grade:document.getElementById('qualGrade').value.trim()});
  persistProfile();
  ['qualDegree','qualInstitution','qualYear','qualGrade'].forEach(id => document.getElementById(id).value = '');
  renderProfileView();
});
document.getElementById('goToGaps').onclick = () => showView('gaps');

/*  University: Skill Gaps  */
function renderGapsView(){
  const sel = document.getElementById('gapsCareerSelect');
  sel.innerHTML = careerOptions(profile.careerGoal||Object.keys(CAREERS)[0]);
  sel.onchange = () => renderGapResults(sel.value);
  renderGapResults(sel.value);
}
function renderGapResults(career){
  const list = document.getElementById('gapList');
  const programme = profile.programme || PROGRAMMES[0];
  const {overall, rows, gaps} = computeCourseGapAnalysis(programme, profile.skills, CAREERS[career].requiredSkills);
  document.getElementById('overallPct').textContent=overall+'%';
  list.innerHTML=rows.map(r =>`
    <div class = "gap-row"><div>${r.skill}</div>
      <div class = "bar-track"><div class = "bar-fill" style = "width:${r.pct}%;background:${r.isGap?'var(--clay)':'var(--teal)'}"></div> </div>
      <div class = "src ${r.source === 'You'?'you':''}">${r.source}</div>
      <div style = "text-align:right;font-weight:500">${r.pct}%</div>
    </div>`).join('');
  const advice = document.getElementById('unitAdvice');
  advice.innerHTML = gaps.length
    ? `<h3 style="font-size:1rem;margin-bottom:10px">Units to consider, to close these gaps</h3>` +
      gaps.map(g => `<p style = "margin-bottom:6px"><b>${g}:</b> ${UNIT_ADVICE[g] || 'Consider a short online course or elective covering this skill.'}</p>`).join('')
    : `<p class = "muted">Your course plus your added skills already cover this role well.</p>`;
}
document.getElementById('seeRecommendations').onclick = () => showView('recommendations');

/* ============== University: Recommendations  */
function renderRecommendationsView(){
  const sel=document.getElementById('recCareerSelect');
  sel.innerHTML=careerOptions(profile.careerGoal||Object.keys(CAREERS)[0]);
  sel.onchange=()=>renderRecResults(sel.value);
  renderRecResults(sel.value);
}
function renderRecResults(career){
  const programme=profile.programme||PROGRAMMES[0];
  const {gaps}=computeCourseGapAnalysis(programme, profile.skills, CAREERS[career].requiredSkills);
  const el=document.getElementById('recList');
  if(gaps.length===0){ el.innerHTML='<div class="card">No major gaps found for this role — nice work.</div>'; return; }
  el.innerHTML=gaps.map(skill=>{
    const res=RESOURCES[skill]||[DEFAULT_RESOURCE];
    return `<div class="card"><h3 style="font-size:1rem;margin-bottom:10px"><span style="color:var(--clay)">Gap:</span> ${skill}</h3>
      ${res.map(r=>`<div><a class="reslink" href="${r.u}" target="_blank" rel="noreferrer">${r.t}</a> <span class="muted">— ${r.p}</span></div>`).join('')}
    </div>`;
  }).join('');
}

/*  Lecturer / Admin  */
function renderLecturerView(){ document.getElementById('lecturerResult').innerHTML = ''; }
document.getElementById('lecturerForm').addEventListener('submit', e => {
  e.preventDefault();
  const dept = document.getElementById('deptSelect').value;
  const insight = LECTURER_INSIGHTS[dept];
  document.getElementById('lecturerResult').innerHTML = `
    <div class = "card">
      <h3 style = "font-size:1.05rem;margin-bottom:10px">${dept}: trend summary</h3>
      <p style = "margin-bottom:14px">${insight.headline}</p>
      <div>
        <div class = "insight-row" style = "font-weight:600"><span>Skill</span><span>Job demand</span><span>Current curriculum coverage</span></div>
        ${insight.rows.map(r=>`<div class = "insight-row"><span>${r.skill}</span><span>${r.demandPct}%</span><span>${r.coverage}</span></div>`).join('')}
      </div>
    </div>`;
});

/*  Init  */
renderNav();
showView('home');
