export interface Patient
{
    id: string;
    patientFName: string;
    patientLName: string;
    phone: string;
    bloodType: string;
    email: string;
    gender: string;
    condition: string;
    admissionDate?: string;
    dischargeTime?: string;
    rhesus: boolean;
    diagnosis: string;
}