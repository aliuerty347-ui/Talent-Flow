"use client"

import { useEffect, useState } from "react";
import "./page.css"
import { useRouter } from "next/navigation";
import { useAuth, useUser } from '@clerk/nextjs';
export default function dashboard() {
    const [role, setRole] = useState("")
    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setphone] = useState("")
    const [department, setdepartment] = useState("")
    const [salary, setsalary] = useState("")
    const [address, setaddress] = useState("")
    const [hireDate, sethireDate] = useState("")
    const [employCardData, setEmployCard] = useState<any>([]);
  const [y, setY] = useState(true);
  const router=useRouter();
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
      }, [y])
    async function r(e: any) {
const { userId } = useAuth(); 

  console.log("User ID:", userId);
        e.preventDefault();
        try {
            const res = await fetch('/api/employle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId: userId,
                    name: name,
                    position: position,
                    role: role,
                    email: email,
                    phone:phone,
                    department:department,
                    salary:salary,
                    address:address,
                    hireDate:hireDate,
                })
            })
            const data=await res.json()
            console.log(data)
        } catch (e) { console.log(e) }

    }
    return (<>
        <div className="input">
            <form onSubmit={r}>
                <input type="text" placeholder="name" onChange={(e) => { setName(e.target.value) }} />
                <input type="text" placeholder="position" onChange={(e) => { setPosition(e.target.value) }} />
                <input type="text" placeholder="role" onChange={(e) => { setRole(e.target.value) }} />
                <input type="text" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                <input type="text" placeholder="phone" onChange={(e) => { setphone(e.target.value) }} />
                <input type="text" placeholder="department" onChange={(e) => { setdepartment(e.target.value) }} />
                <input type="text" placeholder="salary" onChange={(e) => { setsalary(e.target.value) }} />
                <input type="text" placeholder="address" onChange={(e) => { setaddress(e.target.value) }} />
                <input type="text" placeholder="hireDate" onChange={(e) => { sethireDate(e.target.value) }} />
                <button className="btn-Submit">Submit</button>
            </form>
        </div>

            <div className="employees-container">
      <div className="header-section">
        <h1 className="title">قائمة الموظفين</h1>
        <button className="refresh-btn" onClick={() => setY(!y)}>
          تحديث البيانات
        </button>
      </div>
      
      {employCardData.length > 0 ? (
        <div className="cards-grid">
          {employCardData.map((emp: any, index: number) => (
            <div key={emp._id || index} className="employee-card" onClick={()=>{router.push(`/dashboard/${emp._id}`)}}>
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
    </div>

    </>)
}