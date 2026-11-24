
import "./o.css"


import Link from 'next/link';

export default function NotFound() {
  
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <h2 className="error-title">غير مصرح لك بدخول</h2>
        <p className="error-desc">لم نتمكن من العثور على المورد المطلوب.</p>
        <Link href="/" className="home-link">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}