async function exportCSV(){

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/issues`,
    {
      headers:{
        "Authorization":`token ${GITHUB_TOKEN}`
      }
    }
  );

  const issues = await response.json();

  let csv = "title,created_at,url\n";

  issues.forEach(issue=>{

    csv += `"${issue.title}","${issue.created_at}","${issue.html_url}"\n`;
  });

  const blob = new Blob([csv], { type:"text/csv" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "survey_results.csv";

  a.click();

  document.getElementById("result").innerText =
    "导出成功";
}
