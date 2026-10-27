let currentSelectedArea = "";

// ออบเจ็กต์แปลงรหัสตัวเลขเป็นชื่อเดือนภาษาไทย
const monthNames = {
    "01": "มกราคม", "02": "กุมภาพันธ์", "03": "มีนาคม", "04": "เมษายน",
    "05": "พฤษภาคม", "06": "มิถุนายน", "07": "กรกฎาคม", "08": "สิงหาคม",
    "09": "กันยายน", "10": "ตุลาคม", "11": "พฤศจิกายน", "12": "ธันวาคม"
};

const questionsData = {
    "ส่วนกลาง": [
        { id: "cen1", text: "1. การรักษาความปลอดภัยและการตรวจตรา", map: ["C1"] },
        { id: "cen2", text: "2. การจัดการจราจรและอำนวยความสะดวก", map: ["C2"] },
        { id: "cen3", text: "3. ความกระตือรือร้นในการให้บริการ", map: ["C3"] },
        { id: "cen4", text: "4. การแต่งกายเรียบร้อย", map: ["C4"] },
        { id: "cen5", text: "5. ความสุภาพอ่อนน้อม", map: ["C5"] }
    ],
    "หอพักนักศึกษา": [
        { id: "dm1", text: "1. การปฏิบัติหน้าที่อย่างเคร่งครัด", map: ["C1"] },
        { id: "dm2", text: "2. ความสม่ำเสมอของการอยู่ประจำจุด", map: ["C1"] },
        { id: "dm3", text: "3. ความสม่ำเสมอของการตรวจตรา", map: ["C1"] },
        { id: "dm4", text: "4. ความสะดวกในการติดต่อขอความช่วยเหลือต่าง ๆ", map: ["C3"] },
        { id: "dm5", text: "5. การพูดจาในการประสานงาน", map: ["C5"] },
        { id: "dm6", text: "6. การแต่งกาย", map: ["C4"] },
        { id: "dm7", text: "7. การมีน้ำใจในการให้บริการช่วยเหลือ", map: ["C3"] },
        { id: "dm8", text: "8. ความกระตือรือร้น/ความพร้อมในการปฏิบัติงาน", map: ["C3"] }
    ],
    "มหิดลสิทธาคาร": [
        { id: "mh1", text: "1. การควบคุมการเข้าออกอาคาร", map: ["C1"] },
        { id: "mh2", text: "2. การรายงานเหตุการณ์", map: ["C1"] },
        { id: "mh3", text: "3. ความสม่ำเสมอในการตรวจบริเวณ", map: ["C1"] },
        { id: "mh4", text: "4. ความรู้เรื่องการระงับเหตุ", map: ["C1"] },
        { id: "mh5", text: "5. จัดระเบียบการจราจรทางเข้า-ออก", map: ["C2"] },
        { id: "mh6", text: "6. ความสามารถบังคับใช้กฎจราจร", map: ["C2"] },
        { id: "mh7", text: "7. ปฏิบัติหน้าที่ได้อย่างถูกต้อง", map: ["C1"] }
    ],
    "อาคารสิริวิทยา": [
        { id: "sw1", text: "1. ความกระตือรือร้นในการปฏิบัติหน้าที่", map: ["C3"] },
        { id: "sw2", text: "2. การให้บริการด้วยความสุภาพเรียบร้อย", map: ["C5"] },
        { id: "sw3", text: "3. ความสม่ำเสมอในการตรวจตราความเรียบร้อย", map: ["C1"] },
        { id: "sw4", text: "4. การบริการอำนวยความสะดวกให้บุคลากร", map: ["C3"] },
        { id: "sw5", text: "5. ความน่าเชื่อถือต่อการปฏิบัติหน้าที่", map: ["C1"] },
        { id: "sw6", text: "6. การรับแจ้งสิ่งของสูญหาย/ติดตามของคืน", map: ["C1"] },
        { id: "sw7", text: "7. การขอความร่วมมือช่วยเหลือจากส่วนงาน", map: ["C3"] },
        { id: "sw8", text: "8. การมีส่วนร่วมกับโครงการ/กิจกรรม", map: ["C3"] },
        { id: "sw9", text: "9. ความเชื่อมั่นต่อระบบ/มาตรการความปลอดภัย", map: ["C1"] },
        { id: "sw10", text: "10. ความเหมาะสมของอัตรากำลัง รปภ.", map: ["C1"] },
        { id: "sw11", text: "11. การควบคุมดูแลความปลอดภัยรถยนต์ลานจอด", map: ["C1"] },
        { id: "sw12", text: "12. การควบคุมตรวจสอบทรัพย์สินการสูญหาย", map: ["C1"] },
        { id: "sw13", text: "13. การออกตรวจพื้นที่สุ่มเสี่ยงและสแกนจุด", map: ["C1"] },
        { id: "sw14", text: "14. อำนวยความสะดวกบริเวณทางข้ามม้าลาย", map: ["C2"] },
        { id: "sw15", text: "15. อำนวยการจราจร รถเข้า-ออกลานจอด", map: ["C2"] },
        { id: "sw16", text: "16. อำนวยความสะดวกรถพื้นที่จอดรถหลังอาคาร", map: ["C2"] }
    ],
    "สิริรุกขชาติ": [
        { id: "sr1", text: "1. รปภ. อำนวยความสะดวกในการจอดรถ", map: ["C2"] },
        { id: "sr2", text: "2. รปภ. แต่งกายเรียบร้อย", map: ["C4"] },
        { id: "sr3", text: "3. รปภ. มีความสุภาพ อ่อนน้อม", map: ["C5"] },
        { id: "sr4", text: "4. รปภ. มีความกระตือรือร้น", map: ["C3"] }
    ],
    "ศูนย์การเรียนรู้มหิดล": [
        { id: "ml2", text: "1. การแต่งกาย และการใช้วาจาสุภาพ", map: ["C4", "C5"] }, 
        { id: "ml3", text: "2. ความสม่ำเสมอในการตรวจรอบอาคาร และอยู่ประจำจุด", map: ["C1"] },
        { id: "ml4", text: "3. การอำนวยความสะดวกต่อนักศึกษา/บุคลากร", map: ["C3"] },
        { id: "ml5", text: "4. รปภ. มีความน่าเชื่อถือ", map: ["C1"] },
        { id: "ml6", text: "5. การให้บริการแจ้งสิ่งของสูญหาย", map: ["C1"] },
        { id: "ml7", text: "6. การจัดระเบียบจราจร ทางเข้า-ออก", map: ["C2"] },
        { id: "ml8", text: "7. การให้ความช่วยเหลือจัดกิจกรรม/ขนย้ายสิ่งของ", map: ["C3"] },
        { id: "ml9", text: "8. การเปิด-ปิดห้องประชุม และตรวจสอบอาคาร", map: ["C1"] }
    ]
};

