const memberContainer = document.getElementById("memberScores");

const groupContainer = document.getElementById("groupScores");

const members = [
  "自评",
  "组员1",
  "组员2",
  "组员3（非必填）",
  "组员4（非必填）"
];

members.forEach(name=>{
  memberContainer.innerHTML += createSlider(name,name);
});

for(let i=1;i<=8;i++){
  groupContainer.innerHTML += createSlider(`第${i}组`,`group_${i}`);
}

function createSlider(label,id){

  return `
    <div class="slider-box">

      <label>${label}</label>

      <div class="score-row">

        <input
          type="range"
          min="1"
          max="100"
          value="80"
          id="${id}"
          oninput="document.getElementById('${id}_value').innerText=this.value"
        >

        <div class="score-value" id="${id}_value">80</div>

      </div>

    </div>
  `;
}

document
.getElementById("surveyForm")
.addEventListener("submit", async function(e){

  e.preventDefault();

  const data = {

    group: document.getElementById("group").value,

    name: document.getElementById("name").value,

    self: document.getElementById("自评").value,

    member1: document.getElementById("组员1").value,

    member2: document.getElementById("组员2").value,

    member3: document.getElementById("组员3（非必填）").value,

    member4: document.getElementById("组员4（非必填）").value,

    group1: document.getElementById("group_1").value,

    group2: document.getElementById("group_2").value,

    group3: document.getElementById("group_3").value,

    group4: document.getElementById("group_4").value,

    group5: document.getElementById("group_5").value,

    group6: document.getElementById("group_6").value,

    group7: document.getElementById("group_7").value,

    group8: document.getElementById("group_8").value,

    time: new Date().toLocaleString()
  };

  const issueTitle =
    `${data.name} - ${data.group}`;

  const issueBody = `
# 小组互评提交记录

姓名：${data.name}

组别：${data.group}

提交时间：${data.time}

---

## 本组成员评分

自评：${data.self}

组员1：${data.member1}

组员2：${data.member2}

组员3：${data.member3}

组员4：${data.member4}

---

## 小组评分

第1组：${data.group1}

第2组：${data.group2}

第3组：${data.group3}

第4组：${data.group4}

第5组：${data.group5}

第6组：${data.group6}

第7组：${data.group7}

第8组：${data.group8}
`;

  try{

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/issues`,
      {
        method:"POST",
        headers:{
          "Authorization":`token ${GITHUB_TOKEN}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          title:issueTitle,
          body:issueBody
        })
      }
    );

    if(response.ok){

      document.getElementById("successMessage").innerText =
        "提交成功！";

      document.getElementById("surveyForm").reset();

    }else{

      alert("提交失败，请检查 GitHub Token");
    }

  }catch(error){

    console.error(error);

    alert("发生错误");
  }

});
