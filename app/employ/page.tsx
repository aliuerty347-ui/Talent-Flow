"use client";
import { useEffect, useState } from "react";
import "./page.css"
import { useRouter } from "next/navigation";
export default function EmployCard() {
  const router =useRouter()
  const [employCardData, setEmployCard] = useState<any>([]);
  const [y, setY] = useState(true);
  const [id, setId] = useState("");


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/employle/l');
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setEmployCard(data.data);
        }
      } catch (e) {
        console.log("Fetch error:", e);
      }
    }
    fetchData();
  }, [y]); // إذا كنت تريد إعادة الجلب عند تغيير y، وإلا اجعلها []




  return (
 <><div className="employees-container">
      <div className="header-section">
        <h1 className="title">قائمة الموظفين</h1>
        <button className="refresh-btn" onClick={() => setY(!y)}>
          تحديث البيانات
        </button>
      </div>
      
      {employCardData.length > 0 ? (
        <div className="cards-grid">
          {employCardData.map((emp: any, index: number) => (
            <div key={emp._id || index} className="employee-card" onClick={()=>{router.push(`/employ/${emp._id}`)}}>
              <div className="card-avatar">
                {emp.name ? emp.name.charAt(0).toUpperCase() : "E"}
              </div>
              <div className="card-info">
                <h3>{emp.name || "اسم الموظف"}</h3>
                <span className="badge">{emp.position || emp.role || "موظف"}</span>
                <p className="email">{emp.email || "لا يوجد بريد إلكتروني"}</p>
                
              </div>
            </div>
            
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>لا توجد بطاقات موظفين حالياً أو جاري التحميل...</p>
        </div>
      )}
    </div></>
  );
}