"use client";
import AdminLayout from '@/layouts/AdminLayout';
import React from 'react';
import TruckStats from '@/components/Admin-Landing-page/TruckStats';
import TruckTable from '@/components/Admin-Landing-page/TruckTable';

const AdminLandingPage = () => {
  return (
    <AdminLayout>
      <div>
        <TruckStats />
        <TruckTable />
      </div>
    </AdminLayout>
  );
};

export default AdminLandingPage;
