//шаблон для каждого скила
function Skill(skill) {
    return `<div class="skill-container">
                 <div style="flex: 2;">${skill.name}</div>
                 <div class="progress-wrapper" style="margin-bottom: 0;flex: 6">
                      <div class="progress-line" style="background-color:${skill.color!==null?skill.color:'#4ebdd4'};width:${skill.val}">              
                      </div>
                 </div>
             </div>`
}
//шаблон для их контейнера
function SkillsBlock(skills){
    return `<div class="skills_block">
       ${skills.map(Skill).join('')}
</div>`
}

let skills = [
    {
        name:'Сила   ',
        val:'80%',
        color:'#e74438'
    },
    {
        name:'Честь   ',
        val:'85%',
        color:'rgba(16,255,182,0.78)'
    },
    {
        name:'Отвага   ',
        val:'70%',
        color:'rgba(6,176,255,0.64)'
    }
];

$('.skills-sections')[0].innerHTML = SkillsBlock(skills);