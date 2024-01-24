export interface School {
  academicopportunities1: string;
  academicopportunities2: string;
  admissionspriority11: string;
  admissionspriority21: string;
  admissionspriority31:string;
  attendance_rate:string;
  bbl:string;
  bin:string;
  boro:string;
  borough:string;
  building_code:string;
  bus:string;
  census_tract:string;
  city:string;
  code1:string;
  community_board:string;
  council_district:string;
  dbn:string;
  directions1:string;
  ell_programs:string;
  extracurricular_activities:string;
  fax_number:string;
  finalgrades:string;
  grade9geapplicants1:string;
  grade9geapplicantsperseat1:string;
  grade9gefilledflag1:string;
  grade9swdapplicants1:string;
  grade9swdapplicantsperseat1:string;
  grade9swdfilledflag1:string;
  grades2018:string;
  interest1:string;
  latitude:string;
  location:string;
  longitude:string;
  method1:string;
  neighborhood:string;
  nta:string;
  offer_rate1:string;
  overview_paragraph:string;
  pct_stu_enough_variety:string;
  pct_stu_safe:string;
  phone_number:string;
  primary_address_line_1:string;
  program1:string;
  requirement1_1:string;
  requiremetstring2_:string;
  requiremetstring3_:string;
  requirement4_1:string;
  requirement5_1:string;
  school_10th_seats:string;
  school_accessibility_description:string;
  school_email:string;
  school_name:string;
  school_sports:string;
  seats9ge1:string;
  seats9swd1:string;
  seats101:string;
  state_code:string;
  subway:string;
  total_students:string;
  website:string;
  zip:string;
}

export const COLUMNS = [
    // {
    //     Header: 'dbn',
    //     accessor: 'dbn',
    // },
    {
        Header: 'school name',
        accessor: 'school_name',
    },
    {
        Header: 'city',
        accessor: 'city',
    },
    {
        Header: 'phone_number',
        accessor: 'phone_number',
    },
    // add more columns if needed here

];
