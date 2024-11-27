export interface Column {
  header: string;
  accessorKey: string;
  footer: string;
}

export const assetTableColumns: Column[] = [
  {
    header: "Mã tài sản",
    accessorKey: "asset_id",
    footer: "Mã tài sản",
  },
  {
    header: "Số hiệu tài sản",
    accessorKey: "asset_code",
    footer: "Số hiệu tài sản",
  },
  {
    header: "Tên tài sản",
    accessorKey: "name",
    footer: "Tên tài sản",
  },
  {
    header: "Quy cách, đặc điểm tài sản",
    accessorKey: "specifications",
    footer: "Quy cách, đặc điểm tài sản",
  },
  {
    header: "Năm sử dụng",
    accessorKey: "year_of_use",
    footer: "Năm sử dụng",
  },
  {
    header: "Số lượng",
    accessorKey: "quantity",
    footer: "Số Lượng",
  },
  {
    header: "Đơn Giá",
    accessorKey: "unit_price",
    footer: "Đơn Giá",
  },
  {
    header: "Nguyên giá",
    accessorKey: "origin_price",
    footer: "Nguyên giá",
  },
  {
    header: "Số lượng thực tế",
    accessorKey: "real_count",
    footer: "Nguyên giá",
  },
  {
    header: "Phầm trăm hao mòn",
    accessorKey: "depreciation_rate",
    footer: "Phầm trăm hao mòn",
  },
  {
    header: "Nguyên giá còn lại",
    accessorKey: "remaining_value",
    footer: "Nguyên giá còn lại",
  },
  {
    header: "Địa điểm",
    accessorKey: "location",
    footer: "Địa điểm",
  },
  {
    header: "ID người phụ trách",
    accessorKey: "responsible_user",
    footer: "ID người phụ trách",
  },
  {
    header: "Đề nghị thanh lý",
    accessorKey: "suggested_disposal",
    footer: "Đề nghị thanh lý",
  },
  {
    header: "Ghi chú",
    accessorKey: "note",
    footer: "Ghi chú",
  },
];

export const userTableColumns: Column[] = [
  {
    header: "ID người dùng",
    accessorKey: "userid",
    footer: "ID người dùng",
  },
  {
    header: "Tên người dùng",
    accessorKey: "name",
    footer: "Tên người dùng",
  },
  {
    header: "Email",
    accessorKey: "email",
    footer: "Email",
  },
  {
    header: "Số điện thoại",
    accessorKey: "phoneNumber",
    footer: "Số điện thoại",
  },
  { header: "Vai trò", accessorKey: "role", footer: "Vai trò" },
  {
    header: "Chức vụ",
    accessorKey: "position",
    footer: "Chức vụ",
  },
  { header: "Trạng thái", accessorKey: "status", footer: "Trạng thái" },
  { header: "Ngày tạo", accessorKey: "createAt", footer: "Ngày tạo" },
  {
    header: "Cập nhật lần cuối",
    accessorKey: "updateAt",
    footer: "Cập nhật lần cuối",
  },
];
