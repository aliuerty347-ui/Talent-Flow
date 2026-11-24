"use client"
import { useEffect, useState } from "react";
import "./page.css"
import { useRouter } from "next/navigation";

export default function Career(){
  const router=useRouter();
    const [career,setCareer]=useState<any>([])
     useEffect(()=>{
           async function fetchData() {
               try{const res = await fetch('/api/CareerOpportunities')
               const data=await res.json();
               setCareer(data.data)
               console.log(data)}
               catch(e:any){
                   console.log(e.message)
               }
           }
           fetchData()
       },[])
      
   
    return(<>
           
    <div className="careers-wrapper">
      <div className="careers-header">
        <h1>فرص العمل المتاحة</h1>
        <button className="btn-refresh" onClick={() => setCareer([])}>
          تحديث البيانات
        </button>
      </div>

      {career.length > 0 ? (
        <div className="careers-grid">
          {career.map((job: any, index: number) => (
            <div key={job._id || index} className="career-card" onClick={()=>{router.push(`/Career/${job._id}`)}}>
              <div className="career-badge-top">
                <span>📍 {job.jobLocation || "عن بُعد"}</span>
                <span className="date-tag">📅 {job.datePosted}</span>
              </div>
              
              <h3 className="career-title">{job.title}</h3>
              
              <div 
                className="career-desc" 
                dangerouslySetInnerHTML={{ __html: job.description }} 
              />

              <div className="career-salary-box">
                <span className="salary-label">الراتب:</span>
                <span className="salary-value">
                  {job.value} {job.currency} / {job.unitText}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-careers">
          <p>لا توجد فرص عمل متاحة حالياً أو جاري التحميل...</p>
        </div>
      )}
    </div>
  

    
    </>)
}