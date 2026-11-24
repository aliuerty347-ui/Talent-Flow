"use client"

import { useEffect, useState } from "react";
import "./page.css"

export default function Create() {
    const [career, setCareer] = useState<any>([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [datePosted, DatePosted] = useState("")
    const [jobLocation, setJobLocation] = useState("")
    const [currency, setcurrency] = useState("")
    const [value, setvalue] = useState("")
    const [unitText, setunitText] = useState("")
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
    async function Delete(e: any) {
        e.preventDefault();
        try {
            const res = await fetch('/api/CareerOpportunities', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: career._id
                })
            }
            )
        } catch (e) {
            console.log(e)
        }
    }

    async function POST1(e: any) {
        e.preventDefault();
        try {
            const res = await fetch('/api/CareerOpportunities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    career:career,
                     title:title,
                    description:description,
                    datePosted:datePosted,
                    jobLocation:jobLocation,
                    currency:currency,
                    value:value,
                    unitText:unitText,
                })
            }
        )
        console.log("aki")
        } catch (e) {
            console.log(e)
        }
    }
    return (<div>
        <h3>Enter information career</h3>
        <form onSubmit={POST1}>
            <input type="text" placeholder="title" onChange={(e: any) => { setTitle(e.target.value) }} />
            <input type="text" placeholder="description" onChange={(e: any) => { setDescription(e.target.value) }} />
            <input type="text" placeholder="datePosted" onChange={(e: any) => { DatePosted(e.target.value) }} />
            <input type="text" placeholder="jobLocation" onChange={(e: any) => { setJobLocation(e.target.value) }} />
            <input type="text" placeholder="currency" onChange={(e: any) => { setcurrency(e.target.value) }} />
            <input type="text" placeholder="value" onChange={(e: any) => { setvalue(e.target.value) }} />
            <input type="text" placeholder="unitText" onChange={(e: any) => { setunitText(e.target.value) }} />
            <input type="submit" />
        </form>
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
                        <div key={job._id || index} className="career-card">
                           <div> <button onClick={Delete} className="btn-delete">delete</button></div>
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



    </div>)
}