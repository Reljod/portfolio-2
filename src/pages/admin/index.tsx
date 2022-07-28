import AdminLayout from "components/shared/layouts/AdminLayout";
import LoadingScreen from "components/shared/layouts/LoadingScreen";
import { useEffect, useState } from "react";

const Admin = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AdminLayout>
      <h1 className="text-center mx-auto my-auto text-3xl">Dashboard</h1>
    </AdminLayout>
  );
};

export default Admin;
