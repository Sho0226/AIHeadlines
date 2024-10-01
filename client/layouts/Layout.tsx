import { BasicHeader } from 'layouts/basicHeader/BasicHeader';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode; // 子要素を受け取るための型定義
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <BasicHeader />
      {children}
    </div>
  );
};
