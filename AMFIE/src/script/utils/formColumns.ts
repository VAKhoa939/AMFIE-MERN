interface FormAttribute {
  key: string;
  label: string;
  type: "text" | "number" | "password" | "textarea" | "dropdown";
  size?: "normal" | "large"; // for text type
  options?: { value: string | number; label: string }[]; // for dropdown type
}

export const createUserFormColumns: FormAttribute[] = [
  { key: "name", label: "Tên tài khoản", type: "text", size: "large" },
  { key: "email", label: "Email", type: "text", size: "normal" },
  { key: "phoneNumber", label: "Số điện thoại", type: "text", size: "normal" },
  { key: "position", label: "Chức vụ", type: "text", size: "normal" },
  { key: "password", label: "Mật khẩu", type: "password", size: "normal" },
];

export const infoUserFormColumns: FormAttribute[] = [
  { key: "name", label: "Tên tài khoản", type: "text", size: "large" },

  { key: "email", label: "Email", type: "text", size: "normal" },
  { key: "phoneNumber", label: "Số điện thoại", type: "text", size: "normal" },
  {
    key: "status",
    label: "Trạng thái",
    type: "dropdown",
    options: [
      { value: "đang hoạt động", label: "Đang hoạt động" },
      { value: "dừng hoạt động", label: "Dừng hoạt động" },
    ],
  },
];
