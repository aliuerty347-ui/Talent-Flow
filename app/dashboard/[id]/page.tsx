"use client"
import { useEffect, useState } from "react";
import "./page.css"
import { useParams, useRouter } from "next/navigation";

export default function Career(){
  const router=useRouter()
  const [employee,setEmployee]=useState<any>([])
  const [b,setB]=useState(false)
  const params = useParams(); // 2. قراءة بارامترات الرابط
    const id = params?.id;
    console.log(id)
  useEffect(()=>{
    async function fetchData(){
      const res=await fetch(`/api/employle/?s=${id}`)
      const data=await res.json();
      setEmployee(data.data)
      console.log(data)
    }
    fetchData()
  },[])
  async function i(e:any) {
    e.preventDefault()
  try{  const res=fetch('/api/employle',{method:'DELETE',
        headers:{"A":"h"},
        body:JSON.stringify({
            id:employee._id
        })
    })
    setB(!b)
    console.log("ok")}
    catch(e:any){
        console.log(e.message)
    }
  }
  return (
        <div className="employee-details-container">
           {b?<h1>you delete employ</h1>:<><div className="employee-card-large">
                <div className="card-avatar-large">
                    {employee.name ? employee.name.charAt(0).toUpperCase() : "E"}
                </div>
                <div className="card-info-large">
                    <h1>{employee.name || "اسم الموظف"}</h1>
                    <span className="badge-large">
                        {employee.position || employee.role || "موظف"}
                    </span>
                    <p className="email-large">📧 {employee.email || "لا يوجد بريد إلكتروني"}</p>
                    
                    {/* عرض المعلومات الإضافية الجديدة */}
                    <div className="extra-details" style={{ marginTop: "20px", textAlign: "right", borderTop: "1px solid #334155", paddingTop: "15px" }}>
                        <p>📞 <strong>الهاتف:</strong> {employee.phone || "غير متوفر"}</p>
                        <p>🏢 <strong>القسم:</strong> {employee.department || "غير محدد"}</p>
                        <p>💰 <strong>الراتب:</strong> {employee.salary ? `${employee.salary} $` : "غير متوفر"}</p>
                        <p>📍 <strong>العنوان:</strong> {employee.address || "غير متوفر"}</p>
                        <button onClick={i}>delete</button>
                    </div>
                </div>
            </div></> }
        </div>
    );
}