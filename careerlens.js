function showView(id){
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelector('.tab-btn[data-view="'+id+'"]').classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  }
  document.querySelectorAll('.tab-btn').forEach(b => b.addEventListener('click',() => showView(b.dataset.view)));
  document.querySelectorAll('#skillChips .chip').forEach(c => c.addEventListener('click',() => c.classList.toggle('picked')));

  const gaps = [
    {skill:'Python', pct:85, have:true},
    {skill:'Git & version control', pct:70, have:true},
    {skill:'SQL', pct:60, have:true},
    {skill:'REST APIs', pct:30, have:false},
    {skill:'Cloud deployment (AWS/Azure)', pct:15, have:false},
    {skill:'Testing & CI/CD', pct:10, have:false},
  ];
  document.getElementById('gapList').innerHTML = gaps.map(g =>`
    <div class="gap-row">
      <div>${g.skill}</div>
      <div class="bar-track">
      <div class="bar-fill" style="width:${g.pct}%; background:${g.have?'var(--teal)':'var(--clay)'}">
      </div>
      </div>
      <div class="pct">${g.pct}%</div>
    </div>`).join('');

  const jobs = [
    {title:'Junior Backend Developer', employer:'Nairobi FinTech Co.', match:82, have:['Python','SQL','Git'], missing:['REST APIs']},
    {title:'Data Analyst Intern', employer:'AgriData Kenya', match:74, have:['SQL','Excel'], missing:['Data Visualization']},
    {title:'Software Engineer, Entry Level', employer:'Cloudbridge Systems', match:58, have:['Python','Git'], missing:['Cloud deployment','Testing & CI/CD']},
  ];
  document.getElementById('jobList').innerHTML = jobs.map(j =>`
    <div class="job">
      <div>
        <h3>${j.title}</h3>
        <div class="employer">${j.employer}</div>
        <div class="tags">
          ${j.have.map(s=>`<span class="tag">${s}</span>`).join('')}
          ${j.missing.map(s=>`<span class="tag missing">Missing: ${s}</span>`).join('')}
        </div>
      </div>
      <div class="match"><b>${j.match}%</b><span>match</span></div>
    </div>`).join('');