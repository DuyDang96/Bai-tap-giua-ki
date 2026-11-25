import React from 'react';
import { LoginForm, RegisterForm } from '../components/extension/AuthForms';
import { StudentUserBar, StaffUserBar } from '../components/extension/UserBar';
import MyBorrowings from '../components/extension/MyBorrowings';

function AccountPage({ onSelectTab }) {
  return (
    <main className="container py-4">
      <h1 className="h4 mb-1">Phần 2D. Tài khoản và phân quyền</h1>
      <p className="text-muted">
        Màn hình gợi ý: gồm đăng nhập, đăng ký và hai giao diện theo vai trò (sinh viên, nhân viên).
      </p>

      {/* Row: LoginForm & RegisterForm */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <LoginForm />
        </div>
        <div className="col-md-6">
          <RegisterForm />
        </div>
      </div>

      {/* Component: Student UserBar */}
      <StudentUserBar />

      {/* Component: MyBorrowings */}
      <MyBorrowings />

      {/* Component: Staff UserBar */}
      <StaffUserBar onSelectTab={onSelectTab} />
    </main>
  );
}

export default AccountPage;
