import { Biometric, Institution, Justification, Staff } from "../models";

export const countInstitution =  async (status:boolean) => {
    return await Institution.count({ where:{ status } });
}

export const countBiometrico =  async (status:boolean) => {
    return await Biometric.count({ where:{ status } });
}

export const countStaff =  async (status:boolean) => {
    return await Staff.count({ where:{ status } });
}

export const countJustification =  async (status:boolean) => {
    return await Justification.count({ where:{ status } });
}