import React, { useState } from 'react';
import ReserveForm from '../components/extension/ReserveForm';
import QueueTable from '../components/extension/QueueTable';
import { initialQueue } from '../mockData';

function QueuePage() {
  const [queue, setQueue] = useState(initialQueue);

  const handleCancel = (index) => {
    setQueue(queue.map((item, i) => 
      i === index 
        ? { ...item, status: 'Đã hủy', statusType: 'secondary', order: '—', canCancel: false }
        : item
    ));
  };

  return (
    <main className="container py-4">
      <h1 className="h4 mb-1">Phần 2C. Đặt trước và hàng chờ</h1>
      <p className="text-muted">
        Màn hình gợi ý: bạn tự thiết kế quy tắc xếp hàng và các trạng thái.
      </p>

      {/* Component: ReserveForm */}
      <ReserveForm />

      {/* Component: QueueTable */}
      <QueueTable queue={queue} onCancel={handleCancel} />
    </main>
  );
}

export default QueuePage;
