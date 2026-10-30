// Presentation only: original catalog text stays intact in plans.json.
export function benefitText(text) {
 return text
  .replace(/Teleconsultation - General Physician\(Instant\)/g,'instant GP phone consultations')
  .replace(/Teleconsultation - Choose from 18 Specialist/g,'specialist phone consultations (18 specialties)')
  .replace(/Teleconsultation - Emotional Wellness/g,'emotional wellness phone consultations')
  .replace(/Teleconsultation -\s*Dietician/g,'dietitian phone consultations')
  .replace(/Teleconsultation - Ayurveda/g,'Ayurveda phone consultations')
  .replace(/Teleconsultation - Homeopathy/g,'homeopathy phone consultations')
  .replace(/Video Consultation - General Physician/g,'GP video consultations')
  .replace(/Annual Health Checkup\(Basic\) - At Doorstep sample collection/g,'basic annual health checkups with home sample collection')
  .replace(/Annual Health Checkup\(Essential\) - At Doorstep sample collection/g,'essential annual health checkups with home sample collection')
  .replace(/Dental Checkup & Consultation/g,'dental checkups and consultations')
  .replace(/Pet Health Video Consultation/g,'pet health video consultations')
  .replace(/Consultations on In-person General Physician Clinic or Hospital Consultation for My Choice Doctor/g,'in-person GP clinic or hospital consultations with My Choice Doctor')
  .replace(/Consultations on In-person General Physician Clinic or Reimbursement upto ₹300 per Consultation for My Choice Doctor/g,'in-person GP clinic consultations or reimbursement up to ₹300 per consultation with My Choice Doctor')
  .replace(/\bUpto\b/g,'Up to').replace(/\bupto\b/g,'up to')
  .replace(/^1 (.*?)consultations$/, '1 $1consultation')
  .replace(/^1 dental checkups and consultations$/, '1 dental checkup and consultation')
  .replace(/^1 basic annual health checkups/, '1 basic annual health checkup');
}
