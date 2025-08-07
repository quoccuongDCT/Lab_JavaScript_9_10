import NhanVien from "./nhanvien.js";
import NhanVienList from "./nhanvienList.js";

const nhanVienList = new NhanVienList();

function getLocalStorage() {
  const data = localStorage.getItem("DSNV");
  if (data) {
    nhanVienList.arr = JSON.parse(data);
    renderTable(nhanVienList.arr);
  }
}
getLocalStorage();

function setLocalStorage() {
  localStorage.setItem("DSNV", JSON.stringify(nhanVienList.arr));
}

document.getElementById("btnThemNV").onclick = function () {
  if (!validateForm()) return; // Thêm dòng này để kiểm tra
  const taiKhoan = document.getElementById("tknv").value;
  const hoTen = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const matKhau = document.getElementById("password").value;
  const ngayLam = document.getElementById("datepicker").value;
  const luongCB = document.getElementById("luongCB").value;
  const chucVu = document.getElementById("chucvu").value;
  const gioLam = document.getElementById("gioLam").value;

  const nv = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    Number(luongCB),
    chucVu,
    Number(gioLam)
  );

  function clearForm() {
    document.getElementById("tknv").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("datepicker").value = "";
    document.getElementById("luongCB").value = "";
    document.getElementById("chucvu").value = "Chọn chức vụ";
    document.getElementById("gioLam").value = "";
  }

  nhanVienList.addNhanVien(nv);
  setLocalStorage();
  clearForm();
  renderTable(nhanVienList.arr);
};

// Ẩn nút cập nhật khi nhấn "Thêm nhân viên"
document.getElementById("btnThem").onclick = function () {
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "inline-block";
  // Xóa dữ liệu form nếu cần
};

// Thêm nút cập nhật vào từng dòng
function renderTable(arr) {
  let html = "";
  arr.forEach((nv, index) => {
    const nhanVien = Object.setPrototypeOf(nv, NhanVien.prototype);
    html += `
      <tr>
        <td>${nhanVien.taiKhoan}</td>
        <td>${nhanVien.hoTen}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tinhTongLuong()}</td>
        <td>${nhanVien.tinhXepLoai()}</td>
        <td>
          <button class="btn btn-danger btnXoa" data-id="${nhanVien.taiKhoan}">Xóa</button>
          <button class="btn btn-info btnEdit" data-id="${nhanVien.taiKhoan}" data-toggle="modal" data-target="#myModal">Cập nhật</button>
        </td>
      </tr>
    `;
  });
  document.getElementById("tableDanhSach").innerHTML = html;
}

document.getElementById("tableDanhSach").onclick = function (e) {
  if (e.target.classList.contains("btnXoa")) {
    const taiKhoan = e.target.getAttribute("data-id");
    nhanVienList.deleteNhanVien(taiKhoan);
    setLocalStorage();
    renderTable(nhanVienList.arr);
  }
  if (e.target.classList.contains("btnEdit")) {

    const taiKhoan = e.target.getAttribute("data-id");

    document.getElementById("btnCapNhat").style.display = "inline-block";
    document.getElementById("btnThemNV").style.display = "none";

    const nv = nhanVienList.arr.find(nv => nv.taiKhoan === taiKhoan);
    if (nv) {
      document.getElementById("tknv").value = nv.taiKhoan;
      document.getElementById("name").value = nv.hoTen;
      document.getElementById("email").value = nv.email;
      document.getElementById("password").value = nv.matKhau;
      document.getElementById("datepicker").value = nv.ngayLam;
      document.getElementById("luongCB").value = nv.luongCB;
      document.getElementById("chucvu").value = nv.chucVu;
      document.getElementById("gioLam").value = nv.gioLam;
      window.taiKhoanUpdate = taiKhoan;
    }
  }
};

