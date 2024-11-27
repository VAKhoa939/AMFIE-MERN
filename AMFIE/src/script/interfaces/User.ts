export type Status = "đang hoạt động" | "dừng hoạt động";

export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  position: string;
  userid: string;
  status: Status;
  createAt: string;
  updateAt: string;
  picture: string;
  isActive: boolean;
  password: string;
}

export interface UserResponse extends User {
  _id: string;
  __v: string;
}

const HANDLE_USER_URL = import.meta.env.VITE_API_URL + "/users";

export async function getUserList() {
  const res = await fetch(`${HANDLE_USER_URL}`);
  const data: UserResponse[] = await res.json();
  data.forEach((item) => {
    item.status = item.isActive ? "đang hoạt động" : "dừng hoạt động";
  });

  return data;
}

export async function getUserById(id: string) {
  const res = await fetch(`${HANDLE_USER_URL}/${id}`);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function createUser(user: User) {
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const res = await fetch(`${HANDLE_USER_URL}`, requestInit);
  const data = await res.json();
  return data;
}

export async function updateUser(id: string, user: User) {
  const requestInit: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const res = await fetch(`${HANDLE_USER_URL}/${id}`, requestInit);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function deleteUser(id: string) {
  const requestInit: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`${HANDLE_USER_URL}/${id}`, requestInit);
  const data = await res.json();
  return data;
}
