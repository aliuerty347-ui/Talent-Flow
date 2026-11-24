"use client"

import { useEffect, useState } from "react"
import "./page.css"
import { useParams } from "next/navigation";
import Link from "next/link";
export default function o() {
    const [text, setText] = useState("");
    const [id1, setId1] = useState<any>("");
    const [file, setFile] = useState<any>("");
    const [loading, setLoading] = useState(false);
    const [d1, setD1] = useState<boolean | any>(false);
    const [d2, setD2] = useState(false);
    const [d3, setD3] = useState(false);
    const params = useParams();
    const id = params?.id;
    const [career, setcareer] = useState<any>([])
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/CareerOpportunities/?d=${id}`)
            const data = await res.json();
            setcareer(data.data)
            console.log(data)
        }
        fetchData()
    }, [])
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
       
        try {
            console.log(text)
            console.log(file)
            const res = await fetch('/api/h', {
                method: 'POST',
                headers: {
                    "D": "d"
                },
                body: JSON.stringify({
                    text: text,
                    cvUrl: file,
                }), 
            });
            const data = await res.json()
            console.log(data)
            setD1(!d1)
            localStorage.setItem("id", id1)
            localStorage.removeItem("id")

        } catch (err) {
            console.error('خطأ في إرسال الطلب', err);
            setD2(!d2)
        } finally {
            setLoading(false);
        }
    };
    console.log(id)
    return (<>
        <div className="career-details-container">
            <div className="career-card-large">
                <div className="career-header">
                    <h1>{career.title || "عنوان الوظيفة"}</h1>
                    <span className="location-badge">📍 {career.jobLocation || "غير محدد"}</span>
                </div>

                <div className="career-body">
                    <h3>وصف الوظيفة:</h3>
                    <p className="description-text">{career.description || "لا يوجد وصف متوفر."}</p>
                </div>

                <div className="career-footer-info">
                    <div className="info-item">
                        <span>💰 الراتب:</span>
                        <strong>{career.value ? `${career.value} ${career.currency || ""}` : "غير محدد"} {career.unitText ? `/ ${career.unitText}` : ""}</strong>
                    </div>
                    <div className="info-item">
                        <span>📅 تاريخ النشر:</span>
                        <strong>{career.datePosted ? new Date(career.datePosted).toLocaleDateString() : "غير متوفر"}</strong>
                    </div>
                </div>
                <button className="u" onClick={() => { setD3(!d1) }}>تقديم</button>

                {d3 ? <>

                    {localStorage.getItem("d1") && d2 ? <><h1>تم اضافة طلب</h1></> : <>  <div className="card">
                        <h2>تقديم طلب جديد</h2>
                        <form onSubmit={handleSubmit} className="request-form">
                            <div className="form-group">
                                <label>تفاصيل الطلب:</label>
                                <input
                                    type="text"
                                    placeholder="أدخل تفاصيل الطلب..."
                                    value={text}
                                    onChange={(e: any) => setText(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>    رفع السيرة الذاتية  (CV)  :</label>
                                <input
                                    className="o"
                                    type="url"
                                    placeholder='url'
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e: any) => {
                                        setFile(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <button type="submit" disabled={loading} className="btn-primary">
                                {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
                            </button>
                        </form>
                    </div>
                    </>}
                </> : <></>
                }</div><div className="container">





            </div>
        </div></>)
}