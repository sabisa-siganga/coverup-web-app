import React from "react";
import Link from "next/link";

const AdminNav = () => {
  return (
    <nav>
      <Link href="#">Parlours</Link>
      <Link href="#">Users</Link>
      <Link href="#">Analytics</Link>
    </nav>
  );
};

export default AdminNav;
