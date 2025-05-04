import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';
  
type SubmissionStore = {
    applicant_age: number,
    limit_category: number,
    family_status_married: number,
    family_status_separated: number,
    family_status_single: number,
    family_status_widow: number,
    housing_type_co_op_apartment: number,
    housing_type_house_apartment: number,
    housing_type_municipal_apartment: number,
    housing_type_office_apartment: number,
    housing_type_rented_apartment: number,
    housing_type_with_parents: number,
    income_type_commercial_associate: number,
    income_type_pensioner: number,
    income_type_state_servant: number,
    income_type_student: number,
    income_type_working: number,
    rejection_reason: string,
    total_bad_debt: number,
    total_children: number,
    total_good_debt: number,
    total_income: number,
    years_of_working: number
    setSubmission: (store: SubmissionStore) => void,
    setStatusPengajuan: (rejection_reason: string) => void,
    setTotalIncome: (total_income: number) => void,
    setCreditCardCategory: (limit_category: number) => void
};

const initialState = {
    applicant_age: 0,
    limit_category: 0,
    family_status_married: 0,
    family_status_separated: 0,
    family_status_single: 0,
    family_status_widow: 0,
    housing_type_co_op_apartment: 0,
    housing_type_house_apartment: 0,
    housing_type_municipal_apartment: 0,
    housing_type_office_apartment: 0,
    housing_type_rented_apartment: 0,
    housing_type_with_parents: 0,
    income_type_commercial_associate: 0,
    income_type_pensioner: 0,
    income_type_state_servant: 0,
    income_type_student: 0,
    income_type_working: 0,
    rejection_reason: '',
    total_bad_debt: 0,
    total_children: 0,
    total_good_debt: 0,
    total_income: 0,
    years_of_working: 0
};

export const useSubmissionStore = create<SubmissionStore>()(
    persist(
        (set) => ({
            ...initialState,
            setSubmission: (store) => set(store),
            setStatusPengajuan: (rejection_reason) => set({rejection_reason}),
            setTotalIncome: (total_income) => set({total_income}),
            setCreditCardCategory: (limit_category) => set({limit_category}),
        }),
        { name: 'submission-store'}
    )
)