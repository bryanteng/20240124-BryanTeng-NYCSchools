export async function fetchSchoolSATScores(dbn:string) {
  const response = await fetch(`https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=${dbn}`, {
        headers: {
          "Content-type": "application/json; charset=utf-8"
        }
  });
  const schoolDetails = await response.json();

  return schoolDetails[0];
}

export async function getSchools(){
  const response = await fetch('https://data.cityofnewyork.us/resource/s3k6-pzi2.json', {
        headers: {
          "Content-type": "application/json; charset=utf-8"
        }
  })
  const schools = await response.json();

  return schools
}
