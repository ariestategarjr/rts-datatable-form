const API_URL = "http://localhost:1000";

export async function getAllEmployees() {
  const res = await fetch(`${API_URL}/karyawan`);
  if (!res.ok) {
    throw new Error("Gagal fetch semua data karyawan");
  }
  return res.json();
}

export async function getEmployeeById(id: number, params: any) {
  const res = await fetch(`${API_URL}/karyawan/${id}`, params);
  if (!res.ok) {
    throw new Error("Gagal fetch data karyawan");
  }
  const data = await res.json();
  return [data];
}

// export async function getEmployeeById(
//   id: number,
//   params: { page: number; perPage: number }
// ) {
//   const query = new URLSearchParams({
//     _page: String(params.page),
//     _limit: String(params.perPage),
//   });

//   const res = await fetch(`${API_URL}/karyawan/${id}?${query}`);
//   if (!res.ok) {
//     throw new Error("Gagal fetch data karyawan");
//   }
//   const data = await res.json();

//   // misalnya kamu ingin pagination di pendidikan
//   const pendidikan = data ?? [];

//   return {
//     data: pendidikan, // array of pendidikan
//     total: pendidikan.length,
//   };
// }

