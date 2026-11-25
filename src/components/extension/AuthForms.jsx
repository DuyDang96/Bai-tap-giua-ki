import React from 'react';

export function LoginForm() {
  return (
    <div className="card">
      <div className="card-header">Đăng nhập</div>
      <form className="card-body" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label" htmlFor="lEmail">Email</label>
          <input 
            id="lEmail" 
            type="email" 
            className="form-control" 
            placeholder="ban@rikkei.edu" 
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="lPw">Mật khẩu</label>
          <input 
            id="lPw" 
            type="password" 
            className="form-control" 
          />
        </div>
        <div className="alert alert-danger py-2" role="alert">
          Thông báo lỗi đăng nhập hiện ở đây.
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export function RegisterForm() {
  return (
    <div className="card">
      <div className="card-header">Đăng ký</div>
      <form className="card-body" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label" htmlFor="rFull">Họ và tên</label>
          <input id="rFull" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="rEmail">Email</label>
          <input id="rEmail" type="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="rPw">Mật khẩu</label>
          <input id="rPw" type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-outline-primary w-100">
          Tạo tài khoản
        </button>
      </form>
    </div>
  );
}