document.getElementById("btnCapNhat").onclick = function () {
  if (!validateForm()) return; // Thêm dòng này để kiểm tra
  const taiKhoan = document.getElementById("tknv").value;
  const hoTen = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const matKhau = document.getElementById("password").value;
  const ngayLam = document.getElementById("datepicker").value;
  const luongCB = document.getElementById("luongCB").value;
  const chucVu = document.getElementById("chucvu").value;
  const gioLam = document.getElementById("gioLam").value;

  const nvUpdate = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    Number(luongCB),
    chucVu,
    Number(gioLam)
  );

  nhanVienList.updateNhanVien(nvUpdate);
  setLocalStorage();
  renderTable(nhanVienList.arr);

  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "inline-block";
};

document.getElementById("searchName").addEventListener("input", function () {
  const keyword = this.value.trim().toLowerCase();
  const filtered = nhanVienList.arr.filter(nv => {
    const nhanVien = Object.setPrototypeOf(nv, NhanVien.prototype);
    return nhanVien.tinhXepLoai().toLowerCase().includes(keyword);
  });
  renderTable(filtered);
});

function validateForm() {
  let valid = true;

  // Tài khoản: 4-6 ký số, không để trống
  const taiKhoan = document.getElementById("tknv").value.trim();
  const regTaiKhoan = /^\d{4,6}$/;
  if (!regTaiKhoan.test(taiKhoan)) {
    document.getElementById("tbTKNV").innerText = "Tài khoản 4-6 ký số!";
    valid = false;
  } else {
    document.getElementById("tbTKNV").innerText = "";
  }

  // Tên: chỉ chữ, không để trống
  const hoTen = document.getElementById("name").value.trim();
  const regTen = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!regTen.test(hoTen)) {
    document.getElementById("tbTen").innerText = "Tên chỉ chứa chữ!";
    valid = false;
  } else {
    document.getElementById("tbTen").innerText = "";
  }

  // Email: đúng định dạng, không để trống
  const email = document.getElementById("email").value.trim();
  const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regEmail.test(email)) {
    document.getElementById("tbEmail").innerText = "Email không hợp lệ!";
    valid = false;
  } else {
    document.getElementById("tbEmail").innerText = "";
  }

  // Mật khẩu: 6-10 ký tự, ít nhất 1 số, 1 in hoa, 1 đặc biệt, không để trống
  const matKhau = document.getElementById("password").value;
  const regMatKhau = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
  if (!regMatKhau.test(matKhau)) {
    document.getElementById("tbMatKhau").innerText = "Mật khẩu 6-10 ký tự, ít nhất 1 số, 1 in hoa, 1 đặc biệt!";
    valid = false;
  } else {
    document.getElementById("tbMatKhau").innerText = "";
  }

  // Ngày làm: không để trống, định dạng mm/dd/yyyy
  const ngayLam = document.getElementById("datepicker").value.trim();
  const regNgay = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!regNgay.test(ngayLam)) {
    document.getElementById("tbNgay").innerText = "Ngày mm/dd/yyyy!";
    valid = false;
  } else {
    document.getElementById("tbNgay").innerText = "";
  }

  // Lương cơ bản: 1tr - 20tr, không để trống
  const luongCB = document.getElementById("luongCB").value.trim();
  if (luongCB === "" || Number(luongCB) < 1000000 || Number(luongCB) > 20000000) {
    document.getElementById("tbLuongCB").innerText = "Lương 1.000.000 - 20.000.000!";
    valid = false;
  } else {
    document.getElementById("tbLuongCB").innerText = "";
  }

  // Chức vụ: phải chọn hợp lệ
  const chucVu = document.getElementById("chucvu").value;
  if (!["Sếp", "Trưởng phòng", "Nhân viên"].includes(chucVu)) {
    document.getElementById("tbChucVu").innerText = "Chọn chức vụ hợp lệ!";
    valid = false;
  } else {
    document.getElementById("tbChucVu").innerText = "";
  }

  // Giờ làm: 80-200, không để trống
  const gioLam = document.getElementById("gioLam").value.trim();
  if (gioLam === "" || Number(gioLam) < 80 || Number(gioLam) > 200) {
    document.getElementById("tbGiolam").innerText = "Giờ làm 80-200!";
    valid = false;
  } else {
    document.getElementById("tbGiolam").innerText = "";
  }

  return valid;
}
