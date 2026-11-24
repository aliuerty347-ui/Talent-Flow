"use client"
import {  useEffect, useState } from "react";

export default function RequestPage() {
      const [requests, setRequests] = useState<any>([]);
        const [d, setD] = useState(false);
      

      // جلب الطلبات السابقة
      const fetchRequests = async () => {
        try {
          const res = await fetch('/api/h');
          const data = await res.json();
          if (data.data){ 
            setRequests(data.data)
            console.log(data.data)
          };
        } catch (err) {
          console.error('خطأ في جلب البيانات', err);
        }
      };
    
      useEffect(() => {
        fetchRequests();
        console.log(d)
      }, [d]);
async function DELETEE(idToDelete: string) {
  try {
    const res = await fetch('/api/h', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json' // تأكد من إضافة الـ Content-Type لكي يقرأ السيرفر البيانات بشكل صحيح
      },
      body: JSON.stringify({
        id: idToDelete
      })
    });
    const data = await res.json();
    console.log(data);
  } catch (e: any) {
    console.log(e.message);
  }
}
return(<>
  {/* قسم عرض جميع الطلبات  */}
      <div className="card">
        <h2>قائمة الطلبات المقدمة</h2>
        <div className="requests-list">
          {requests.length === 0 ? (
            <p className="empty-msg">لا توجد طلبات حالياً.</p>
          ) : (
            requests.map((item:any, index:any) => (
              <div key={item._id || index} className="request-item">
                <p className="req-text">{item.text}</p>
                {item.cvUrl && (<>
                   <button onClick={() => DELETEE(item._id)} className="btn-danger">
  DELETE
</button>
                  <a href={item.cvUrl} target="_blank" rel="noopener noreferrer" className="cv-link">
                    📄 عرض الـ CV
                  </a></>
                )}
              </div>
            ))
          )}
        </div>
      </div>
</>)
}