// --- จัดการเริ่มต้นหน้าเว็บ ---
window.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('yearSelect');

    // คำนวณเดือนก่อนหน้า 1 เดือน
    const now = new Date();
    now.setMonth(now.getMonth() - 1); 

    const prevMonth = String(now.getMonth() + 1).padStart(2, '0');
    
    // ตั้งค่าปีแบบขยับอัตโนมัติ (ถัดไปกี่ปีก็จะเลื่อนให้เอง)
    const currentYearBE = now.getFullYear() + 543; 
    const startYear = currentYearBE - 1; 
    const endYear = currentYearBE + 1;   

    for (let y = startYear; y <= endYear; y++) {
        const option = document.createElement('option');
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }
    yearSelect.value = currentYearBE;

    // ตั้งค่าเริ่มต้นเดือน (เก็บค่าลง Input ซ่อน และแสดงชื่อบนปุ่ม)
    const btnMonthSelect = document.getElementById('btnMonthSelect');
    const monthValueInput = document.getElementById('monthValue');
    
    if (btnMonthSelect && monthValueInput) {
        monthValueInput.value = prevMonth;
        btnMonthSelect.textContent = monthNames[prevMonth];
    }
});

// --- ฟังก์ชันเปิด/ปิด Popup เลือกเดือน ---
const monthModal = document.getElementById('monthModal');
const btnMonthSelect = document.getElementById('btnMonthSelect');
const monthValueInput = document.getElementById('monthValue');

if (btnMonthSelect && monthModal) {
    // เมื่อกดที่ช่องเลือกเดือน ให้เปิด Popup
    btnMonthSelect.addEventListener('click', () => {
        monthModal.style.display = 'flex';
        // ไฮไลต์เดือนปัจจุบันที่ถูกเลือกอยู่
        document.querySelectorAll('.btn-month').forEach(btn => {
            if(btn.getAttribute('data-val') === monthValueInput.value) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    });

    // ปิด Popup
    document.getElementById('closeMonthModal').addEventListener('click', () => {
        monthModal.style.display = 'none';
    });

    // เมื่อกดปุ่มเลือกเดือนใน Popup
    document.querySelectorAll('.btn-month').forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedVal = this.getAttribute('data-val');
            const selectedName = this.getAttribute('data-name');
            
            monthValueInput.value = selectedVal;
            btnMonthSelect.textContent = selectedName;
            monthModal.style.display = 'none';
        });
    });
}

