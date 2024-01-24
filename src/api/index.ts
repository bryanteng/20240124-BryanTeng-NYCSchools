export async function fetchSchoolSATScores(dbn:string) {
  const response = await fetch(`https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=${dbn}`);
  const schoolDetails = await response.json();
  
  return schoolDetails[0];
}

export async function getSchools(){
  const response = await fetch('https://data.cityofnewyork.us/resource/s3k6-pzi2.json')
  const schools = await response.json();

  return schools
}
