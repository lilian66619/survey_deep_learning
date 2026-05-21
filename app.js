import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const memberContainer = document.getElementById("memberScores");
const groupContainer = document.getElementById("groupScores");

const members = [
  "自评",
  "组员1",
  "组员2",
  "组员3（非必填）",
  "组员4（非必填）"
];

members.forEach(name => {
  memberContainer.innerHTML += createSlider(name, name);
});

for(let i=1;i<=8;i++){
  groupContainer.innerHTML += createSlider(`第${i}组`, `group_${i}`);
}

function createSlider(label, id){

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
.addEventListener("submit", async (e)=>{

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

    createdAt: serverTimestamp()
  };

  try{

    await addDoc(collection(db, "survey_results"), data);

    document.getElementById("successMessage").innerText =
      "提交成功！";

    document.getElementById("surveyForm").reset();

  }catch(error){

    console.error(error);

    alert("提交失败，请检查 Firebase 配置");
  }
});