// --- เมื่อกดปุ่มเลือกพื้นที่ ---
document.querySelectorAll('.btn-area').forEach(button => {
    button.addEventListener('click', function() {
        currentSelectedArea = this.getAttribute('data-area');
        
        document.getElementById('selected-area-title').innerText = currentSelectedArea;
        document.getElementById('area-selection-card').style.display = 'none';
        
        const section = document.getElementById('rating-section');
        section.innerHTML = ''; 

        // โหลดคำถามและรันลำดับเลขข้อเริ่มจากข้อ 2
        if (questionsData[currentSelectedArea]) {
            questionsData[currentSelectedArea].forEach((q, index) => {
                // ตัดตัวเลขเดิมหน้าข้อออก (ถ้ามี) แล้วรันเลข 2, 3, 4... ใหม่
                const rawText = q.text.replace(/^\d+\.\s*/, ''); 
                const qNum = index + 2; // เริ่มนับจากข้อ 2 ต่อจากจำนวนผู้ตอบแบบสอบถาม
                
                let cardHtml = `
                    <div style="margin-bottom: 20px;">
                        <label class="question-title">${qNum}. ${rawText} <span class="req" style="color: red;">*</span></label>
                        <input type="number" id="${q.id}" name="${q.id}" min="0" max="5" step="0.01" required class="form-input-number" placeholder="กรอกคะแนน (เต็ม 5)">
                    </div>
                `;
                section.innerHTML += cardHtml;
            });
        }
        
        document.getElementById('surveyForm').style.display = 'block';
    });
});

// --- เมื่อกดปุ่มเปลี่ยนพื้นที่ (ย้อนกลับ) ---
document.getElementById('btn-back').addEventListener('click', function() {
    document.getElementById('surveyForm').style.display = 'none';
    document.getElementById('surveyForm').reset();
    document.getElementById('area-selection-card').style.display = 'block';
});

// --- จัดการเมื่อกดปุ่มส่งแบบฟอร์ม ---
document.getElementById('surveyForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // ดึงค่าเดือน, ปี, จำนวนผู้ตอบ และหมายเหตุ
    const selectedMonth = document.getElementById('monthValue').value;
    const selectedYear = document.getElementById('yearSelect').value;
    const respondentCount = document.getElementById('respondentCount').value; // ดึงค่าจำนวนคน
    const comment = document.getElementById('comment').value;
    
    let scores = { C1: [], C2: [], C3: [], C4: [], C5: [] };

    // คำนวณคะแนนตามหมวดหมู่
    questionsData[currentSelectedArea].forEach(q => {
        const inputElement = document.getElementById(q.id);
        if (inputElement && inputElement.value !== "") {
            const val = parseFloat(inputElement.value);
            q.map.forEach(cat => {
                scores[cat].push(val);
            });
        }
    });

    // หาค่าเฉลี่ย
    const getAvg = (arr) => {
        if(arr.length === 0) return "-";
        const sum = arr.reduce((a, b) => a + b, 0);
        return (sum / arr.length).toFixed(2); 
    };

    // ข้อมูลที่จะส่งไป Google Sheets
    const payload = {
        month: monthNames[selectedMonth], 
        year: selectedYear,
        area: currentSelectedArea,
        respondentCount: respondentCount, // เพิ่มจำนวนคนลงใน payload ที่จะส่ง
        c1: getAvg(scores.C1),
        c2: getAvg(scores.C2),
        c3: getAvg(scores.C3),
        c4: getAvg(scores.C4),
        c5: getAvg(scores.C5),
        comment: comment
    };

    document.getElementById('loading').style.display = 'flex';

    try {
        const response = await fetch(SUBMIT_URL, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.status === 'success') {
            document.getElementById('successModal').style.display = 'flex';
        } else {
            alert('เกิดข้อผิดพลาด: ' + result.message);
        }
    } catch (error) {
        alert('ไม่สามารถเชื่อมต่อได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
});

// เพิ่มฟังก์ชันเมื่อกดปุ่ม "ตกลง" ใน Popup
document.getElementById('closeSuccessModal').addEventListener('click', () => {
    // ปิด Popup
    document.getElementById('successModal').style.display = 'none';
    
    // ล้างค่าฟอร์มและกลับไปหน้าแรก
    document.getElementById('surveyForm').reset(); 
    document.getElementById('surveyForm').style.display = 'none';
    document.getElementById('area-selection-card').style.display = 'block';
    window.scrollTo(0, 0); // เลื่อนหน้าจอกลับขึ้นด้านบนสุด
});