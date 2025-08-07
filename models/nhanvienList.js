export default class NhanVienList {
  constructor() {
    this.arr = [];
  }

  addNhanVien(NhanVien) {
    this.arr.push(NhanVien);
  }
  deleteNhanVien(taiKhoan) {
    this.arr = this.arr.filter(nv => nv.taiKhoan !== taiKhoan);
  }


  getNhanVienById() { }
  updateNhanVien(nvUpdate) {
    const index = this.arr.findIndex(nv => nv.taiKhoan === nvUpdate.taiKhoan);
    if (index !== -1) {
      this.arr[index] = nvUpdate;
    }
  }
  filterNhanVien() { }
}
